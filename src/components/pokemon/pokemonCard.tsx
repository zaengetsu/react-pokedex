import React from "react";
import { useRouter } from "next/navigation";

interface PokemonCardProps {
  id: number;
  name: string;
  image: string;
  types: { name: string; image: string }[];
}

const PokemonCard: React.FC<PokemonCardProps> = ({ id, name, image, types }) => {
  const router = useRouter();

  return (
    <div
      className="border rounded-lg shadow-lg p-6 w-full max-w-[200px] bg-white flex flex-col items-center cursor-pointer hover:shadow-xl transition"
      onClick={() => router.push(`/pokedex/${id}`)}
    >
      <img src={image} alt={name} className="w-28 h-28 object-contain mb-4" />
      <h3 className="font-bold text-lg text-gray-800">{name}</h3>
      <p className="text-gray-500 text-sm">#{id}</p>
      <div className="flex mt-2 flex-wrap justify-center">
        {types.map((type) => (
          <div key={type.name} className="flex items-center space-x-2 mt-1">
            <img src={type.image} alt={type.name} className="w-4 h-4 object-contain" />
            <span className="text-xs text-gray-700">{type.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;
