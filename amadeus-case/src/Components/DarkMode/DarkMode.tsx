import React, { useState, useEffect } from "react";
import "./DarkMode.css";
import { FiSun, FiMoon } from "react-icons/fi";

const DarkMode = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode === 'true' || false; // 'true' string'ini boolean true'ya dönüştür
    });

    useEffect(() => {
        document.body.setAttribute("data-theme", isDarkMode ? "dark" : "light");
        localStorage.setItem('darkMode', isDarkMode);
    }, [isDarkMode]);

    const handleToggle = () => {
        setIsDarkMode(!isDarkMode);
    };

    return (
        <div className='dark_mode'>
            <input
                className='dark_mode_input'
                type='checkbox'
                id='darkmode-toggle'
                checked={isDarkMode}
                onChange={handleToggle}
            />
            <label className='dark_mode_label' htmlFor='darkmode-toggle'>
                {isDarkMode ? <FiMoon className="icon" /> : <FiSun className="icon" />}
            </label>
        </div>
    );
};

export default DarkMode;
