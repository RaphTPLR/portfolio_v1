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
                                    <div className="indice"></div>
                                    <div className="name">
                                        {imageAffichee === index ? <p>{item.name}</p> : ""}
                                    </div>
                                </div>
                            ))}
                        </React.Fragment>
                    )}
                </div>
                <div className="container">
                {donnees.length > 0 && (
                    <React.Fragment>
                    {donnees.map((item, index) => (
                        <div
                        key={item.id}
                        onMouseOver={() => handleDivHover(index)}
                        className={`image-div ${
                            imageAffichee === index ? 'selected' : 'unselected'
                        }`}
                        style={
                            imageAffichee !== index
                            ? {
                                backgroundImage: `url(${item.images[0]})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                filter: 'grayscale(70%)',
                                }
                            : null
                        }
                        >
                        {imageAffichee === index && (
                            <img
                            src={item.images[0]}
                            alt={`Image ${item.id}`}
                            />
                        )}
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
