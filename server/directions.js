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
      const instructions = turnByTurnActions.map(action => {
        const roadName = action.nextRoad && action.nextRoad.name && action.nextRoad.name[0] && action.nextRoad.name[0].value;
        return {
          action: action.action,
          direction: action.direction,
          duration: action.duration,
          length: action.length,
          instruction : action.instruction,
          road: roadName || ""
        };
      });
  
      return instructions;
  
    } catch (error) {
      console.error('Erreur lors de la requête:', error.message);
      throw error;
    }
  }
  
  // Appel de la fonction pour obtenir les instructions de l'itinéraire
  getRouteInstructions()
    .then(instructions => {
      console.log('Instructions de l\'itinéraire:', instructions);
      // Vous pouvez utiliser les instructions comme bon vous semble
    })
    .catch(error => {
      // Gérer les erreurs
    });