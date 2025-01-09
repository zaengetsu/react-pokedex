"use client";

import React, { useEffect, useState } from "react";

interface Type {
  id: number;
  name: string;
  image: string;
}

const Header = ({
  onSearchChange,
  onTypeChange,
  onLimitChange,
}: {
  onSearchChange: (search: string) => void;
  onTypeChange: (typeId: string) => void;
  onLimitChange: (limit: number) => void;
}) => {
  const [types, setTypes] = useState<Type[]>([]);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const response = await fetch("https://nestjs-pokedex-api.vercel.app/types");
        const data = await response.json();
        setTypes(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des types :", error);
      }
    };

    fetchTypes();
  }, []);

  return (
    <div className="w-full px-6 py-4 border-b border-white/20 bg-red-500">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Titre */}
        <span className="text-2xl font-bold text-white">Pokedex</span>

        {/* Barre de recherche et filtres */}
        <div className="flex items-center space-x-4">
          {/* Barre de recherche */}
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => onSearchChange(e.target.value)}
            className="bg-white text-gray-800 rounded-full px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 transition"
          />

          {/* Sélecteur des types */}
          <select
            onChange={(e) => onTypeChange(e.target.value)}
            className="bg-white text-gray-800 rounded-full px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 transition"
          >
            <option value="">Tous les types</option>
            {types.map((type) => (
              <option key={type.id} value={type.name}>
                {type.name}
              </option>
            ))}
          </select>

          {/* Sélecteur des limites */}
          <select
            onChange={(e) => onLimitChange(Number(e.target.value))}
            className="bg-white text-gray-800 rounded-full px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 transition"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Header;
