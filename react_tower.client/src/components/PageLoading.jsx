import React from 'react';

const PageLoading = () => {
    return (
        <div className="flex-grow-1 d-flex justify-content-center align-items-center">
            <div className="spinner-border page-loading text-primary" role="status">
                <span className="visually-hidden">Loading</span>
            </div>
        </div>
    );
}

export default PageLoading;