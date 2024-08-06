import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setError, setVisible, setHoverIndex, setDelete } from "./store/statesSlice";
import Select from "./Components/second_components/Select";
import './Main.css'
import materilas from "../src/data/countries.json";
import './Components/WeatherCard.css'
import WeatherIMG from "./Components/second_components/WeatherIMG";
import { useOnboarding } from "./OnboardingContext";
import Joyride from 'react-joyride';
// import { setBackgrnd } from "./store/colorSet";
import './Media.css'

function Main() {

    const [town, setTown] = useState('');


    const key = 'bbe82e75bbbe6c6353822f8cc17b8452';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${town}&units=metric&appid=${key}`;

    const dispatch = useDispatch();
    const error = useSelector((state) => state.states.error);
    const visible = useSelector((state) => state.states.visible);
    const hoverIndex = useSelector((state) => state.states.hoverIndex);
    const delet = useSelector((state) => state.states.delet);
    const selectedBackgrnd = useSelector((state) => state.ui.backgrnd);
    // const [delet, setDelete] = useState(null);
    const [activeCardIndex, setActiveCardIndex] = useState(null);
    const [cards, setCards] = useState(() => {
        // Ініціалізація з localStorage
        const storedCards = JSON.parse(localStorage.getItem('cards'));
        return storedCards ? storedCards : Array(8).fill({ city: null, weather: null });
    });

    //Формування картки
    const addCard = async (event, index) => {
        if ((event.key === "Enter" || event.type === 'click') && town.trim()) {
            dispatch(setError(null));
            try {
                const response = await fetch(url);
                const data = await response.json();
                if (response.ok) {
                    // Метод some є потужним інструментом для перевірки наявності принаймні одного елемента в масиві, який задовольняє певній умові
                    if (!cards.some(card => card.city === data.name)) {
                        const newCards = [...cards];
                        newCards[index] = { city: data.name, weather: data };
                        setCards(newCards);
                        setTown('');
                        dispatch(setError(null));
                        console.log(data);
                    }
                    else {
                        dispatch(setError('City is already added'));
                        setTown('');
                    }
                }
                else {
                    dispatch(setError('No city found'));
                    setTown('');
                }
            }
            catch (error) {
                dispatch(setError('Failed to fetch weather data'));
                setTown('');
            }
        }

    }
    function newTown(city) {
        setTown(city);
    }
    console.log(hoverIndex);
    //перевірка чи потрібно будувати сітку 4 на 4
    useEffect(() => {
        if (cards.every(card => card.city === null)) {
            dispatch(setVisible(true));
        } else {
            dispatch(setVisible(false));
        }
    }, [cards]);

    //Запис в localstarge
    useEffect(() => {
        localStorage.setItem('cards', JSON.stringify(cards));
    }, [cards]);

    // Видалення
    const deleteCards = (town) => {
        const updatedCards = cards.map(card =>
            card.city === town ? { ...card, city: null, weather: null } : card
        );
        setCards(updatedCards);
        dispatch(setDelete(null));
    };

    const handleCardClick = (index) => {
        if (index !== activeCardIndex) {
            setActiveCardIndex(index);
            dispatch(setError(null));
            setNewError(null);
            setTown(''); // Очищення поля вводу при зміні картки
        }
    };
    //Завантаження даних про погоду при монтуванні компонента
    // Це асинхронна функція, яка буде завантажувати дані про погоду для всіх міст, що є у масиві cards.
    const fetchWeatherData = async () => {
        const updatedCards = await Promise.all(cards.map(async (card) => {
            if (card.city) {
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${card.city}&units=metric&appid=${key}`;
                const response = await fetch(url);
                const weatherData = await response.json();
                return { city: card.city, weather: weatherData };
            }
            return card;
        }));
        setCards(updatedCards);
    };

    //Для того щоб дані оновлювалися
    useEffect(() => {
        fetchWeatherData(); // Викликати fetchWeatherData при першому завантаженні
    }, []);


    const ConfirmDeleteCard = ({ index, cardCity }) => (
        <div className="main-delete-card">
            <p className="action-text">Delete weather card?</p>
            <div className="action-cards">
                <button className="cancel-card" onClick={() => dispatch(setDelete(null))}>Cancel</button>
                <button className="delete-card" onClick={() => deleteCards(cardCity.city)}>Delete</button>
            </div>
        </div>
    );
    const [changeCity, setChangeCity] = useState(null);
    const [newError, setNewError] = useState(null);
    const updateCard = async (event, index, newCity) => {
        const url2 = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&units=metric&appid=${key}`;
        if ((event.key === "Enter" || event.type === 'click') && newCity.trim()) {
            setNewError(null);
            try {
                const response = await fetch(url2);
                const data = await response.json();
                if (response.ok) {
                    if (!cards.some(card => card.city === data.name)) {
                        const newCards = [...cards];
                        newCards[index] = { city: data.name, weather: data };
                        setCards(newCards);
                        setChangeCity(null);
                        setNewError(null);
                        console.log(data);
                    } else {
                        setNewError('City is already added');
                    }
                } else {
                    setNewError('No city found');
                }
            } catch (error) {
                setNewError('Failed to fetch weather data');
            }
        }
    };
    const UpdateCity = ({ index, cardCity }) => {
        const [newCity, setNewCity] = useState('');
        function updateTown(city) {
            setNewCity(city);
        }
        return (
            <div className="card-index ">
                <div onClick={() => setChangeCity(null)} className="back-card-index">
                    <img src="/img/back.svg" alt="" />
                </div>
                <div className="card-field">
                    <div className="card-label">
                        <label className="first-label" htmlFor="card-input">Change a city</label>
                    </div>
                    <div className="input-second-main">
                        <input
                            value={newCity}
                            onKeyDown={(event) => updateCard(event, index, newCity)}
                            onChange={(e) => setNewCity(e.target.value)}
                            type="text"
                            id="card-input"
                            className={`card-input ${newError ? 'error' : ''}`}
                            placeholder={cardCity.city}
                        />
                        <div className="card-item-search pos-x" onClick={(event) => updateCard(event, index, newCity)}>
                            <svg className="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M20 20L14.5 14.5M16 10C16 13.3137 13.3137 16 10 16C6.68629 16 4 13.3137 4 10C4 6.68629 6.68629 4 10 4C13.3137 4 16 6.68629 16 10Z" stroke="black" stroke-opacity="0.44" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                    </div>
                    <div className="list">
                        <Select fun={updateTown} town={newCity} materilas={materilas}></Select>
                    </div>
                    {newError ? (
                        <div className="card-label">
                            <label className="second-label" htmlFor="card-input" style={{ color: 'red' }}>{newError}</label>
                        </div>
                    ) : (
                        <div className="card-label">
                            <label className="second-label" htmlFor="card-input">Choose your location</label>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    useEffect(() => {
        if (changeCity === null) {
            setNewError(null);
        }
    }, [changeCity]);

    useEffect(() => {
        if (hoverIndex === null) {
            dispatch(setError(null));
        }
    }, [hoverIndex]);

    const { runTour, handleJoyrideCallback, steps } = useOnboarding();

    return (
        <>
            <Joyride
                steps={steps}
                run={runTour}
                continuous={true}
                showSkipButton={true}
                callback={handleJoyrideCallback}
                styles={{
                    options: {
                        zIndex: 10000,
                        arrowColor: '#fff',
                        backgroundColor: '#fff',
                        overlayColor: 'rgba(0, 0, 0, 0.4)',
                        primaryColor: '#6c757d',
                        textColor: '#333',
                        spotlightShadow: '0 0 0 3px rgba(0, 0, 0, 0.5)',
                        beaconSize: 26,
                        beaconColor: 'var(--Black-4, rgba(0, 0, 0, 0.04))',
                        borderRadius: '8px',
                    },
                    button: {
                        borderRadius: '8px', // Додаємо заокруглення до кнопки
                    }
                }}
            />
            <div className="Main" style={{ background: selectedBackgrnd, minHeight: visible ? '0' : 'calc(100vh)' }}>
                <div className="container">
                    {visible ? (
                        <div className="card-main one-card">
                            <div className="card-main-content">
                                <div className="card-field">
                                    <div className="card-label">
                                        <label className="first-label" htmlFor="card-input">Add a city</label>
                                    </div>
                                    <input value={town} onKeyDown={(event) => addCard(event, 0)} onChange={(e) => setTown(e.target.value)} type="text" id="card-input" className={`card-input ${error ? 'error' : ''}`} placeholder="Kyiv" />
                                    <div className="card-item-search" onClick={(event) => addCard(event, 0)}>
                                        <svg className="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path d="M20 20L14.5 14.5M16 10C16 13.3137 13.3137 16 10 16C6.68629 16 4 13.3137 4 10C4 6.68629 6.68629 4 10 4C13.3137 4 16 6.68629 16 10Z" stroke="black" stroke-opacity="0.44" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </div>
                                    <div className="list">
                                        <Select fun={newTown} town={town} materilas={materilas}></Select>
                                    </div>
                                    {error ? (<div className="card-label">
                                        <label className="second-label" htmlFor="card-input" style={{ color: 'red' }}>{error}</label>
                                    </div>) :
                                        (<div className="card-label">
                                            <label className="second-label" htmlFor="card-input">Choose your location</label>
                                        </div>)
                                    }
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="row row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-sm-1 row-cols-xs-1 g-4" style={{ padding: '8px 0 32px 0' }}>
                            {cards.map((cardCity, index) => (
                                // прибрав margin-top:16px та додав transition
                                <div onClick={() => handleCardClick(index)} style={{ padding: '0px 8px 0px 8px', transition: 'all 0.4s ease-in-out' }} key={index}
                                    className={`${cards.length - index <= 2 ? 'mx-auto' : ''}`}
                                >
                                    <div className="design-card" >
                                        {changeCity === index ? (<>
                                            <UpdateCity index={index} cardCity={cardCity} />
                                        </>)
                                            : delet === index ? (<>
                                                <ConfirmDeleteCard index={index} cardCity={cardCity} />
                                            </>) : cardCity.city ? (
                                                <>
                                                    <div className="main-design-card">
                                                        <div className="main-data-card">
                                                            <div className="actions-card">
                                                                <img onClick={() => setChangeCity(index)} className="action-change" src="/img/change.svg" alt="" />
                                                                <img onClick={() => dispatch(setDelete(index))} className="action-delete" src="/img/delete.svg" alt="" />
                                                            </div>
                                                            <p className="city-data-card">{cardCity.weather ? cardCity.weather.name : ''}</p>
                                                            <div className="weather-data-card">
                                                                <h1 className="temperature-card">{cardCity.weather ? cardCity.weather.main.temp.toFixed() + '°' : ''}</h1>
                                                                <div className="weather-condition-card">
                                                                    <p className="state-weather-card">{cardCity.weather ? cardCity.weather.weather[0].main : ''}</p>
                                                                    <div className="feeling-like-card">
                                                                        <p className="feel-like-text">Feeling like</p>
                                                                        <h4 className="feel-temperature">{cardCity.weather ? cardCity.weather.main.feels_like.toFixed() + '°' : ''}</h4>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="image-weather-card">
                                                                <WeatherIMG data={cardCity.weather.weather[0].main}></WeatherIMG>
                                                            </div>
                                                            <div className="humidity-wind-card">
                                                                <div className="humidity">
                                                                    <div className="label-state">
                                                                        <img src="/img/humidity.svg" alt="" />
                                                                        <p className="hamidity-text">Humidity</p>
                                                                    </div>
                                                                    <h4 className="text-result">{cardCity.weather.main.humidity + '%'}</h4>
                                                                </div>
                                                                <div className="humidity">
                                                                    <div className="label-state">
                                                                        <img src="/img/wind.svg" alt="" />
                                                                        <p className="hamidity-text">Wind</p>
                                                                    </div>
                                                                    <div className="wind-position">
                                                                        <h4 className="text-result">{cardCity.weather.wind.speed.toFixed() + 'm/s'}</h4>
                                                                    </div>

                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            ) : (
                                                hoverIndex === index ? (
                                                    <>
                                                        <div className="card-index ">
                                                            <div onClick={() => dispatch(setHoverIndex(null))} className="back-card-index">
                                                                <img src="/img/back.svg" alt="" />
                                                            </div>
                                                            <div className="card-field">
                                                                <div className="card-label">
                                                                    <label className="first-label" htmlFor="card-input">Add a city</label>
                                                                </div>
                                                                <div className="input-second-main">
                                                                    <input value={town} onKeyDown={(event) => addCard(event, index)} onChange={(e) => setTown(e.target.value)} type="text" id="card-input" className={`card-border card-input ${error ? 'error' : ''}`} placeholder="Kyiv" />
                                                                    <div className="card-item-search pos-x" onClick={(event) => addCard(event, index)}>
                                                                        <svg className="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                                            <path d="M20 20L14.5 14.5M16 10C16 13.3137 13.3137 16 10 16C6.68629 16 4 13.3137 4 10C4 6.68629 6.68629 4 10 4C13.3137 4 16 6.68629 16 10Z" stroke="black" stroke-opacity="0.44" stroke-linecap="round" stroke-linejoin="round" />
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                                <div className="list">
                                                                    <Select fun={newTown} town={town} materilas={materilas}></Select>
                                                                </div>
                                                                {error ? (<div className="card-label">
                                                                    <label className="second-label" htmlFor="card-input" style={{ color: 'red' }}>{error}</label>
                                                                </div>) :
                                                                    (<div className="card-label">
                                                                        <label className="second-label" htmlFor="card-input">Choose your location</label>
                                                                    </div>)
                                                                }
                                                            </div>
                                                        </div>
                                                    </>
                                                ) : (<>
                                                    <div className="addCity" onClick={() => dispatch(setHoverIndex(index))}>
                                                        <div className="addCity-content">
                                                            <img src="/img/location.svg" alt="" />
                                                            <p className="addCity-text">Add a city</p>
                                                        </div>
                                                    </div>
                                                </>)
                                            )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div >
        </>
    );
}

export default Main;
