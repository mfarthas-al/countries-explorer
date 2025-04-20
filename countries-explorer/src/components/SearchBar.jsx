import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Search } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  // 🔁 Debounced dynamic search
  useEffect(() => {
    const delay = setTimeout(() => {
      onSearch(query);
    }, 300); // debounce delay

    return () => clearTimeout(delay);
  }, [query]);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form className="relative group" onSubmit={(e) => e.preventDefault()}>
        <div className="relative flex items-center overflow-hidden rounded-full shadow-md bg-white transition-all duration-300 focus-within:shadow-lg">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a country..."
            className="w-full py-3 px-5 outline-none text-gray-700 bg-transparent transition-all duration-300 focus:pl-6"
            aria-label="Search for a country"
          />
          <button
            type="submit"
            className="absolute right-0 h-full px-5 flex items-center justify-center bg-blue-600 text-white transition-all duration-300 hover:bg-blue-700"
            aria-label="Search"
          >
            <Search size={20} className="transition-transform duration-300 group-hover:scale-110" />
            <span className="ml-2 font-medium max-md:hidden">Search</span>
          </button>
        </div>
      </form>
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired
};

export default SearchBar;
