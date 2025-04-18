// src/components/CountryCard.jsx

const CountryCard = ({ country }) => {
    const { name, flags, capital, region, population, languages } = country;
    const languageList = languages ? Object.values(languages).join(', ') : 'N/A';
  
    return (
      <div className="bg-white rounded-lg shadow p-4 w-full sm:w-64">
        <img src={flags.png} alt={name.common} className="w-full h-32 object-cover rounded-md mb-2" />
        <h2 className="text-xl font-semibold">{name.common}</h2>
        <p><strong>Capital:</strong> {capital?.[0]}</p>
        <p><strong>Region:</strong> {region}</p>
        <p><strong>Population:</strong> {population.toLocaleString()}</p>
        <p><strong>Languages:</strong> {languageList}</p>
      </div>
    );
  };
  
  export default CountryCard;
  