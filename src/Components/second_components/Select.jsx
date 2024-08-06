import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import './Select.css'


function Select({ materilas, town, fun }) {
    // Функція для фільтрації міст за введеним значенням `town`
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

    // Функція для виведення відфільтрованих міст
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