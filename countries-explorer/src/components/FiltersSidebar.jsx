import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { ChevronDown, ChevronUp, Filter, Check } from "lucide-react";

const FiltersSidebar = ({
  selectedRegions,
  selectedLanguages,
  onToggleRegion,
  onToggleLanguage,
}) => {
  const [isRegionsOpen, setIsRegionsOpen] = useState(true);
  const [isLanguagesOpen, setIsLanguagesOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const regions = ["africa", "americas", "asia", "europe", "oceania"];

  const languages = [
    "english",
    "spanish",
    "french",
    "arabic",
    "russian",
    "chinese",
    "japanese",
    "tamil",
    "sinhala",
  ];

  return (
    <>
      {/* Sidebar Content */}
      <div
        className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 ease-in-out
          ${
            isMobileOpen
              ? "max-h-[1000px] opacity-100"
              : "max-h-0 sm:max-h-[1000px] opacity-0 sm:opacity-100"
          }
          w-full sm:w-60 shrink-0`}
      >
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-6">
            <Filter className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
          </div>
          <div className="mb-4">
            <button
              onClick={() => setIsRegionsOpen(!isRegionsOpen)}
              className="w-full flex items-center justify-between p-2 bg-gray-50 rounded-md font-medium text-gray-700 transition-colors hover:bg-gray-100"
            >
              <span>Regions</span>
              {isRegionsOpen ? (
                <ChevronUp size={18} className="text-gray-500" />
              ) : (
                <ChevronDown size={18} className="text-gray-500" />
              )}
            </button>

            <div
              className={`mt-2 space-y-1 transition-all duration-300 ease-in-out overflow-hidden ${
                isRegionsOpen ? "max-h-60" : "max-h-0"
              }`}
            >
              {regions.map((region) => (
                <label
                  key={region}
                  className="flex items-center p-2 rounded-md cursor-pointer transition-colors hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    checked={selectedRegions.includes(region)}
                    onChange={() => onToggleRegion(region)}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700 capitalize">
                    {region}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <button
              onClick={() => setIsLanguagesOpen(!isLanguagesOpen)}
              className="w-full flex items-center justify-between p-2 bg-gray-50 rounded-md font-medium text-gray-700 transition-colors hover:bg-gray-100"
            >
              <span>Languages</span>
              {isLanguagesOpen ? (
                <ChevronUp size={18} className="text-gray-500" />
              ) : (
                <ChevronDown size={18} className="text-gray-500" />
              )}
            </button>

            <div
              className={`mt-2 space-y-1 transition-all duration-300 ease-in-out overflow-hidden ${
                isLanguagesOpen ? "max-h-96" : "max-h-0"
              }`}
            >
              {languages.map((language) => (
                <label
                  key={language}
                  className="flex items-center p-2 rounded-md cursor-pointer transition-colors hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    checked={selectedLanguages.includes(language)}
                    onChange={() => onToggleLanguage(language)}
                    className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700 capitalize">
                    {language}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

FiltersSidebar.propTypes = {
  selectedRegions: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedLanguages: PropTypes.arrayOf(PropTypes.string).isRequired,
  onToggleRegion: PropTypes.func.isRequired,
  onToggleLanguage: PropTypes.func.isRequired,
};

export default FiltersSidebar;
