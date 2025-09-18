import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Main_section from './components/Main_section'
import Cards from './components/Cards'
import Next5daysforecast from './components/Next5daysforecast'
import { IoSunnySharp } from 'react-icons/io5'
import { WiMoonAltNew } from 'react-icons/wi'
import { FaCloud, FaCloudMoon, FaCloudMoonRain, FaCloudRain, FaCloudSun, FaCloudSunRain, FaRegSnowflake, FaSoundcloud } from 'react-icons/fa'
import { FaCloudBolt } from 'react-icons/fa6'
import { RiMistFill } from 'react-icons/ri'
import Footer from './components/Footer'

function getDailyForecast(data){
  const grouped = {};

  data.list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];
    if(!grouped[date]){
      grouped[date] = {temps: [], weatherCounts: {}, iconCounts: {}};
    }

    grouped[date].temps.push(item.main.temp);

    const weatherMain  = item.weather[0].main;
    grouped[date].weatherCounts[weatherMain] = (grouped[date].weatherCounts[weatherMain] || 0) + 1;

    const icon = item.weather[0].icon;
    grouped[date].iconCounts[icon] = (grouped[date].iconCounts[icon] || 0) + 1;
  });

  return Object.keys(grouped).map((date) => {
    const temps = grouped[date].temps;
    const weatherCounts = grouped[date].weatherCounts;
    const iconCounts = grouped[date].iconCounts;

    const mostFrequentWeather = Object.keys(weatherCounts).reduce((a, b) => 
      weatherCounts[a] > weatherCounts[b] ? a : b
    );

    const mostFrequentIcon = Object.keys(iconCounts).reduce((a, b) => 
      iconCounts[a] > iconCounts[b] ? a : b
    );

  return{
    date,
    temp_min: Math.min(...temps),
    temp_max: Math.max(...temps),
    weather: mostFrequentWeather,
    icon: mostFrequentIcon,
  };
  });
}

const countryList = [
  "afghanistan", "albania", "algeria", "andorra", "angola", "antigua and barbuda", 
  "argentina", "armenia", "australia", "austria", "azerbaijan", "bahamas", "bahrain", 
  "bangladesh", "barbados", "belarus", "belgium", "belize", "benin", "bhutan", 
  "bolivia", "bosnia and herzegovina", "botswana", "brazil", "brunei", "bulgaria", 
  "burkina faso", "burundi", "cabo verde", "cambodia", "cameroon", "canada", 
  "central african republic", "chad", "chile", "china", "colombia", "comoros", 
  "congo", "costa rica", "croatia", "cuba", "cyprus", "czech republic", 
  "democratic republic of the congo", "denmark", "djibouti", "dominica", 
  "dominican republic", "ecuador", "egypt", "el salvador", "equatorial guinea", 
  "eritrea", "estonia", "eswatini", "ethiopia", "fiji", "finland", "france", 
  "gabon", "gambia", "georgia", "germany", "ghana", "greece", "grenada", 
  "guatemala", "guinea", "guinea-bissau", "guyana", "haiti", "honduras", "hungary", 
  "iceland", "india", "indonesia", "iran", "iraq", "ireland", "israel", "italy", 
  "ivory coast", "jamaica", "japan", "jordan", "kazakhstan", "kenya", "kiribati", 
  "kuwait", "kyrgyzstan", "laos", "latvia", "lebanon", "lesotho", "liberia", 
  "libya", "liechtenstein", "lithuania", "luxembourg", "madagascar", "malawi", 
  "malaysia", "maldives", "mali", "malta", "marshall islands", "mauritania", 
  "mauritius", "mexico", "micronesia", "moldova", "monaco", "mongolia", "montenegro", 
  "morocco", "mozambique", "myanmar", "namibia", "nauru", "nepal", "netherlands", 
  "new zealand", "nicaragua", "niger", "nigeria", "north korea", "north macedonia", 
  "norway", "oman", "pakistan", "palau", "palestine", "panama", "papua new guinea", 
  "paraguay", "peru", "philippines", "poland", "portugal", "qatar", "romania", 
  "russia", "rwanda", "saint kitts and nevis", "saint lucia", 
  "saint vincent and the grenadines", "samoa", "san marino", "sao tome and principe", 
  "saudi arabia", "senegal", "serbia", "seychelles", "sierra leone", "singapore", 
  "slovakia", "slovenia", "solomon islands", "somalia", "south africa", 
  "south korea", "south sudan", "spain", "sri lanka", "sudan", "suriname", 
  "sweden", "switzerland", "syria", "taiwan", "tajikistan", "tanzania", "thailand", 
  "timor-leste", "togo", "tonga", "trinidad and tobago", "tunisia", "turkey", 
  "turkmenistan", "tuvalu", "uganda", "ukraine", "united arab emirates", 
  "united kingdom", "united states", "uruguay", "uzbekistan", "vanuatu", 
  "vatican city", "venezuela", "vietnam", "yemen", "zambia", "zimbabwe"
];


const App = () => {
  const key = import.meta.env.VITE_APP_ID;
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);

  const allIcons1 = {
        "01d" : <IoSunnySharp size={160} className="text-yellow-400" />,
        "01n" : <WiMoonAltNew size={160} style={{ color: '#f4d03f' }} />,
        "02d" : <FaCloudSun size={160} style={{color: 'white'}}/>,
        "02n" : <FaCloudMoon size={160} style={{color: 'white'}}/>,
        "03d" : <FaCloud size={160} style={{color: 'white'}}/>,
        "03n" : <FaCloud size={160} style={{color: 'white'}}/>,
        "04d" : <FaSoundcloud size={160} style={{color: 'white'}}/>,
        "04n" : <FaSoundcloud size={160} style={{color: 'white'}}/>,
        "09d" : <FaCloudRain size={160} style={{color: 'white'}}/>,
        "09n" : <FaCloudRain size={160} style={{color: 'white'}}/>,
        "10d" : <FaCloudSunRain size={160} style={{color: 'white'}}/>,
        "10n" : <FaCloudMoonRain size={160} style={{color: 'white'}}/>,
        "11d" : <FaCloudBolt size={160} style={{color: 'white'}}/>,
        "11n" : <FaCloudBolt size={160} style={{color: 'white'}}/>,
        "13d" : <FaRegSnowflake size={160} style={{color: 'white'}}/>,
        "13n" : <FaRegSnowflake size={160} style={{color: 'white'}}/>,
        "50d" : <RiMistFill size={160} style={{color: 'white'}}/>,
        "50n" : <RiMistFill size={160} style={{color: 'white'}}/>,
  }

  const allIcons2 = {
        "01d" : <IoSunnySharp size={50} className="text-yellow-400" />,
        "01n" : <WiMoonAltNew size={50} style={{ color: '#f4d03f' }} />,
        "02d" : <FaCloudSun size={50} style={{color: 'white'}}/>,
        "02n" : <FaCloudMoon size={50} style={{color: 'white'}}/>,
        "03d" : <FaCloud size={50} style={{color: 'white'}}/>,
        "03n" : <FaCloud size={50} style={{color: 'white'}}/>,
        "04d" : <FaSoundcloud size={50} style={{color: 'white'}}/>,
        "04n" : <FaSoundcloud size={50} style={{color: 'white'}}/>,
        "09d" : <FaCloudRain size={50} style={{color: 'white'}}/>,
        "09n" : <FaCloudRain size={50} style={{color: 'white'}}/>,
        "10d" : <FaCloudSunRain size={50} style={{color: 'white'}}/>,
        "10n" : <FaCloudMoonRain size={50} style={{color: 'white'}}/>,
        "11d" : <FaCloudBolt size={50} style={{color: 'white'}}/>,
        "11n" : <FaCloudBolt size={50} style={{color: 'white'}}/>,
        "13d" : <FaRegSnowflake size={50} style={{color: 'white'}}/>,
        "13n" : <FaRegSnowflake size={50} style={{color: 'white'}}/>,
        "50d" : <RiMistFill size={50} style={{color: 'white'}}/>,
        "50n" : <RiMistFill size={50} style={{color: 'white'}}/>,
  }

  const handleSearch = async (city) => {
    if(!city || city == ""){
      alert("Enter City Name");
      return;
    }

    if(countryList.includes(city.toLowerCase())){
      alert("Please enter a city name, not a country.");
      return;
    }

    setLoading(true);
    
    //fetching current weather data
    try{
      const Current_Weather_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`;
      const res = await fetch(Current_Weather_url);
      const data = await res.json();

      if(!res.ok){
        alert(data.message);
        setLoading(false); 
        window.location.reload();
        return;
      }

      const icon1 = allIcons1[data.weather[0].icon] || <IoSunnySharp size={170} className="text-yellow-400" />
      const icon2 = allIcons2[data.weather[0].icon] || <IoSunnySharp size={40} className="text-yellow-400" />

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon1: icon1,
        icon2: icon2,
        maxTemperature: Math.floor(data.main.temp_max),
        minTemperature: Math.floor(data.main.temp_min),
        overAllWeather: data.weather[0].description,
      })
      
    } catch(error){
        setWeatherData(false);
        console.error("Error in fetching weather data");
        return;
    } finally {
      setLoading(false);
    }

    try {
        const forecast_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${key}`;
        const forecastRes = await fetch(forecast_URL);
        const forecastData = await forecastRes.json();

        if (!forecastRes.ok) {
          alert(forecastData.message);
          return;
        }

        const dailyForecast = getDailyForecast(forecastData);
        setForecast(dailyForecast.slice(1, 6)); 

    } catch (error) {
        console.error("Error in fetching FORECAST data:", error);
    }
  };

  useEffect(() => {
    handleSearch("Raipur");
  }, [])

  return (
    <div className='min-h-screen bg-gradient-to-b from-indigo-900 via-blue-900 to-gray-800'>
      <Navbar onSearch={handleSearch}/>
      {loading ? (
        <div className="flex justify-center items-center mt-10">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-300" />
        </div>
      ) : (
        <>
          {weatherData && <Main_section weather={weatherData} />}
          {weatherData && <Cards weatherdetail={weatherData} />}
          {forecast.length > 0 && <Next5daysforecast forecast={forecast} />}
        </>
      )}
      <Footer/>
    </div>
  )
}

export default App