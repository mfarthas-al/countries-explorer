import React from "react";
import { useEffect, useState } from "react";
import {
  getAllCountries,
  getCountryByName,
  getCountriesByRegion,
} from "../api/countries";
import CountryCard from "./CountryCard";
import SearchBar from "./SearchBar";
import FiltersSidebar from "./FiltersSidebar";
import { Globe, Loader } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";

const CountryList = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [displayedCountries, setDisplayedCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [regions, setRegions] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const countriesPerPage = 20;
  const [isSearching, setIsSearching] = useState(false);

  const { user, logout } = useUser();

  useEffect(() => {
    getAllCountries()
      .then((data) => {
        setAllCountries(data);
        setDisplayedCountries(data);
      })
      .catch(() => setError("Failed to load countries"))
      .finally(() => setLoading(false));
  }, []);

  const applyLanguageFilter = (countries) => {
    if (languages.length === 0) return countries;
    return countries.filter(
      (country) =>
        country.languages &&
        Object.values(country.languages)
          .map((l) => l.toLowerCase())
          .some((lang) => languages.includes(lang))
    );
  };

  const applyAllFilters = (countries) => {
    let result = applyLanguageFilter(countries);
    if (regions.length > 0) {
      result = result.filter((c) => regions.includes(c.region.toLowerCase()));
    }
    return result;
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
    setIsSearching(true);

    if (query.trim() === "") {
      setLoading(true);
      try {
        if (regions.length === 0) {
          const all = await getAllCountries();
          setDisplayedCountries(applyLanguageFilter(all));
        } else {
          const regionData = await Promise.all(
            regions.map((r) => getCountriesByRegion(r))
          );
          const merged = [...new Set(regionData.flat())];
          setDisplayedCountries(applyLanguageFilter(merged));
        }
      } catch {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
        setIsSearching(false);
      }
      return;
    }

    try {
      setLoading(true);
      const data = await getCountryByName(query);
      const filtered = applyAllFilters(data);
      setDisplayedCountries(filtered);
    } catch {
      setError("No country found");
      setDisplayedCountries([]);
    } finally {
      setLoading(false);
      setIsSearching(false);
    }
  };

  const handleToggleRegion = async (region) => {
    setError("");
    const updated = regions.includes(region)
      ? regions.filter((r) => r !== region)
      : [...regions, region];
    setRegions(updated);
    setCurrentPage(1);
  };

  const handleToggleLanguage = (lang) => {
    setError("");
    const updated = languages.includes(lang)
      ? languages.filter((l) => l !== lang)
      : [...languages, lang];
    setLanguages(updated);
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (isSearching) return;

      setLoading(true);
      try {
        let filtered = [];

        if (regions.length === 0) {
          filtered = [...allCountries];
        } else {
          const regionData = await Promise.all(
            regions.map((r) => getCountriesByRegion(r))
          );
          filtered = [...new Set(regionData.flat())];
        }

        if (searchQuery.trim() !== "") {
          filtered = filtered.filter((country) =>
            country.name.common
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          );
        }

        filtered = applyLanguageFilter(filtered);
        setDisplayedCountries(filtered);
      } catch {
        setError("Error filtering data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [regions, languages, allCountries, searchQuery, isSearching]);

  // PAGINATION
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = displayedCountries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  const totalPages = Math.ceil(displayedCountries.length / countriesPerPage);

  const goToPage = (page) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setCurrentPage(page);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 text-center">
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover countries around the world, their flags, populations, and
          more.
        </p>
      </div>

      <div className="mb-8">
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="flex flex-col sm:flex-row gap-6">
        <FiltersSidebar
          selectedRegions={regions}
          selectedLanguages={languages}
          onToggleRegion={handleToggleRegion}
          onToggleLanguage={handleToggleLanguage}
        />

        <div className="flex-1">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 animate-fadeIn">
              <p className="text-center font-medium">{error}</p>
            </div>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader className="h-12 w-12 text-blue-600 animate-spin mb-4" />
              <p className="text-gray-600 text-lg">Loading countries...</p>
            </div>
          ) : (
            <>
              {displayedCountries.length > 0 ? (
                <div className="space-y-6 animate-fadeIn">
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-medium text-gray-500">
                      {displayedCountries.length === 1
                        ? "1 country found"
                        : `${displayedCountries.length} countries found`}
                    </div>

                    <div className="text-sm font-medium text-gray-500">
                      Showing {indexOfFirstCountry + 1}–
                      {Math.min(indexOfLastCountry, displayedCountries.length)}{" "}
                      of {displayedCountries.length}
                    </div>
                  </div>

                  <motion.div
                    layout
                    className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
                  >
                    <AnimatePresence>
                      {currentCountries.map((country) => (
                        <CountryCard key={country.cca3} country={country} />
                      ))}
                    </AnimatePresence>
                  </motion.div>

                  {/* Pagination Controls */}
                  {displayedCountries.length > countriesPerPage && (
                    <div className="mt-8 flex justify-center">
                      <nav className="flex items-center gap-1 rounded-lg bg-white shadow-sm p-2 border border-gray-100">
                        <button
                          onClick={() => goToPage(1)}
                          disabled={currentPage === 1}
                          className="p-2 rounded-md text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed transition hover:bg-gray-100"
                          aria-label="First page"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="11 17 6 12 11 7"></polyline>
                            <polyline points="18 17 13 12 18 7"></polyline>
                          </svg>
                        </button>

                        <button
                          onClick={() => goToPage(Math.max(currentPage - 1, 1))}
                          disabled={currentPage === 1}
                          className="p-2 rounded-md text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed transition hover:bg-gray-100"
                          aria-label="Previous page"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="15 18 9 12 15 6"></polyline>
                          </svg>
                        </button>

                        <div className="px-4 py-2 font-medium text-sm text-gray-700">
                          Page {currentPage} of {totalPages}
                        </div>

                        <button
                          onClick={() =>
                            goToPage(Math.min(currentPage + 1, totalPages))
                          }
                          disabled={currentPage === totalPages}
                          className="p-2 rounded-md text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed transition hover:bg-gray-100"
                          aria-label="Next page"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="9 18 15 12 9 6"></polyline>
                          </svg>
                        </button>

                        <button
                          onClick={() => goToPage(totalPages)}
                          disabled={currentPage === totalPages}
                          className="p-2 rounded-md text-gray-600 disabled:opacity-40 disabled:cursor-not-allowed transition hover:bg-gray-100"
                          aria-label="Last page"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="13 17 18 12 13 7"></polyline>
                            <polyline points="6 17 11 12 6 7"></polyline>
                          </svg>
                        </button>
                      </nav>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg p-12 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                    <Globe className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">
                    No countries found
                  </h3>
                  <p className="text-gray-500">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountryList;
