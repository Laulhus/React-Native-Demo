import React, {useEffect, useState} from 'react';
import {ScrollView, StatusBar, useColorScheme, View} from 'react-native';

import {
  Colors,
  Header,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {ListItem} from './components/ListItem';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const [pokemonData, setPokemonData] = useState();

  const fetchData = async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon');
    const data = await response.json();
    setPokemonData(data.results);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
            paddingHorizontal: 10,
          }}>
          {pokemonData?.map((pokemon, index) => (
            <ListItem key={index} title={pokemon.name}>
              <ReloadInstructions />
            </ListItem>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

export default App;
