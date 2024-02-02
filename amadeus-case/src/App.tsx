import React, { useState } from 'react';
import FlightSearchResults from "./Components/FlightSearchResults/FlightSearchResults";
import SearchBar from "./Components/SearchBar/SearchBar";
import SortOptions from "./Components/SortOptions/SortOptions";


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




    const mockFlights = [
        {
            id: 1,
            departure: 'Izmir Adnan Menderes',
            destination: 'Istanbul Ataturk',
            date: '2024-02-08',
            departureTime: '08:00',
            arrivalTime: '09:30',
            duration: '1h 30m',
            price: 299.99,
            airline: 'Türk Hava Yolları',
            from: 'ADB',
            to: 'IST',
        },
        {
            id: 2,
            departure: 'Izmir Adnan Menderes',
            destination: 'Istanbul Ataturk',
            date: '2024-02-08',
            departureTime: '09:00',
            arrivalTime: '10:30',
            duration: '1h 30m',
            price: 399.99,
            airline: 'Türk Hava Yolları',
            from: 'ADB',
            to: 'IST',
        },
        {
            id: 3,
            departure: 'Izmir Adnan Menderes',
            destination: 'Istanbul Ataturk',
            date: '2024-02-08',
            departureTime: '12:00',
            arrivalTime: '13:30',
            duration: '2h 0m',
            price: 299.99,
            airline: 'Türk Hava Yolları',
            from: 'ADB',
            to: 'IST',
        },
        {
            id: 4,
            departure: 'Istanbul Ataturk',
            destination: 'Izmir Adnan Menderes',
            date: '2024-02-09',
            departureTime: '12:00',
            arrivalTime: '13:30',
            duration: '2h 0m',
            price: 299.99,
            airline: 'Türk Hava Yolları',
            from: 'ADB',
            to: 'IST',
        },
        {
            id: 5,
            departure: 'Istanbul Ataturk',
            destination: 'Izmir Adnan Menderes',
            date: '2024-02-09',
            departureTime: '11:00',
            arrivalTime: '13:30',
            duration: '2h 0m',
            price: 299.99,
            airline: 'Türk Hava Yolları',
            from: 'ADB',
            to: 'IST',
        },];


    // const handleSearch = async () => {
    //     event.preventDefault(); // Formun varsayılan submit davranışını engelle
    //     setLoading(true);
    //     setSearchPerformed(true);
    //
    //
    //
    //     // Gidiş uçuşlarını filtrele
    //     const filteredDepartureFlights = mockFlights.filter(flight => {
    //         return flight.departure.toLowerCase().includes(fromInputValue.toLowerCase()) &&
    //             flight.destination.toLowerCase().includes(toInputValue.toLowerCase()) &&
    //             flight.date === departureDate;
    //     });
    //
    //     let filteredReturnFlights = [];
    //     if (isRoundTrip) {
    //         // Dönüş uçuşlarını filtrele
    //         filteredReturnFlights = mockFlights.filter(flight => {
    //             return flight.departure.toLowerCase().includes(toInputValue.toLowerCase()) &&
    //                 flight.destination.toLowerCase().includes(fromInputValue.toLowerCase()) &&
    //                 flight.date === returnDate;
    //         });
    //     }
    //
    //     // Filtrelenen uçuşları state'e ata
    //     setFlights(filteredDepartureFlights);
    //     setReturnFlights(filteredReturnFlights);
    //
    //     setLoading(false);
    // };




    const handleSearch = async () => {
        event?.preventDefault(); // Formun varsayılan submit davranışını engelle
        setLoading(true);

        setSelectedDepartureFlight(null);
        setSelectedReturnFlight(null);

        const filteredDepartureFlights = mockFlights.filter(flight => {
            return flight.departure.toLowerCase().includes(fromInputValue.toLowerCase()) &&
                flight.destination.toLowerCase().includes(toInputValue.toLowerCase()) &&
                flight.date === departureDate;
        });

        let filteredReturnFlights = [];
        if (isRoundTrip) {
            filteredReturnFlights = mockFlights.filter(flight => {
                return flight.departure.toLowerCase().includes(toInputValue.toLowerCase()) &&
                    flight.destination.toLowerCase().includes(fromInputValue.toLowerCase()) &&
                    flight.date === returnDate;
            });
        }

        setFlights(filteredDepartureFlights);
        setReturnFlights(filteredReturnFlights);

        setLoading(false);
        setSearchPerformed(true);
        console.log(filteredDepartureFlights)
        console.log(filteredReturnFlights)
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
            {searchPerformed && flights.length > 0 && (
                <>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h2>Gidiş:</h2>
                        {flights.length > 1 && <SortOptions data={flights} setData={setFlights} />}
                    </div>
                    <FlightSearchResults
                        flights={selectedDepartureFlight ? [selectedDepartureFlight] : flights}
                        onFlightSelect={setSelectedDepartureFlight}
                        loading={loading}
                        selectedFlight={selectedDepartureFlight}

                    />
                </>
            )}
            {searchPerformed && isRoundTrip && returnFlights.length > 0 && (
                <>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h2>Dönüş:</h2>
                        {returnFlights.length > 1 && <SortOptions data={returnFlights} setData={setReturnFlights} />}
                    </div>
                    <FlightSearchResults
                        flights={selectedReturnFlight ? [selectedReturnFlight] : returnFlights}
                        onFlightSelect={setSelectedReturnFlight}
                        loading={loading}
                        selectedFlight={selectedReturnFlight}

                    />
                </>
            )}
        </div>
    );
};

export default App;
