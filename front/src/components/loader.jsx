import React, { useEffect, useState } from 'react';
import '../style/loader.scss';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (progress < 100) {
        setProgress((prevProgress) => prevProgress + 1);
      } else {
        setLoading(false);
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [progress]);

  return (
    <div className={`preloader ${loading ? 'loading' : 'loaded'}`}>
      <div className="progress-bar">
        <p className='fontspe'>{progress}</p>
      </div>
    </div>
  );
};