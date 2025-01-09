"use client";

import React, { useEffect, useState } from "react";
import PokemonCard from "@/components/pokemon/pokemonCard";
import Header from "@/components/header";

interface Pokemon {
  id: number;
  pokedexId: number;
  name: string;
  image: string;
  types: {
    id: number;
    name: string;
    image: string;
  }[];
}

const PokedexPage = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [page, setPage] = useState(1); // Pagination
  const [hasMore, setHasMore] = useState(true); // Indicateur pour continuer le chargement

  // Charger les Pokémon
  const fetchPokemons = async (page: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://nestjs-pokedex-api.vercel.app/pokemons?limit=20&page=${page}`
      );
      const data = await response.json();

      if (data.length > 0) {
        setPokemons((prev) => [...prev, ...data]);
      } else {
        setHasMore(false); // Stopper le chargement si aucun nouveau Pokémon
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des Pokémon :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemons(page);
  }, [page]);

  // Gestion du scroll infini
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100
    ) {
      if (!loading && hasMore) {
        setPage((prev) => prev + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  // Filtrage des Pokémon
  const filteredPokemons = pokemons.filter((pokemon) => {
    const matchesSearch = pokemon.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType =
      !selectedType ||
      pokemon.types.some((type) =>
        type.name.toLowerCase().includes(selectedType.toLowerCase())
      );
    return matchesSearch && matchesType;
  });

  return (
    <div className="bg-red-500 min-h-screen flex flex-col items-center">
      {/* Header */}
      <Header
        onSearchChange={(search) => setSearchTerm(search)}
        onTypeChange={(type) => setSelectedType(type)}
        onLimitChange={() => {}} 

      />

      {/* Liste des Pokémon */}
      <div className="flex-grow bg-white rounded-t-lg mt-4 mx-auto max-w-[90%] max-h-[90%] w-full p-6 shadow-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredPokemons.map((pokemon) => (
            <PokemonCard
              key={pokemon.pokedexId}
              id={pokemon.pokedexId}
              name={pokemon.name}
              image={pokemon.image}
              types={pokemon.types}
            />
          ))}
        </div>

        {/* Chargement */}
        {loading && (
          <p className="text-center text-gray-700 mt-4">Chargement...</p>
        )}

        {/* Message de fin */}
        {!hasMore && !loading && (
          <p className="text-center text-gray-500 mt-4">
            Tous les Pokémon ont été chargés !
          </p>
        )}
      </div>
    </div>
  );
};

export default PokedexPage;
