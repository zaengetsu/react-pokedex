import React from "react";
import { useRouter } from "next/navigation";
import PokemonCard from "@/components/pokemon/pokemonCard";

const PokemonEvolution = ({
  evolutions,
}: {
  evolutions: { id: number; name: string; image: string; types: any[] }[];
}) => {
  const router = useRouter();

  if (evolutions.length === 0) {
    return <p className="text-gray-500 text-center">Pas d'évolution disponible.</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Évolutions
      </h2>
      <div className="flex flex-wrap justify-center gap-6">
        {evolutions.map((evolution) => (
          <div
            key={evolution.id}
            onClick={() => router.push(`/pokedex/${evolution.id}`)} // Utilisation correcte de la route
            className="cursor-pointer"
          >
            <PokemonCard
              id={evolution.id}
              name={evolution.name}
              image={evolution.image}
              types={evolution.types}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonEvolution;
