"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

import PokemonCard from "@/components/pokemon/pokemonCard";

const PokemonDetailPage = () => {
  const [pokemon, setPokemon] = useState<any>(null);
  const [evolutionChain, setEvolutionChain] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const params = useParams(); // Utilisation de useParams
  const router = useRouter();

  // Récupération des détails d'un Pokémon
  const fetchPokemonDetails = async (id: number) => {
    try {
      const response = await fetch(
        `https://nestjs-pokedex-api.vercel.app/pokemons/${id}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Erreur lors de la récupération du Pokémon ${id} :`, error);
      return null;
    }
  };

  // Construction de la chaîne d'évolutions
  const fetchEvolutionChain = async (pokemon: any) => {
    const chain = [];
    let currentPokemon = pokemon;

    while (currentPokemon?.evolutions?.length > 0) {
      const nextEvolution = currentPokemon.evolutions[0]; // On prend la première évolution
      const nextDetails = await fetchPokemonDetails(nextEvolution.pokedexId);
      chain.push(nextDetails);
      currentPokemon = nextDetails;
    }

    setEvolutionChain(chain);
  };

  useEffect(() => {
    const fetchPokemon = async () => {
      if (!params.pokemonId) return; // Vérifie si le paramètre existe
      setLoading(true);
      try {
        const details = await fetchPokemonDetails(Number(params.pokemonId));
        setPokemon(details);

        if (details?.evolutions?.length > 0) {
          await fetchEvolutionChain(details);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [params.pokemonId]); // Utilisation de params.pokemonId correctement déballé

  if (loading || !pokemon) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-500 text-white">
        Chargement...
      </div>
    );
  }

  return (
    <div className="bg-red-500 min-h-screen flex flex-col items-center">
      <div className="max-w-5xl w-full bg-white p-8 rounded-lg shadow-lg mt-10">
        {/* Bouton Retour */}
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-lg mb-6 shadow-md hover:bg-red-600 transition"
          onClick={() => router.push("/pokedex")}
        >
          Retour
        </button>

        {/* Contenu principal */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-10">
          {/* Image et Nom */}
          <div className="w-full md:w-1/2 p-4 bg-gray-50 rounded-lg shadow-lg">
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="w-full object-contain"
            />
            <h2 className="text-center text-2xl font-bold mt-4 text-gray-800">
              {pokemon.name}
            </h2>
          </div>

          {/* Statistiques */}
          <div className="w-full md:w-1/2 p-4 bg-gray-50 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Statistiques</h3>
            <ul className="text-gray-700 space-y-2">
              {Object.entries(pokemon.stats).map(([key, value]) => (
                <li key={key} className="flex justify-between">
                  <span className="capitalize">{key.replace(/_/g, " ")}</span>
                  <span>{value as React.ReactNode}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Évolutions */}
        <div className="mt-10">
          <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
            Évolutions
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {evolutionChain.map((evolution) => (
              <div
                key={evolution.pokedexId}
                onClick={() => router.push(`/pokedex/${evolution.pokedexId}`)}
                className="cursor-pointer"
              >
                <PokemonCard
                  id={evolution.pokedexId}
                  name={evolution.name}
                  image={evolution.image}
                  types={evolution.types || []}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailPage;
