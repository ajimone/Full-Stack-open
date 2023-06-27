const Display = ({ content, lang }) => {
    return (
        <div>
            <h2>{content.name}</h2>

            <p>
                <li>{content.capital}</li>
                <li>{content.area}</li>
            </p>

            <h3>{content.ltitle}</h3>
            <ul>
                {lang.map((lng, index) => <li key={index}>{lng}</li>)}
            </ul>
            <img src={content.flag} alt="" />

        </div>

    )
}

export default Display