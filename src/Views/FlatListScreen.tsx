import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Switch,
  useColorScheme,
  View,
} from 'react-native';

import {ListItem} from '../components/ListItem';
import {Pokemon} from '../types/Pokemon';
import {darkTheme, lightTheme} from '../../styles/theme';
function FlatListScreen(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [theme, setTheme] = useState(isDarkMode ? darkTheme : lightTheme);
  const [isEnabled, setIsEnabled] = useState(isDarkMode);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    setTheme(theme === darkTheme ? lightTheme : darkTheme);
  };

  const [pokemonData, setPokemonData] = useState<Pokemon[]>();

  const fetchData = async () => {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100');
    const data = await response.json();

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
      {}
      <View style={styles(theme).view}>
        <Switch
          style={{alignSelf: 'center'}}
          onValueChange={() => toggleSwitch()}
          value={isEnabled}
          ios_backgroundColor={darkTheme.backgroundColor}
        />
        <FlatList
          data={pokemonData}
          renderItem={({item}) => <ListItem theme={theme} title={item.name} />}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = (theme: {color: string; backgroundColor: string}) =>
  StyleSheet.create({
    view: {
      paddingTop: 30,
      backgroundColor: theme.backgroundColor,
      paddingHorizontal: 10,
    },
  });

export default FlatListScreen;
