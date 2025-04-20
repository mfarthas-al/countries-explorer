import PropTypes from 'prop-types';

const CountryCard = ({ country }) => {
  // Format population with commas
  const formatPopulation = (pop) => {
    return pop.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const languageList = country.languages 
    ? Object.values(country.languages).join(', ') 
    : 'N/A';

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md group transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
      <div className="relative aspect-[3/2] overflow-hidden">
        <img
          src={country.flags.svg || country.flags.png}
          alt={`Flag of ${country.name.common}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-gray-800 text-lg mb-2 line-clamp-1 transition-colors duration-300 group-hover:text-blue-600">
          {country.name.common}
        </h3>
        
        <div className="space-y-2 text-sm text-gray-600">
          <p className="flex left">
            <span className="font-medium">Capital:</span> 
            <span className="ml-1 text-left max-w-[60%] truncate">{country.capital?.[0] || 'N/A'}</span>
          </p>
          <p className="flex left">
            <span className="font-medium">Region:</span>
            <span className="ml-1 text-left">{country.region}</span>
          </p>
          <p className="flex left">
            <span className="font-medium">Population:</span>
            <span className="ml-1 text-left">{formatPopulation(country.population)}</span>
          </p>
          <p className="flex left">
            <span className="font-medium">Languages:</span>
            <span className="ml-1 text-left max-w-[60%] truncate" title={languageList}>
              {languageList}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

CountryCard.propTypes = {
  country: PropTypes.shape({
    flags: PropTypes.shape({
      png: PropTypes.string,
      svg: PropTypes.string
    }).isRequired,
    name: PropTypes.shape({
      common: PropTypes.string.isRequired
    }).isRequired,
    capital: PropTypes.arrayOf(PropTypes.string),
    region: PropTypes.string.isRequired,
    population: PropTypes.number.isRequired,
    languages: PropTypes.object
  }).isRequired
};

export default CountryCard;