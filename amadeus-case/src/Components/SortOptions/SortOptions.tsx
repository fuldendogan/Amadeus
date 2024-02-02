import React from 'react';

const SortOptions = ({ data, setData }) => {
    const sortByPrice = () => {
        const sortedData = [...data].sort((a, b) => a.price - b.price);
        setData(sortedData);
    };

    const sortByDepartureTime = () => {
        const sortedFlights = [...data].sort((a, b) => {
            const [hoursA, minutesA] = a.departureTime.split(':').map(Number);
            const [hoursB, minutesB] = b.departureTime.split(':').map(Number);
            return hoursA * 60 + minutesA - (hoursB * 60 + minutesB);
        });
        setData(sortedFlights);
    };


    const sortByDuration = () => {
        const sortedData = [...data].sort((a, b) => {
            const durationA = parseInt(a.duration.split('h')[0]) * 60 + parseInt(a.duration.split(' ')[1].split('m')[0]);
            const durationB = parseInt(b.duration.split('h')[0]) * 60 + parseInt(b.duration.split(' ')[1].split('m')[0]);
            return durationA - durationB;
        });
        setData(sortedData);
    };

    return (
        <div>
            <button onClick={sortByPrice}>Fiyata Göre Sırala</button>
            <button onClick={sortByDepartureTime}>Kalkış Saatine Göre Sırala</button>
            <button onClick={sortByDuration}>Uçuş Süresine Göre Sırala</button>
        </div>
    );
};
export default SortOptions;
