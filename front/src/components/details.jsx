import '../style/details.scss';
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"

import BtnL from "../assets/right-arrow-alt-regular-24.png";

function choisir_fichier_json(url) {
  if (url.startsWith("http://raphael-romero.com") || url.startsWith("https://raphael-romero.com")) {
      return "assets/data.json";
  } else {
      return "src/data/data.json";
  }
}


export default function Details() {
  const [url, setUrl] = useState();
  const [donnees, setDonnees] = useState([]);
  const [item, setItem] = useState();

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

  useEffect(() => {
    const cheminURL = window.location.pathname;
    const partieApresDomaine = cheminURL.replace(/^\/+|\/+$/g, "");
    setUrl("/" + partieApresDomaine);
  }, []);

  useEffect(() => {
    if (donnees.length > 0) {
      for (let i = 0; i < donnees.length; i++) {
        if (url === donnees[i].path) {
          setItem(donnees[i]);
          break;
        }
      }
    }
  }, [url, donnees, item]);

  function handleReload() {
    setTimeout(() => {
      window.location.reload()
    }, 10);
  }

  return (
    <div className="details">
      <div className="presentation">
        {item ? (
          <div>
            <img src={item.images[0]} alt="" />
            <div className="header fontspe">
              <Link to="/">
                <p>RR</p>
              </Link>
            </div>
            <div className="content">
              {item ?
               <div className='name'>
                <h1>{item.name}</h1>
               </div> 
               : 
               ""
              }
              {item ?
                <div className="text">
                  <div className="each">
                    <p>TYPE</p>
                    <span>{item.type}</span>
                  </div>
                  <div className="each">
                    <p>ROLE</p>
                    <span>{item.role}</span>
                  </div>
                  <div className="each">
                    <p>TECHNO</p>
                    <span>{item.techno}</span>
                  </div>
                  <div className="each">
                    <p>CLIENT</p>
                    <span>{item.client}</span>
                  </div>
                  <div className="each">
                    <p>COLLABORATOR</p>
                    <span>{item.collab}</span>
                  </div>
                  <div className="each">
                    <p>DATE</p>
                    <span>{item.date}</span>
                  </div>
                  <div className="each">
                    <p>TIME DEVELOPMENT</p>
                    <span>{item.timedev}</span>
                  </div>
                </div>
                :
                ""
              }
              <div className="scroll-down">
                <p>SCROLL DOWN</p>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="bloc-container">
        {item &&
          item.images.slice(1).map((image, index) => (
            <div key={index} className="bloc">
              <div className="image">
                <img src={image} alt={`Image ${index + 1}`} />
              </div>
              <div className="text">
                <h1>{item.titres[index]}</h1>
                <p>{item.description[index]}</p>
              </div>
            </div>
          ))}
      </div>
        {item &&
          item.id === donnees.length ?
          <div className="prev-page">
            {item ? <img src={donnees[item.id - 2].images[0]} alt="" /> : ""}
            {/* {item ? <Link to={donnees[item.id - 2].path} onClick={() => handleReload()}> */}
            {item ? <Link to={donnees[item.id - 2].path}>
              <h2>PREVIOUS PROJECT</h2>
              <p><img src={BtnL} alt="" style={{transform: "rotate(180deg)"}}/>{item ? donnees[item.id - 2].name : ""}</p>
            </Link> : ""}
          </div>
          :
          <div className="next-page">
            {item ? <img src={donnees[item.id].images[0]} alt="" /> : ""}
            {/* {item ? <Link to={donnees[item.id].path} onClick={() => handleReload()}> */}
            {item ? <Link to={donnees[item.id].path}>
              <h2>NEXT PROJECT</h2>
              <p>{item ? donnees[item.id].name : ""} <img src={BtnL} alt="" /></p>
            </Link> : ""}
          </div>
        }
      </div>
  );
}
