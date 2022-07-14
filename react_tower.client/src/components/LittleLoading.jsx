import React from 'react';

const LittleLoading = () => {
    return (
        <div className="little-loading">
            <div className="spinner-border little-loading text-primary" role="status">
                <span className="visually-hidden">Loading</span>
            </div>
        </div>
    );
}
 
export default LittleLoading;