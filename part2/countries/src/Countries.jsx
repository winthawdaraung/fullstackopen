import Weather from "./Weather";

const Country = ({c}) => {
    const languages = Object.values(c.languages);
    console.log("languages", languages);
    return (
        <div>
            <h1>{c.name.common}</h1>
            <p>Capital {c.capital}</p>
            <p>Area {c.area}</p>
            <h2>Language</h2>
            <ul>{languages.map(l => <li key={l}>{l}</li>)}</ul>
            <img src={c.flags.png} alt={`${c.name.common}`}></img>
            <Weather country={c} />
        </div>
    )
}

const Countries = ({countries, setShow}) => {
    console.log("Inside Countries", countries)
    if (countries.length > 10){
        return (
            <div>Too Many matches, specify another filter.</div>
        )
    }
    if (countries.length > 1) {
        return (
            <div>
                {countries.map(c => <div key={c.name.common}>{c.name.common} 
                <button onClick={() => setShow(c.name.common)}>show</button>
                </div>)}
            </div>
        )
    }
    if (countries.length === 1) {
        return <Country c={countries[0]} />
    }
    return <div>No matches, please try another search</div>
}

export { Countries };