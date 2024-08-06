function WeatherIMG({ data }) {
    if (data === 'Clear') {
        return (
            <>
                <img className="manager-img" src="/img/sun.svg" alt="" />
            </>)
    }
    else if (data === 'Clouds') {
        return (
            <>
                <img className="manager-img" src="/img/cloud.svg" alt="" />
            </>)
    }
    else if (data === 'Rain') {
        return (
            <>
                <img className="manager-img" src="/img/rain.svg" alt="" />
            </>)
    }
    else if (data === 'Mist') {
        return (
            <>
                <img className="manager-img" src="/img/mist.svg" alt="" />
            </>)
    }
    else if (data === 'Drizzle') {
        return (
            <>
                <img className="manager-img" src="/img/drizzle.svg" alt="" />
            </>)
    }
    else if (data === 'Haze') {
        return (
            <>
                <img className="manager-img" src="/img/haze.svg" alt="" />
            </>)
    }
    else if (data === 'Snow') {
        return (
            <>
                <img className="manager-img" src="/img/snow.svg" alt="" />
            </>)
    }
    else if (data === 'Smoke') {
        return (
            <>
                <img className="manager-img" src="/img/smoke.svg" alt="" />
            </>)
    }
    else {
        return (
            <>
                <img className="manager-img" src="/img/cloud.svg" alt="" />
            </>)
    }
}

export default WeatherIMG