const PokemonDetails = ({ stats }: { stats: { [key: string]: number } }) => {
    return (
      <div className="text-left">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Statistiques</h2>
        <table className="table-auto w-full text-left text-gray-700">
          <tbody>
            {Object.entries(stats).map(([key, value]) => (
              <tr key={key}>
                <td className="capitalize font-medium pr-6 py-1">{key}</td>
                <td className="font-bold">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default PokemonDetails;
  