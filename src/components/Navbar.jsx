import { useState } from 'react'
import { CiCloudOn } from 'react-icons/ci'
import { FaSearch } from 'react-icons/fa'

const Navbar = ({ onSearch }) => {
    const [inputValue, setInputValue] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const handleInputChange = async (e) => {
        const value = e.target.value;
        setInputValue(value);

        if (value.length > 2) {
            try {
                const key = import.meta.env.VITE_APP_ID;
                const url = `https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${key}`;
                const res = await fetch(url);
                const data = await res.json();

                setSuggestions(data);
            } catch (error) {
                console.error("Error fetching suggestions:", error);
            }
        } 
        else {
            setSuggestions([]);
        }
    };

    const handlekeyDown = (e) => {
        if(e.key === "Enter" && window.innerWidth >= 1024){
            handleSearchClick();
        }
    }

    const handleSearchClick = () => {
        if (inputValue.trim() !== "") {
        onSearch(inputValue);
        setInputValue(""); 
        setSuggestions([]);
        }
    };

    const handleSelectCity = (city) => {
        setInputValue(`${city.name}, ${city.country}`);
        setInputValue("");  
        setSuggestions([]);
        onSearch(`${city.name}, ${city.country}`);
    };

  return (
    <div className='flex flex-col gap-2 md:flex-row items-center justify-between p-5'>
        <div className='flex items-center gap-2'>
            <CiCloudOn size={40} style={{color: "white"}}/>
            <h1 className='text-lg sm:text-xl md:text-2xl font-bold text-white'>CityWeather</h1>
        </div>

        {/* Search bar */}
        <div className="relative w-full md:w-auto max-w-md">
            <div className="flex items-center bg-white rounded-full shadow-md px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                <input
                    type="text"
                    placeholder="Search City..."
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={handlekeyDown}
                    className="ml-2 w-full bg-transparent focus:outline-none text-gray-700 text-sm sm:text-base"
                />
                <FaSearch
                    onClick={handleSearchClick}
                    className="text-gray-500 text-2xl font-bold cursor-pointer"
                />
            </div>

            {/* Suggestions dropdown */}
            {suggestions.length > 0 && (
            <ul className="absolute top-12 left-0 w-full bg-white shadow-lg rounded-lg max-h-60 overflow-y-auto z-50">
                {suggestions.map((city, index) => (
                <li
                    key={index}
                    onClick={() => handleSelectCity(city)}
                    className="px-4 py-2 cursor-pointer hover:bg-blue-100 text-gray-700"
                >
                    {city.name}
                    {city.state ? `, ${city.state}` : ""}, {city.country}
                </li>
                ))}
            </ul>
            )}
        </div>
    </div>
  )
}

export default Navbar