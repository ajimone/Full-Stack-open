const Weather = ({ info }) => {
    return (
        <div>
            <h2>{info.wetitle}</h2>
            <p>
                {info.temp}
            </p>

            <img src={info.png} alt="" />

            <p>
                {info.wind}
            </p>

        </div>
    )
}

export default Weather