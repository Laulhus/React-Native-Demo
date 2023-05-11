import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Switch,
  useColorScheme,
  View,
} from 'react-native';

import {ReloadInstructions} from 'react-native/Libraries/NewAppScreen';
import {ListItem} from './components/ListItem';
import {Pokemon} from './types/Pokemon';
import {darkTheme, lightTheme} from '../styles/theme';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const theme = isDarkMode ? darkTheme : lightTheme;

  /*   const [isEnabled, setIsEnabled] = useState(isDarkMode);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    setTheme(theme === darkTheme ? lightTheme : darkTheme);
  }; */

  const [pokemonData, setPokemonData] = useState<Pokemon[]>();

  const fetchData = async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon');
    const data = await response.json();
    console.log(data.results);
    setPokemonData(data.results);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={theme}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={theme.backgroundColor}
      />
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={theme}>
        {/*    <Switch
          style={{alignSelf: 'center'}}
          onValueChange={() => toggleSwitch()}
          value={isEnabled}
          ios_backgroundColor={darkTheme.backgroundColor}
        /> */}
        <View
          style={{
            backgroundColor: theme.backgroundColor,
            paddingHorizontal: 10,
          }}>
          {pokemonData?.map((pokemon, index) => (
            <ListItem theme={theme} key={index} title={pokemon.name}>
              <ReloadInstructions />
            </ListItem>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
