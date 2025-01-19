import React from 'react';
import './BackgroundImageStarbuck.css';

const BackgroundImageStarbuck = ({ children }) => {
    return (
        <div className="background-image-starbuck">
            <div className="half-zbackground">
                <div className="background-image"></div>
                <div className="background-overlay"></div>
            </div>
            <div className="content-container">
                {children}
            </div>
        </div>
    );
};

export default BackgroundImageStarbuck;