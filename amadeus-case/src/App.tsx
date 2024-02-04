import React, {useEffect, useState} from 'react';
import FlightSearchResults from "./Components/FlightSearchResults/FlightSearchResults";
import SearchBar from "./Components/SearchBar/SearchBar";
import SortOptions from "./Components/SortOptions/SortOptions";
import {createServer, Response} from "miragejs";
import flightsData from './data/flightsData.json';
import data from "./data/airportsData.json";
// import NavBar from "./Components/NavBar/NavBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./Components/NavBar/NavBar";
import PurchaseButton from "./Components/PurchaseButton/PurchaseButton";
import Footer from "./Components/Footer/Footer";

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
    const [flights, setDepartureFlights] = useState([]);
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
        currency: string,
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
    }, []);


    const getAirportCode = (name) => {
        const airport = data.find(airport => airport.name === name);
        return airport ? airport.code : null;
    };
    const handleSearch = async () => {
        event?.preventDefault();
        setLoading(true);

        const fromCode = getAirportCode(fromInputValue);
        const toCode = getAirportCode(toInputValue);

        if (!isRoundTrip) {
            setSelectedReturnFlight(null); // Tek yönlü aramada dönüş uçuşunu sıfırla
        }

        if (!fromCode || !toCode) {
            console.error("Havaalanı kodları bulunamadı.");
            setLoading(false);
            return;
        }

        try {
            const departureResponse = await fetch(`/api/flights?date=${departureDate}&from=${fromCode}&to=${toCode}`);
            if (!departureResponse.ok) throw new Error('Bu tarihlerde gidiş uçuşu bulunamadı.');
            const departureFlights = await departureResponse.json();
            setDepartureFlights(departureFlights);

            if (isRoundTrip) {
                const returnResponse = await fetch(`/api/flights?date=${returnDate}&from=${toCode}&to=${fromCode}`);
                if (!returnResponse.ok) throw new Error('Bu tarihlerde dönüş uçuşu bulunamadı.');
                const returnFlightsData = await returnResponse.json();
                setReturnFlights(returnFlightsData);
            } else setReturnFlights([]);

            // TODO"

            setSearchPerformed(true);
            setErrorMessage('');
        } catch (error) {
            setErrorMessage(error.message);
            console.error("Hata:", error.message);
            setDepartureFlights([]);
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
            <NavBar/>
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
                                <h2 className="px-5 pt-4">Gidiş:</h2>
                                {flights.length > 1 && <SortOptions data={flights} setData={setDepartureFlights}/>}
                            </div>
                            <FlightSearchResults
                                flights={selectedDepartureFlight ? [selectedDepartureFlight] : flights}
                                onFlightSelect={setSelectedDepartureFlight}
                                loading={loading}
                                selectedFlight={selectedDepartureFlight}
                            />
                        </>)}
                    {searchPerformed && isRoundTrip && returnFlights.length > 0 && (
                        <>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                <h2 className="px-5 pt-4">Dönüş:</h2>
                                {returnFlights.length > 1 &&
                                    <SortOptions data={returnFlights} setData={setReturnFlights}/>}
                            </div>
                            <FlightSearchResults
                                flights={selectedReturnFlight ? [selectedReturnFlight] : returnFlights}
                                onFlightSelect={setSelectedReturnFlight}
                                loading={loading}
                                selectedFlight={selectedReturnFlight}
                                isSelectDisabled={!selectedDepartureFlight}
                            />


                        </>)}
                    {((!isRoundTrip && selectedDepartureFlight) ||
                        (isRoundTrip && selectedDepartureFlight && selectedReturnFlight)) && (
                        <PurchaseButton
                            selectedDepartureFlight={selectedDepartureFlight}
                            selectedReturnFlight={selectedReturnFlight}
                        />
                    )}


                </>
            )}
            <Footer/>
        </div>
    );
};

export default App;
