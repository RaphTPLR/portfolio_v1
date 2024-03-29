import React, { useState, useEffect, useRef } from "react";
import "../style/home.scss";
import { Link } from "react-router-dom";

import BtnL from "../assets/right-arrow-alt-regular-24.png";
import Cursor from "../components/cursor";

function choisir_fichier_json(url) {
  if (
    url.startsWith("http://raphael-romero.com") ||
    url.startsWith("https://raphael-romero.com")
  ) {
    return "assets/data.json";
  } else {
    return "src/data/data.json";
  }
}

export default function Home({ darkMode, toggleDarkMode }) {
  const [donnees, setDonnees] = useState([]);
  const [imageAffichee, setImageAffichee] = useState();
  const [textAnimation, setTextAnimation] = useState(null);
  const [lightMode, setLightMode] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    const url = window.location.href;
    const fichierJson = choisir_fichier_json(url);

    fetch(fichierJson)
      .then((response) => response.json())
      .then((data) => setDonnees(data))
      .catch((error) =>
        console.error("Erreur de chargement des données :", error)
      );
  }, []);

  const handleDivClick = (index) => {
    setImageAffichee(index);
    setTextAnimation("exit");

    if (containerRef.current) {
      const selectedDiv = containerRef.current.querySelector(
        `.image-div-${index}`
      );
      if (selectedDiv) {
        selectedDiv.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
      }
    }
  };

  const handleAnimationEnd = () => {
    setTextAnimation("enter");
  };

  const handleDarkModeClick = () => {
    setLightMode(!lightMode);
    toggleDarkMode(!darkMode);
  };

  return (
    <div className={`home ${lightMode ? "darkmode" : "lightmode"}`}>
      {/* <div className="darkmode-btn" onClick={() => handleDarkModeClick()}></div> */}
      <Cursor darkMode={darkMode} />
      <div className="header fontspe">
        <Link to="/">
          <p>RR</p>
        </Link>
      </div>
      <div className="content">
        <div className="navbar">
          {donnees.length > 0 && (
            <React.Fragment>
              {donnees.map((item, index) => (
                <div
                  className={`navbar-content ${
                    imageAffichee === index ? "selected" : ""
                  }`}
                  key={item.id}
                >
                  <div
                    className="indice"
                    onClick={() => handleDivClick(index)}
                  ></div>
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
                    imageAffichee === index ? "selected" : "unselected"
                  }`}
                  style={{
                    backgroundImage: `url(${item.images[0]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter:
                      imageAffichee !== index ? "grayscale(100%)" : "none",
                  }}
                >
                  <div className="name">
                    {imageAffichee !== null &&
                      donnees[imageAffichee] !== undefined && (
                        <h2
                          onAnimationEnd={handleAnimationEnd}
                          className={textAnimation}
                        >
                          {donnees[imageAffichee].name}
                        </h2>
                      )}
                  </div>
                  <Link to={item.path}>
                    <div className="btn">
                      <p>
                        DETAILS <img src={BtnL} alt="" />
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </React.Fragment>
          )}
        </div>
        <div className="name-project">
          {imageAffichee !== null && donnees[imageAffichee] !== undefined && (
            <h2 onAnimationEnd={handleAnimationEnd} className={textAnimation}>
              {donnees[imageAffichee].name}
            </h2>
          )}
        </div>
      </div>
      <div className="footer fontspe">
        {imageAffichee !== null && donnees[imageAffichee] !== undefined && (
          <h2>
            {donnees[imageAffichee].id}/{donnees.length}
          </h2>
        )}
        <p>V1</p>
      </div>
    </div>
  );
}
