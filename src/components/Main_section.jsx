
import React from 'react'
import { IoSunnySharp } from 'react-icons/io5'

const Main_section = ({ weather }) => {
    const currentDate = new Date();

    //Date
    const options = {weekday: "long", day: "numeric", month: "short", year: "numeric"}
    const formattedDate = currentDate.toLocaleDateString("en-US", options);

    //Time
    const timeOptions = {hour: "2-digit", minute: "2-digit", hour12: true};
    const formattedTime = currentDate.toLocaleTimeString("en-US", timeOptions);

  return (
    <div className="p-5">
        <div className="w-full md:w-[75%] bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl 
        p-6 sm:p-10 border border-white/20 text-white m-auto 
        hover:scale-[1.02] hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] transition-all duration-300 ease-in-out cursor-pointer">

            {/* Top Section */}
            <div className="flex flex-col md:flex-row items-center justify-around gap-8">
            
                {/* Weather Icon */}
                <div className="flex justify-center md:justify-start"> {weather.icon1} </div>

                {/* Weather Info */}
                <div className="text-center md:text-right">
                    <h2 className="text-5xl sm:text-6xl md:text-6xl lg:text-8xl font-extrabold leading-tight drop-shadow-lg">
                        {weather.temperature}°C
                    </h2>
                    <p className="text-xs sm:text-sm md:text-base text-gray-300 mt-2 tracking-wide uppercase">
                    Temperature
                     </p>
                </div>


                {/* Location Info */}
                <div className="text-center md:text-right">
                    <p className="text-2xl sm:text-3xl font-semibold drop-shadow-md">{weather.location} City</p>
                    <p className="text-sm text-gray-300 mt-2 italic">{formattedDate} | {formattedTime}</p>
                </div>

            </div>
        </div>
    </div>

  )
}

export default Main_section