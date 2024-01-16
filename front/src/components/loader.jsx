import React, { useEffect, useState } from 'react';
import '../style/loader.scss';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const interval = setInterval(() => {
      if (progress < 100) {
        setProgress((prevProgress) => prevProgress + 1);
      } else {
        setLoading(false);
        setStatus("loaded");
        clearInterval(interval);

        setTimeout(() => {
          setStatus("end");
        }, 1000);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [progress]);

  const preloaderClass = `preloader ${status === 'loading' ? 'loading' : status === 'loaded' ? 'loaded' : 'end'}`;

  return (
    <div className={preloaderClass}>
      <div className="progress-bar">
        <p className='fontspe'>{progress}</p>
      </div>
    </div>
  );
};
