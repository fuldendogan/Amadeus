import React, {useEffect, useState} from 'react';



const SearchBar = ({
                       isRoundTrip,
                       setIsRoundTrip,
                       departureDate,
                       setDepartureDate,
                       returnDate,
                       setReturnDate,
                       fromInputValue,
                       setFromInputValue,
                       toInputValue,
                       setToInputValue,
                       handleSearch,
                       isSearchButtonDisabled
                   }) => {

    type Airport = {
        code: string;
        name: string;
    }
    const [airports, setAirports] = useState<Airport[]>([]);
    useEffect(() => {
        fetch('/api/airports')
            .then(response => response.json())
            .then(airports => setAirports(airports));
    }, []);


    const gridTemplateColumns = isRoundTrip ? '2fr 2fr 1fr 1fr 1fr' : '2fr 2fr 1fr 1fr';
    const handleDepartureChange = (event) => {
        setDepartureDate(event.target.value);
    };

    const handleFromInputChange = (event) => {
        const value = event.target.value;
        setFromInputValue(value);
        if (value.length > 1) {
            const matchedSuggestions = airports.filter(airport =>
                airport.name.toLowerCase().includes(value.toLowerCase())
            );
            setFromSuggestions(matchedSuggestions);
        } else {
            setFromSuggestions([]);
        }
    };

    const handleToInputChange = (event) => {
        const value = event.target.value;
        setToInputValue(value);
        if (value.length > 1) {
            const matchedSuggestions = airports.filter(airport =>
                airport.name.toLowerCase().includes(value.toLowerCase())
            );
            setToSuggestions(matchedSuggestions);
        } else {
            setToSuggestions([]);
        }
    };

    const handleReturnChange = (event) => {
        setReturnDate(event.target.value);
    };
    const [fromSuggestions, setFromSuggestions] = useState([]);
    const [toSuggestions, setToSuggestions] = useState([]);



    return (
        <div className="search-bar">
            <div className="trip-type">
                <label htmlFor="round-trip">Gidiş-Dönüş</label>
                <input
                    type="radio"
                    id="round-trip"
                    name="trip-type"
                    checked={isRoundTrip}
                    onChange={() => setIsRoundTrip(true)}
                />

                <label htmlFor="one-way">Tek Yön</label>
                <input
                    type="radio"
                    id="one-way"
                    name="trip-type"
                    checked={!isRoundTrip}
                    onChange={() => setIsRoundTrip(false)}
                />
            </div>
            <form style={{gridTemplateColumns: gridTemplateColumns}}>
                <div className="input-group from">
                    <label htmlFor="from">Nereden:</label>
                    <input autoComplete="off" type="text" value={fromInputValue} onChange={handleFromInputChange}
                           id="from" name="from" placeholder="Kalkış Yeri"/>
                    {fromSuggestions.length > 0 && (
                        <ul className="suggestions-container">
                            {fromSuggestions.map((suggestion, index) => (
                                <li key={index} onClick={() => {
                                    setFromInputValue(suggestion.name);
                                    setFromSuggestions([]);
                                }}>
                                    {suggestion.name} ({suggestion.code})
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="input-group to">
                    <label htmlFor="to">Nereye:</label>
                    <input autoComplete="off" type="text" value={toInputValue} onChange={handleToInputChange} id="to"
                           name="to" placeholder="Varış Yeri"/>
                    {toSuggestions.length > 0 && (
                        <ul className="suggestions-container">
                            {toSuggestions.map((suggestion, index) => (
                                <li key={index} onClick={() => {
                                    setToInputValue(suggestion.name);
                                    setToSuggestions([]);
                                }}>
                                    {suggestion.name} ({suggestion.code})
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="input-group">
                    <label htmlFor="departure-date">Gidiş:</label>
                    <input
                        type="date"
                        id="departure-date"
                        name="departure-date"
                        value={departureDate}
                        onChange={handleDepartureChange}
                    />
                </div>

                {isRoundTrip && (
                    <div className="input-group">
                        <label htmlFor="return-date">Dönüş:</label>
                        <input type="date"
                               id="return-date"
                               name="return-date"
                               value={returnDate}
                               onChange={handleReturnChange}
                               min={departureDate}
                               disabled={!departureDate}/>
                    </div>
                )}

                <div className="button-search input-group">
                    <label htmlFor="departure-date" className=""></label>
                    <br></br>
                    <button className="btn btn-secondary" onClick={handleSearch} disabled={isSearchButtonDisabled()}>ARA</button>


                </div>

            </form>
        </div>

    );
};

export default SearchBar;
