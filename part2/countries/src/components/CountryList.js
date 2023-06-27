const CountryList = ({ list, selection }) => {
    return (
        <div>
            <ul>
                {list.map((lst, index) => <li key={index}>{lst} <button onClick={() => selection(lst)}>show</button> </li>)}
            </ul>
        </div>
    )
}

export default CountryList