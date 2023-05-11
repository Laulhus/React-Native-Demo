import React, {useEffect, useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {ReloadInstructions} from 'react-native/Libraries/NewAppScreen';
import {ListItem} from '../components/ListItem';
import {Pokemon} from '../types/Pokemon';
import {darkTheme, lightTheme} from '../../styles/theme';
import {useNavigation} from '@react-navigation/native';
function ScrollViewScreen(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const theme = isDarkMode ? darkTheme : lightTheme;
  const navigation = useNavigation();
  /*   const [isEnabled, setIsEnabled] = useState(isDarkMode);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    setTheme(theme === darkTheme ? lightTheme : darkTheme);
  }; */

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
      <Pressable
        style={{
          borderWidth: 1,
          borderRadius: 5,
          padding: 10,
          alignSelf: 'center',
        }}
        onPress={() => navigation.navigate('FlatListScreen' as never)}>
        <Text style={{fontSize: 20}}>{'Change view'}</Text>
      </Pressable>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{paddingBottom: 50}}>
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

export default ScrollViewScreen;
