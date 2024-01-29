import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { IntroSlider,Login, Signup, Welcome } from "./screens";
import HomeScreen from './HomeScreen';
import FST from './FST';
import FSSM from './FSSM';
import Admin from './Admin';
import Read from './read'

const Stack = createNativeStackNavigator();

export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='IntroSlider'
      >
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen name="AppMap" component={HomeScreen} />
        <Stack.Screen name="FST" component={FST} />
        <Stack.Screen name="FSSM" component={FSSM} />
        <Stack.Screen name="Admin" component={Admin} />
        <Stack.Screen name="Read" component={Read} />
        <Stack.Screen
          name="IntroSlider"
          component={IntroSlider}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            headerShown: false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
