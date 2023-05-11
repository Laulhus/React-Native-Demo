import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';

import {ListItem} from '../components/ListItem';
import {Pokemon} from '../types/Pokemon';
import {darkTheme, lightTheme} from '../../styles/theme';
function FlatListScreen(): JSX.Element {
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
        <View
          style={{
            backgroundColor: theme.backgroundColor,
            paddingHorizontal: 10,
          }}>
          <FlatList
            data={pokemonData}
            renderItem={({item}) => (
              <ListItem theme={theme} title={item.name} />
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default FlatListScreen;
