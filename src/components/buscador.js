import { useState } from 'react';
//import Nominatim from 'nominatim-geocoder';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    const geocoder = new Nominatim();
    const results = await geocoder.search({ q: query });

    if (results.length > 0) {
      const { lat, lon } = results[0];
      onSearch({ lat: parseFloat(lat), lon: parseFloat(lon) });
    }
  };

  return (
    <div>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
};

export default SearchBar;
