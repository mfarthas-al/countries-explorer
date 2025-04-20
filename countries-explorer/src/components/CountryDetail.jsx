import { getCountryByCode } from "../api/countries";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const CountryDetail = () => {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCountryByCode(code)
      .then(setCountry)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [code]);

  if (loading) return <p className="text-center mt-6">Loading...</p>;
  if (!country) return <p className="text-center mt-6">Country not found.</p>;

  const {
    name,
    flags,
    capital,
    region,
    population,
    languages,
    subregion,
    borders,
    cca3,
  } = country;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Link to="/" className="text-blue-600 underline mb-4 inline-block">
        ← Back to list
      </Link>
      <div className="bg-white rounded-lg shadow p-6">
        <img
          src={flags.svg}
          alt={name.common}
          className="w-48 h-32 object-cover mb-4"
        />
        <h1 className="text-2xl font-bold mb-2">{name.common}</h1>
        <p>
          <strong>Capital:</strong> {capital?.[0]}
        </p>
        <p>
          <strong>Region:</strong> {region}
        </p>
        <p>
          <strong>Subregion:</strong> {subregion}
        </p>
        <p>
          <strong>Population:</strong> {population.toLocaleString()}
        </p>
        <p>
          <strong>Languages:</strong>{" "}
          {languages ? Object.values(languages).join(", ") : "N/A"}
        </p>
        <p>
          <strong>Borders:</strong> {borders?.join(", ") || "None"}
        </p>
        <p><strong>Country Code:</strong> {cca3}</p>
      </div>
    </div>
  );
};

export default CountryDetail;