import React from 'react';
import './FlightSearchResults.css';


const Flight = ({flight, onSelect, isSelected, isSelectDisabled}) => {
    return (
        <div className="flight-card">

            <div className="flight-date">{flight.date}</div>
            <div className="flight-time">{flight.departureTime} - {flight.arrivalTime}</div>
            <div className="flight-from-to">{flight.departure} - {flight.destination}</div>
            <div className="flight-time">{flight.duration}</div>
            <div className="flight-airline">{flight.airline}</div>
            <div className="flight-price">{flight.price} TL</div>
            <button
                onClick={() => onSelect(flight)}
                disabled={isSelected || isSelectDisabled}
            >
                {isSelected ? 'Seçildi' : 'Seç'}
            </button>
        </div>
    );
};

const FlightSearchResults = ({loading, flights, onFlightSelect, selectedFlight, isSelectDisabled}) => {
    if (loading) {
        return <div>Yükleniyor...</div>;
    }

    if (!flights.length) {
        return (
            <div className="flight-results-container">
                Uçuş bulunamadı.
            </div>
        );
    }

    return (
        <div className="flight-results-container">
            {
                flights.map((flight) => (
                    <Flight
                        key={flight.id}
                        flight={flight}
                        onSelect={() => onFlightSelect(flight)}
                        isSelected={selectedFlight?.id === flight.id}
                        isSelectDisabled={isSelectDisabled}
                    />
                ))
            }
        </div>
    );
};

export default FlightSearchResults;
