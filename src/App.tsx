import React from 'react';
import ScrollViewScreen from './Views/ScrollViewScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FlatListScreen from './Views/FlatListScreen';

const Stack = createNativeStackNavigator();
function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ScrollViewScreen">
        <Stack.Screen
          name="ScrollScreen"
          component={ScrollViewScreen}
          options={{
            animation: 'simple_push',
            headerBackButtonMenuEnabled: true,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="FlatListScreen"
          component={FlatListScreen}
          options={{
            animation: 'simple_push',
            headerBackButtonMenuEnabled: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
