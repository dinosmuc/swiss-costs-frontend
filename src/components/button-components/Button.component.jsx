import React from 'react';
import './button.style.scss';

const Button = ({ children, onClick }) => {
    return (
        <button className="my-button" onClick={onClick}>
            {children}
            <span className="dropdown-arrow"></span> 
        </button>
    );
};

export default Button;
