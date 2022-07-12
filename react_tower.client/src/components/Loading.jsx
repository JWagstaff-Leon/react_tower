import React from 'react';

const Loading = () => {
    return ( 
        <div className="flex-grow-1 d-flex justify-content-center align-items-center bg-dark">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading</span>
            </div>
        </div>
    );
}
 
export default Loading;