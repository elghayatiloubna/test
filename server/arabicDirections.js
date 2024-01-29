const axios = require('axios');

// Remplacez 'YOUR_API_KEY' par votre clé API Here
const apiKey = 'Qf_StL39AR9kTMviblOV7lx6wPC4iQFqw2LGzoUAi7E';
//const apiUrl = `https://router.hereapi.com/v8/routes?transportMode=pedestrian&origin=31.644529706981952,-8.020329486770914&destination=31.64908253456857,-8.015434630640225&return=polyline,turnbyturnactions,instructions&apikey=${apiKey}`;
const apiUrl = `https://router.hereapi.com/v8/routes?apikey=${apiKey}&origin=31.644529706981952,-8.020329486770914&destination=31.64908253456857,-8.015434630640225&return=polyline,summary,actions,instructions&spans=notices&transportMode=pedestrian`;


// Fonction pour envoyer la requête et récupérer les instructions
async function getRouteInstructions() {
  try {
    // Envoi de la requête HTTP
    const response = await axios.get(apiUrl);

    // Extraction des instructions du JSON
    const route = response.data.routes[0];
    const section = route.sections[0];
    const turnByTurnActions = section.actions;

    // Création d'un tableau d'instructions
    const instructions = turnByTurnActions.map(async (action) => {
      const roadName =
        action.nextRoad &&
        action.nextRoad.name &&
        action.nextRoad.name[0] &&
        action.nextRoad.name[0].value;

      // Traduction de l'instruction en arabe
      const translatedText = {"instructions":[{"action":"depart","duration":556,"length":548,"instruction":"اتجه شمالًا على Boulevard Med Abdelkrim Al Khattabi. اذهب لمدة 548 م.","road":""},{"action":"turn","direction":"right","duration":75,"length":70,"instruction":"انعطف يمينًا إلى Boulevard Med Abdelkrim Al Khattabi. اذهب لمدة 70 م.","road":""},{"action":"roundaboutExit","direction":"right","duration":79,"length":59,"instruction":"المشي حول الدوار واتجه في الشارع الأول شارع تاراهوم. اذهب لمدة 59 م.","road":""},{"action":"turn","direction":"left","duration":174,"length":160,"instruction":"انعطف يسارًا على شارع تادامون. الذهاب لمدة 160 م.","road":""},{"action":"turn","direction":"right","duration":317,"length":304,"instruction":"انعطف يمينا. اذهب لمدة 304 م.","road":""},{"action":"turn","direction":"right","duration":182,"length":171,"instruction":"انعطف يمينًا إلى شارع الأمير مولاي عبد الله. اذهب لمدة 171 م.","road":""},{"action":"turn","direction":"right","duration":184,"length":182,"instruction":"انعطف يمينا. اذهب لمدة 182 م.","road":""},{"action":"arrive","duration":0,"length":0,"instruction":"تصل إلى وجهتك على اليسار.","road":""}]} 

      return {
        action: action.action,
        direction: action.direction,
        duration: action.duration,
        length: action.length,
        instruction: translatedText,
        road: roadName || '',
      };
    });

    // Attendre que toutes les traductions soient terminées
    return await Promise.all(instructions);
  } catch (error) {
    console.error('Erreur lors de la requête:', error.message);
    throw error;
  }
}

// Fonction pour traduire un texte
async function translateText(text, sourceLanguage, targetLanguage) {
   const translationApiUrl = 'https://text-translator2.p.rapidapi.com/translate';
   const encodedParams = new URLSearchParams();
   encodedParams.set('source_language', sourceLanguage);
   encodedParams.set('target_language', targetLanguage);
   encodedParams.set('text', text);
  const translationOptions = {
    method: 'POST',
    url: translationApiUrl,
    headers: {
    'content-type': 'application/x-www-form-urlencoded',
    'X-RapidAPI-Key': 'a5de6f92f7msh68620816e927b11p14e1cbjsnc27b984d1873',
    'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
    },
    data: encodedParams,
  };

  try {
    const translationResponse = await axios.request(translationOptions);
    return translationResponse.data.data.translatedText;
  } catch (translationError) {
    console.error('Erreur lors de la traduction:', translationError.message);
    throw translationError;
  }
}

// Appel de la fonction pour obtenir les instructions de l'itinéraire
getRouteInstructions()
  .then((instructions) => {
    console.log('Instructions de l\'itinéraire:', instructions);
    // Vous pouvez utiliser les instructions comme bon vous semble
  })
  .catch((error) => {
    // Gérer les erreurs
  });
