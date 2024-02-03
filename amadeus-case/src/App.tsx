import React, {useEffect, useState} from 'react';
import FlightSearchResults from "./Components/FlightSearchResults/FlightSearchResults";
import SearchBar from "./Components/SearchBar/SearchBar";
import SortOptions from "./Components/SortOptions/SortOptions";
import {createServer, Response} from "miragejs";
import flightsData from './flightsData.json';
import data from "./airportsData.json";


createServer({
    routes() {
        this.get('/api/airports', (schema, request) => {
            return data;
        });
        this.get("api/flights", (schema, request) => {
            let {date, from, to} = request.queryParams;
            console.log(date, from, to);

            // Parametreleri büyük harfe çevirin.
            from = from.toUpperCase();
            to = to.toUpperCase();
            console.log(date, from, to);

            const filteredFlights = flightsData.filter(flight => {
                return flight.date === date && flight.from === from && flight.to === to;
            });

            if (filteredFlights.length === 0) {
                return new Response(404, {}, {errors: ['Uçuş bulunamadı.']});
            }

            return filteredFlights;
        });

    }
})


const App = () => {
    const [isRoundTrip, setIsRoundTrip] = useState(true);
    const [departureDate, setDepartureDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [flights, setFlights] = useState([]);
    const [returnFlights, setReturnFlights] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchPerformed, setSearchPerformed] = useState(false);
    const [fromInputValue, setFromInputValue] = useState('');
    const [toInputValue, setToInputValue] = useState('');
    const [selectedDepartureFlight, setSelectedDepartureFlight] = useState(null);
    const [selectedReturnFlight, setSelectedReturnFlight] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');



    type Flight = {
        id: number,
        departure: string,
        destination: string,
        date: string,
        departureTime: string,
        arrivalTime: string,
        duration: string,
        price: number,
        airline: string,
        from: string,
        to: string,
    }
    const [flightData, setFlightData] = useState<Flight[]>([]);
    useEffect(() => {
        fetch('/api/flights')
            .then(response => response.json())
            .then(flightData => setFlightData(flightData as Flight[]))
            .catch(error => console.error("API'den veri çekilirken bir hata oluştu:", error));
        ;
    }, []);


    // const handleSearch = async () => {
    //     event?.preventDefault();
    //     setLoading(true);
    //
    //     setSelectedDepartureFlight(null);
    //     setSelectedReturnFlight(null);
    //
    //     const filteredDepartureFlights = flightData.filter(flight => {
    //         return flight.departure.toLowerCase().includes(fromInputValue.toLowerCase()) &&
    //             flight.destination.toLowerCase().includes(toInputValue.toLowerCase()) &&
    //             flight.date === departureDate;
    //     });
    //
    //     let filteredReturnFlights = [];
    //     if (isRoundTrip) {
    //         filteredReturnFlights = flightData.filter(flight => {
    //             return flight.departure.toLowerCase().includes(toInputValue.toLowerCase()) &&
    //                 flight.destination.toLowerCase().includes(fromInputValue.toLowerCase()) &&
    //                 flight.date === returnDate;
    //         });
    //     }
    //
    //     setFlights(filteredDepartureFlights);
    //     setReturnFlights(filteredReturnFlights);
    //
    //     setLoading(false);
    //     setSearchPerformed(true);
    //     console.log(filteredDepartureFlights)
    //     console.log(filteredReturnFlights)
    // };


    const getAirportCode = (name) => {
        const airport = data.find(airport => airport.name === name);
        return airport ? airport.code : null;
    };
    const handleSearch = async () => {
        event?.preventDefault();
        setLoading(true);


        const fromCode = getAirportCode(fromInputValue);
        const toCode = getAirportCode(toInputValue);

        if (!fromCode || !toCode) {
            console.error("Havaalanı kodları bulunamadı.");
            setLoading(false);
            return;
        }

        try {
            const departureResponse = await fetch(`/api/flights?date=${departureDate}&from=${fromCode}&to=${toCode}`);
            if (!departureResponse.ok) throw new Error('Bu tarihlerde gidiş uçuşu bulunamadı.');
            const departureFlights = await departureResponse.json();
            setFlights(departureFlights);

            if (isRoundTrip) {
                const returnResponse = await fetch(`/api/flights?date=${returnDate}&from=${toCode}&to=${fromCode}`);
                if (!returnResponse.ok) throw new Error('Bu tarihlerde dönüş uçuşu bulunamadı.');
                const returnFlightsData = await returnResponse.json();
                setReturnFlights(returnFlightsData);
            }

            setSearchPerformed(true);
        } catch (error) {
            setErrorMessage(error.message);
            console.error("Hata:", error.message);
            setFlights([]);
            setReturnFlights([]);
        } finally {
            setLoading(false);
            setSelectedDepartureFlight(null);
            setSelectedReturnFlight(null);
        }
    };
    const isSearchButtonDisabled = () => {
        return !(departureDate && fromInputValue && toInputValue && (!isRoundTrip || (isRoundTrip && returnDate)));
    };

    const searchBarProps = {
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
    };


    return (
        <div>
            <SearchBar {...searchBarProps} />
            {loading ? (
                <div className="loader-container">
                    <div className="loader"></div>
                </div>
            ) : errorMessage ? (
                <div className="error-message">{errorMessage}</div>
            ) : (
                <>
                    {searchPerformed && flights.length > 0 && (
                        <>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                <h2>Gidiş:</h2>
                                {flights.length > 1 && <SortOptions data={flights} setData={setFlights}/>}
                            </div>
                            <FlightSearchResults
                                flights={selectedDepartureFlight ? [selectedDepartureFlight] : flights}
                                onFlightSelect={setSelectedDepartureFlight}
                                loading={loading}
                                selectedFlight={selectedDepartureFlight}
                            />
                        </>                    )}
                    {searchPerformed && isRoundTrip && returnFlights.length > 0 && (
                        <>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                <h2>Dönüş:</h2>
                                {returnFlights.length > 1 && <SortOptions data={returnFlights} setData={setReturnFlights}/>}
                            </div>
                            <FlightSearchResults
                                flights={selectedReturnFlight ? [selectedReturnFlight] : returnFlights}
                                onFlightSelect={setSelectedReturnFlight}
                                loading={loading}
                                selectedFlight={selectedReturnFlight}
                                isSelectDisabled={!selectedDepartureFlight}
                            />
                        </>                    )}
                </>
            )}
        </div>
    );

};

export default App;
