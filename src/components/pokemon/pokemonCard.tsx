import React from "react";
import { useRouter } from "next/navigation";

interface PokemonCardProps {
  id: number;
  name: string;
  image: string;
  types: {
    name: string;
    image: string;
  }[];
}

const PokemonCard: React.FC<PokemonCardProps> = ({ id, name, image, types }) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`pokedex/${id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="relative border rounded-lg shadow-md p-4 w-full max-w-[180px] bg-white flex flex-col items-center cursor-pointer hover:shadow-lg transition-shadow"
    >
      {/* Pokedex ID en haut à droite */}
      <span className="absolute top-2 right-2 text-gray-500 font-bold text-sm">
        #{id}
      </span>

      {/* Image du Pokémon */}
      <img
        src={image}
        alt={name}
        className="w-24 h-24 object-contain mb-2"
      />

      {/* Nom du Pokémon */}
      <h3 className="font-semibold text-lg text-gray-800">{name}</h3>

      {/* Types avec images */}
      <div className="flex mt-2 space-x-1">
        {types.map((type) => (
          <div
            key={type.name}
            className="flex items-center justify-center space-x-1 bg-gray-100 rounded-full px-2 py-1 shadow-sm"
          >
            <img
              src={type.image}
              alt={type.name}
              className="w-4 h-4 object-contain"
            />
            <span className="text-xs font-semibold text-gray-700">{type.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;
