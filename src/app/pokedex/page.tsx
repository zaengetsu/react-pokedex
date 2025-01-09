"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/header";
import PokemonCard from "@/components/pokemon/pokemonCard";

interface PokemonType {
  id: number;
  pokedexId: number;
  name: string;
  image: string;
  stats: {
    HP: number;
    speed: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
  };
  generation: number;
  evolutions: {
    name: string;
    pokedexId: number;
  }[];
  types: {
    id: number;
    name: string;
  }[];
}

interface Type {
  id: number;
  name: string;
  image: string;
}

const PokedexPage = () => {
  const [pokemons, setPokemons] = useState<PokemonType[]>([]);
  const [types, setTypes] = useState<Type[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [limit, setLimit] = useState(50);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Récupération des Pokémon
        const pokemonResponse = await fetch("/data.json");
        const pokemonData = await pokemonResponse.json();

        // Récupération des types
        const typeResponse = await fetch("/type.json");
        const typeData = await typeResponse.json();

        setPokemons(pokemonData.slice(0, limit)); // Appliquer la limite
        setTypes(typeData);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [limit]);

  const filteredPokemons = pokemons.filter((pokemon) => {
    const matchesSearch = pokemon.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType =
      !selectedType ||
      pokemon.types.some((type) => type.id === Number(selectedType));
    return matchesSearch && matchesType;
  });

  const enrichedPokemons = filteredPokemons.map((pokemon) => ({
    ...pokemon,
    types: pokemon.types.map((type) => ({
      ...type,
      image: types.find((t) => t.id === type.id)?.image || "",
    })),
  }));

  return (
    <div className="bg-red-500 min-h-screen flex flex-col items-center">
      {/* Header Rouge */}
      <header>
        <Header
          onSearchChange={setSearchTerm}
          onTypeChange={setSelectedType}
        />
      </header>

      {/* Contenu principal */}
      <div className="flex-grow bg-white rounded-t-lg mt-4 mx-auto max-w-[90%] max-h-[90%] w-full h-full p-6 shadow-lg">
        {loading ? (
          <p className="text-center text-gray-700">Chargement des Pokémons...</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {enrichedPokemons.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                id={pokemon.id}
                name={pokemon.name}
                image={pokemon.image}
                types={pokemon.types}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PokedexPage;
