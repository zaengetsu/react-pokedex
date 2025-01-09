const PokemonImage = ({ image, name }: { image: string; name: string }) => {
    return (
      <div className="text-center">
        <img
          src={image}
          alt={name}
          className="w-64 h-64 object-contain mx-auto rounded-lg"
        />
        <h1 className="text-3xl font-bold mt-4 text-gray-800">{name}</h1>
      </div>
    );
  };
  
  export default PokemonImage;
  