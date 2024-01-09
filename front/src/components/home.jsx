import React, { useState, useEffect } from 'react';

import '../style/home.scss';

export default function Home() {
    const [donnees, setDonnees] = useState([]);
    const [imageAffichee, setImageAffichee] = useState(0);

    useEffect(() => {
        fetch('src/data/data.json')
            .then(response => response.json())
            .then(data => setDonnees(data))
            .catch(error => console.error('Erreur de chargement des données :', error));
    }, []);

    const handleDivHover = (index) => {
        setImageAffichee(index);
    };

    return (
        <div className="home">
            <div className="header fontspe">
                <p>RR</p>
            </div>
            <div className="content">
                <div className="navbar"></div>
                <div className="container">
                    {donnees.length > 0 && (
                        <React.Fragment>
                            {Array.from({ length: donnees.length }, (_, index) => (
                                <div
                                    key={donnees[index].id}
                                    onMouseOver={() => handleDivHover(index)}
                                    className={`image-div ${imageAffichee === index ? 'selected' : 'unselected'}`}
                                >
                                    {imageAffichee === index && (
                                        <img src={donnees[index].images[0]} alt={`Image ${donnees[index].id}`} />
                                    )}
                                </div>
                            ))}
                        </React.Fragment>
                    )}
                </div>
                <div className="name-project">
                    {imageAffichee !== null && donnees[imageAffichee] !== undefined && (
                        <h2>{donnees[imageAffichee].nom}</h2>
                    )}
                </div>
            </div>
            <div className="footer fontspe">
                <p>V1</p>
            </div>
        </div>
    );
}
