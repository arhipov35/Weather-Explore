import './Select.css'


function Select({ materilas, town, fun }) {
    // Function to filter cities by the entered `town` value
    const filteredCities = (country) => {
        if (town) {
            return materilas[country].filter(city =>
                city.toLowerCase().startsWith(town.toLowerCase())
            )
        }
        else {
            return []
        }
    }

    // Function to output filtered cities
    function filtercity(filteredCities) {
        return (<>
            {filteredCities.map((city, index) => (
                <div className="city-back" key={index}>
                    <li className="city-item" onClick={() => handleCityClick(city)}>{city}</li>
                </div>
            ))}
        </>)
    }

    function handleCityClick(city) {
        fun(city);
    }
    return (<>
        <ul>
            {Object.keys(materilas).map((country, index) => (
                filteredCities(country).length > 0 && (
                    <li key={index}>
                        {filtercity(filteredCities(country))}
                    </li>
                )
            ))}
        </ul>
    </>)
}
export default Select;