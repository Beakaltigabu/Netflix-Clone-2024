import React from 'react';
import './BannerSkeleton.css';

const BannerSkeleton = () => {
    return (
        <div className="banner-skeleton">
            <div className="banner-skeleton__background">
                <div className="banner-skeleton__content">
                    <div className="banner-skeleton__rating">
                        <div className="skeleton-pill"></div>
                        <div className="skeleton-pill"></div>
                        <div className="skeleton-pill"></div>
                    </div>
                    <div className="banner-skeleton__title"></div>
                    <div className="banner-skeleton__description">
                        <div className="skeleton-line"></div>
                        <div className="skeleton-line"></div>
                    </div>
                    <div className="banner-skeleton__buttons">
                        <div className="skeleton-button"></div>
                        <div className="skeleton-button"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BannerSkeleton;
