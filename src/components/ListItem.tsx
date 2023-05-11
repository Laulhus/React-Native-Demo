import React, {PropsWithChildren} from 'react';
import {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import {Pokemon} from '../types/Pokemon';

type ListItemProps = PropsWithChildren<{
  title: string;
  theme: {color: string; backgroundColor: string};
}>;
export function ListItem({title, theme}: ListItemProps): JSX.Element {
  const [pokemon, setPokemon] = useState<Pokemon>();

  const fetchPokemon = useCallback(async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${title}`);
    const data = await response.json();
    setPokemon(data);
    console.log(data.name);
  }, [title]);

  useEffect(() => {
    fetchPokemon();
  }, [fetchPokemon]);

  return pokemon ? (
    <View style={styles(theme).sectionContainer}>
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
            styles().sectionTitle,
            {
              color: theme.color,
            },
          ]}>
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </Text>
        <Text
          style={[
            styles().sectionDescription,
            {
              color: theme.color,
            },
          ]}>
          {pokemon.types[0].type.name.charAt(0).toUpperCase() +
            pokemon.types[0].type.name.slice(1)}
        </Text>
      </View>
    </View>
  ) : (
    <ActivityIndicator />
  );
}

const styles = (theme?: {color: string; backgroundColor: string}) =>
  StyleSheet.create({
    sectionContainer: {
      borderWidth: 1,
      borderRadius: 10,
      borderColor: theme?.color,
      marginTop: 32,
      backgroundColor: theme?.backgroundColor,
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
