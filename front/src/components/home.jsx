import React, { useState, useEffect, useRef } from 'react';
import '../style/home.scss';
import { Link } from 'react-router-dom';

import Preloader from './loader';
import BtnL from '../assets/right-arrow-alt-regular-24.png'

export default function Home() {
    const [donnees, setDonnees] = useState([]);
    const [imageAffichee, setImageAffichee] = useState(0);
    const containerRef = useRef(null);


    useEffect(() => {
        fetch('src/data/data.json')
        .then(response => response.json())
        .then(data => setDonnees(data))
        .catch(error => console.error('Erreur de chargement des données :', error));
    }, []);

    const handleDivClick = (index) => {
        setImageAffichee(index);

        if (containerRef.current) {
            const selectedDiv = containerRef.current.querySelector(`.image-div-${index}`);
            if (selectedDiv) {
              selectedDiv.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'center',
              });
            }
          }
    };

    return (
        <div className="home">
            <Preloader />
            <div className="header fontspe">
                <p>RR</p>
            </div>
            <div className="content">
                <div className="navbar">
                    {donnees.length > 0 && (
                        <React.Fragment>
                            {donnees.map((item, index) => (
                                <div
                                    className={`navbar-content ${
                                        imageAffichee === index ? 'selected' : ''
                                    }`}
                                    key={item.id}
                                    >
                                    <div className="indice" onClick={() => handleDivClick(index)}></div>
                                    <div className="name">
                                        {imageAffichee === index ? <p>{item.name}</p> : ""}
                                    </div>
                                </div>
                            ))}
                        </React.Fragment>
                    )}
                </div>
                <div className="container" ref={containerRef}>
                    {donnees.length > 0 && (
                    <React.Fragment>
                        {donnees.map((item, index) => (
                        <div
                            key={item.id}
                            onClick={() => handleDivClick(index)}
                            className={`image-div image-div-${index} ${
                            imageAffichee === index ? 'selected' : 'unselected'
                            }`}
                            style={{
                            backgroundImage: `url(${item.images[0]})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            filter: imageAffichee !== index ? 'grayscale(100%)' : 'none',
                            }}
                        >
                            <Link to={item.path}>
                                <div className="btn">
                                    {/* <img src={BtnL} alt="" /> */}
                                    <p>DETAILS <img src={BtnL} alt="" /></p>
                                </div>
                            </Link>
                        </div>
                        ))}
                    </React.Fragment>
                    )}
                </div>
                <div className="name-project">
                    {imageAffichee !== null && donnees[imageAffichee] !== undefined && (
                            <h2>{donnees[imageAffichee].name}</h2>
                        )}
                </div>
            </div>
            <div className="footer fontspe">
                {imageAffichee !== null && donnees[imageAffichee] !== undefined && (
                    <h2>{donnees[imageAffichee].id}/{donnees.length}</h2>
                )}
                <p>V1</p>
            </div>
        </div>
    );
}
