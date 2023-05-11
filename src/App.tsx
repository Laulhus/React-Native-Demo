import React from 'react';
import ScrollViewScreen from './Views/ScrollViewScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FlatListScreen from './Views/FlatListScreen';

const Stack = createNativeStackNavigator();
function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="ScrollView"
          component={ScrollViewScreen}
          options={{
            animation: 'simple_push',
            headerBackButtonMenuEnabled: true,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="FlatListView"
          component={FlatListScreen}
          options={{
            animation: 'simple_push',
            headerBackButtonMenuEnabled: true,
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
