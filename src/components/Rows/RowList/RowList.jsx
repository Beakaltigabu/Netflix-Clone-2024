import React, { useState, useEffect } from 'react';
import Row from '../Row/Row';
import requests from '../../../utils/requests';
import './rowList.css';

const RowList = () => {
  const [categories] = useState([
    { title: "NETFLIX ORIGINALS", fetchUrl: requests.fetchNetflixOriginals, isLargeRow: true },
    { title: "Trending Now", fetchUrl: requests.fetchTrending },
    { title: "Top Rated", fetchUrl: requests.fetchTopRated },
    { title: "Action Movies", fetchUrl: requests.fetchActionMovies },
    { title: "Comedy Movies", fetchUrl: requests.fetchComedyMovies },
    { title: "Horror Movies", fetchUrl: requests.fetchHorrorMovies },
    { title: "Romance Movies", fetchUrl: requests.fetchRomanceMovies },
    { title: "TV Shows", fetchUrl: requests.fetchTvShow },
    { title: "Documentaries", fetchUrl: requests.fetchDocumentaries }
  ]);

  const [visibleRows, setVisibleRows] = useState([]);

  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisibleRows(prev => [...prev, entry.target.dataset.rowIndex]);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1
    });

    document.querySelectorAll('.row-wrapper').forEach(row => {
      observer.observe(row);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="rowList">
      {categories.map((category, index) => (
        <div
          key={category.title}
          className={`row-wrapper ${visibleRows.includes(index.toString()) ? 'visible' : ''}`}
          data-row-index={index}
        >
          <Row
            title={category.title}
            fetchUrl={category.fetchUrl}
            isLargeRow={category.isLargeRow}
          />
        </div>
      ))}
    </div>
  );
};

export default RowList;
