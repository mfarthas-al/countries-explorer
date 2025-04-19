import { useEffect, useState } from "react";
import { getAllCountries, getCountryByName } from "../api/countries";
import CountryCard from "./CountryCard";
import SearchBar from "./SearchBar";

const CountryList = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAll = () => {
    setLoading(true);
    getAllCountries()
      .then(setCountries)
      .catch(() => setError("Failed to fetch countries."))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleSearch = (query) => {
    if (query.trim() === "") {
      fetchAll(); // reset to all countries
      return;
    }

    setLoading(true);
    setError("");
    getCountryByName(query)
      .then(setCountries)
      .catch(() => setError("No country found with that name."))
      .finally(() => setLoading(false));
  };

  return (
    <div className="p-4">
      <SearchBar onSearch={handleSearch} />
      {error && <p className="text-red-500 text-center">{error}</p>}
      {loading ? (
        <p className="text-center mt-10 text-lg">Loading countries...</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {countries.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CountryList;
