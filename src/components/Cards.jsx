import { FaTemperatureArrowDown, FaTemperatureArrowUp } from 'react-icons/fa6'
import { MdAir } from 'react-icons/md'
import { WiHumidity } from 'react-icons/wi'

const Cards = ({ weatherdetail }) => {
  return (
    <div className="p-5">
        {/* Container */}
        <div className="w-full md:w-[75%] m-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            
            {/* Card 1 - Humidity */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg p-4 border border-white/20 text-white flex flex-col items-center 
                            cursor-pointer hover:scale-105 hover:shadow-2xl transition-transform duration-300 ease-in-out">
                <WiHumidity size={40} />
                <span className="text-lg font-semibold">Humidity</span>
                <p className="text-2xl font-bold mt-2">{weatherdetail.humidity}%</p>
            </div>

            {/* Card 2 - Wind Speed */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg p-4 border border-white/20 text-white flex flex-col items-center 
                            cursor-pointer hover:scale-105 hover:shadow-2xl transition-transform duration-300 ease-in-out">
                <MdAir size={40} />
                <span className="text-lg font-semibold">Wind</span>
                <p className="text-2xl font-bold mt-2">{weatherdetail.windSpeed} km/h</p>
            </div>

            {/* Card 3 - Min Temp */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg p-4 border border-white/20 text-white flex flex-col items-center 
                            cursor-pointer hover:scale-105 hover:shadow-2xl transition-transform duration-300 ease-in-out">
                <FaTemperatureArrowDown size={40} />
                <span className="text-lg font-semibold">Min Temp</span>
                <p className="text-2xl font-bold mt-2">{weatherdetail.minTemperature}°C</p>
            </div>

            {/* Card 4 - Max Temp */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg p-4 border border-white/20 text-white flex flex-col items-center 
                            cursor-pointer hover:scale-105 hover:shadow-2xl transition-transform duration-300 ease-in-out">
                <FaTemperatureArrowUp size={40} />
                <span className="text-lg font-semibold">Max Temp</span>
                <p className="text-2xl font-bold mt-2">{weatherdetail.maxTemperature}°C</p>
            </div>

            {/* Card 5 */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg p-4 border border-white/20 text-white flex flex-col items-center 
                            cursor-pointer hover:scale-105 hover:shadow-2xl transition-transform duration-300 ease-in-out">
                {weatherdetail.icon2}
                <span className="text-lg font-semibold capitalize mt-2">{weatherdetail.overAllWeather}</span>
            </div>

        </div>
    </div>
  )
}

export default Cards