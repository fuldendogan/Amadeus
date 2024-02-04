import React, {useEffect, useRef, useState} from 'react';
import './SortOptions.css';


const SortOptions = ({data, setData}) => {
    const [showOptions, setShowOptions] = useState(false);
    const sortRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sortRef.current && !sortRef.current.contains(event.target)) {
                setShowOptions(false);
            }
        };

        // Event listener ekleniyor
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup fonksiyonu, component unmount olduğunda event listener'ı kaldırır
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const sortByPrice = () => {
        const sortedData = [...data].sort((a, b) => a.price - b.price);
        setData(sortedData);
        setShowOptions(false);
    };

    const sortByDepartureTime = () => {
        const sortedFlights = [...data].sort((a, b) => {
            const [hoursA, minutesA] = a.departureTime.split(':').map(Number);
            const [hoursB, minutesB] = b.departureTime.split(':').map(Number);
            return hoursA * 60 + minutesA - (hoursB * 60 + minutesB);
        });
        setData(sortedFlights);
        setShowOptions(false);
    };


    const sortByDuration = () => {
        const sortedData = [...data].sort((a, b) => {
            const durationA = parseInt(a.duration.split('h')[0]) * 60 + parseInt(a.duration.split(' ')[1].split('m')[0]);
            const durationB = parseInt(b.duration.split('h')[0]) * 60 + parseInt(b.duration.split(' ')[1].split('m')[0]);
            return durationA - durationB;
        });
        setData(sortedData);
        setShowOptions(false);
    };

    return (
        <div ref={sortRef} className="sort-container mx-5 mt-4">
            <button onClick={() => setShowOptions(prev => !prev)} className="sort-button">
                Sırala ▼
            </button>
            {showOptions && (
                <div className="options-container">
                    <div onClick={sortByPrice} className="option-item">Fiyat</div>
                    <div onClick={sortByDepartureTime} className="option-item">Kalkış Saati</div>
                    <div onClick={sortByDuration} className="option-item">Varış Saati</div>
                </div>
            )}
        </div>
    );
};
export default SortOptions;
