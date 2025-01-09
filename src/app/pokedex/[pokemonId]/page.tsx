"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/header";
import PokemonImage from "@/components/pokemon/pokemonImage";
import PokemonDetails from "@/components/pokemon/pokemonDetails";
import PokemonEvolution from "@/components/pokemon/pokemonEvolution";

const PokemonDetailPage = ({ params }: { params: { pokemonId: string } }) => {
  const [pokemon, setPokemon] = useState<any>(null);
  const [allPokemons, setAllPokemons] = useState<any[]>([]);
  const router = useRouter();

  // Récupération des données
  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch("/data.json");
        const data = await response.json();
        setAllPokemons(data);

        const foundPokemon = data.find(
          (poke: any) => poke.pokedexId === Number(params.pokemonId)
        );
        setPokemon(foundPokemon);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchPokemonData();
  }, [params.pokemonId]);

  if (!pokemon) {
    return <p className="text-center text-gray-700 mt-10">Chargement...</p>;
  }

  // Évolutions à partir des IDs
  const evolutions = pokemon.evolutions.map((evolution: any) =>
    allPokemons.find((poke) => poke.pokedexId === evolution.pokedexId)
  );

  return (
    <div className="bg-red-500 min-h-screen flex flex-col">
      {/* Header */}
      <Header onSearchChange={() => {}} onTypeChange={() => {}} />

      {/* Contenu principal */}
      <div className="flex-grow max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-6">
        {/* Bouton Retour */}
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg mb-6"
          onClick={() => router.push("/pokedex")}
        >
          Retour
        </button>

        {/* Section principale */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div>
            <PokemonImage image={pokemon.image} name={pokemon.name} />
          </div>

          {/* Statistiques */}
          <div>
            <PokemonDetails stats={pokemon.stats} />
          </div>
        </div>

        {/* Section évolutions */}
        <div className="mt-10">
          <PokemonEvolution evolutions={evolutions} />
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailPage;
