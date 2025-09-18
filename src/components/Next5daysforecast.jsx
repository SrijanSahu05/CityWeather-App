
const Next5daysforecast = ({ forecast }) => {
  if (!forecast || forecast.length === 0) return null;

  // days ke name nikalna
  const getDayName = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { weekday: "long" });
  };

  return (
        <div className="mt-10 px-4">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">
            Next 5 Days Weather Forecast
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {forecast.map((day, index) => (
            <div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-6 flex flex-col items-center text-white cursor-pointer hover:scale-105 hover:shadow-2xl transition-transform duration-300 ease-in-out"
            >
                <h3 className="text-lg font-semibold mb-2">
                {getDayName(day.date)}
                </h3>
                {/* Date display */}
                <p className="text-sm mb-2">
                  {new Date(day.date).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                  })}
                </p>
                <img
                src={`http://openweathermap.org/img/wn/${day.icon}@2x.png`}
                alt={day.weather}
                className="w-16 h-16"
                />
                <p className="mt-2 text-sm">{day.weather}</p>
                <p className="mt-2 text-base">
                <span className="font-bold">{Math.round(day.temp_max)}°C</span> /{" "}
                <span>{Math.round(day.temp_min)}°C</span>
                </p>
            </div>
            ))}
        </div>
        </div>
  );
};

export default Next5daysforecast;
