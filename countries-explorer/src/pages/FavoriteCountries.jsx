import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { getCountryByCode } from "../api/countries";
import CountryCard from "../components/CountryCard";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const FavoriteCountries = () => {
  const { user, getFavorites } = useUser();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) return;

      const codes = getFavorites();
      const results = await Promise.all(codes.map(getCountryByCode));
      setFavorites(results);
      setLoading(false);
    };

    fetchFavorites();
  }, [getFavorites().join(","), user]);

  if (!user) {
    return <p className="text-center mt-6">Please log in to view favorites.</p>;
  }

  if (loading) {
    return <p className="text-center mt-6">Loading favorite countries...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <Link
        to="/"
        className="mt-6 inline-flex items-center text-blue-600 hover:text-blue-800"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to countries list
      </Link>
      <h2 className="text-2xl font-bold mb-4">Your Favorite Countries</h2>
      {favorites.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {favorites.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      ) : (
        <p>No favorite countries yet. Go explore and ❤️ some!</p>
      )}
    </div>
  );
};

export default FavoriteCountries;
