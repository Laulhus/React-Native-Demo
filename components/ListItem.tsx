import React, {PropsWithChildren} from 'react';
import {useCallback, useEffect, useState} from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';

type ListItemProps = PropsWithChildren<{
  title: string;
}>;
export function ListItem({title}: ListItemProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [pokemon, setPokemon] = useState();

  const fetchPokemon = useCallback(async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${title}`);
    const data = await response.json();
    setPokemon(data);
  }, [title]);

  useEffect(() => {
    fetchPokemon();
  }, [fetchPokemon]);

  return pokemon ? (
    <View style={styles.sectionContainer}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <Image
          resizeMode="contain"
          style={{width: 90, height: 90}}
          source={{uri: pokemon.sprites.front_default}}
        />
        <Text
          style={[
            styles.sectionTitle,
            {
              color: isDarkMode ? Colors.white : Colors.black,
            },
          ]}>
          {pokemon.name}
        </Text>
        <Text
          style={[
            styles.sectionDescription,
            {
              color: isDarkMode ? Colors.light : Colors.dark,
            },
          ]}>
          {pokemon.types[0].type.name}
        </Text>
      </View>
    </View>
  ) : (
    <ActivityIndicator />
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginRight: 0,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});
