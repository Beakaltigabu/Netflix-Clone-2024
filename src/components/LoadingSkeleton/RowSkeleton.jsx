import React from 'react';
import './RowSkeleton.css';

const RowSkeleton = ({ isLargeRow }) => {
    return (
        <div className="skeleton-row">
            <div className="skeleton-title"></div>
            <div className="skeleton-posters">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className={`skeleton-poster ${isLargeRow ? 'skeleton-poster--large' : ''}`}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default RowSkeleton;
