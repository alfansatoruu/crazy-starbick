import React from 'react';
import './loading_screen.css';

const Loading = () => {
    return (
        <div className="container">
            <div className="loader">
                <div className="cup">
                    <div className="cup-lid"></div>
                    <div className="cup-body">
                        <div className="coffee">
                            <div className="latte-art"></div>
                        </div>
                    </div>
                    <div className="cup-sleeve">
                        <div className="starbucks-logo"></div>
                    </div>
                </div>
                <div className="shadow"></div>
            </div>
        </div>
    );
};

export default Loading;
