import '../style/details.scss';
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"

import Batterie from "../assets/batterie.svg";
import BtnB from "../assets/subdirectory-right-regular-24.png";



export default function Details() {
  const [url, setUrl] = useState();
  const [donnees, setDonnees] = useState([]);
  const [item, setItem] = useState();

  useEffect(() => {
    fetch("src/data/data.json")
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

    return (
      <div className="pokedex">
        <div className="step1">
          <Link to="/">
            <div className="back">
              <img src={BtnB} alt="" />
              <p>BACK</p>
            </div>
          </Link>
          <div className="background-details"></div>
            <div className="header">
              <div className="left-i">
                <div className="index">
                  {/* {item.id !== undefined ? 
                  <p>0{item.id}/0{donnees.length} - {item.name}</p>
                  : ""
                } */}
                  <p>01/09 - POKEDEX</p>
                </div>
                <div className="batterie">
                  <img src={Batterie} alt="" />
                </div>
              </div>
              <div className="nav-details">
                <div className="square selected"></div>
                <div className="square"></div>
                <div className="square"></div>
                <div className="square"></div>
                <div className="square"></div>
              </div>
            <div className="date">
              {/* <p>{item.date}</p> */}
              <p>NOVEMBER 2023</p>
            </div>
          </div>
          <div className="content">
            <div className="left">
              {/* <span>{item.name}</span> */}
              <span>POKE</span>
            </div>
            <div className="mid">
              <div className="blur-bg"></div>
              <div className="camera-filter">
                <div className="image"></div>
              </div>
            </div>
            <div className="right">
              <div className="text">
                <p>STEP 1 - HOME</p>
              </div>
              <span>DEX</span>
            </div>
          </div>
          <div className="footer">
            <div className="client">
              <p>Client</p>
              <p>IPSSI PARIS</p>
            </div>
            <div className="type">
              <p>Type</p>
              <p>Vitrine - Collection</p>
            </div>
            <div className="role">
              <p>Role</p>
              <p>Dev Front-end</p>
            </div>
            <div className="with">
              <p>with</p>
              <p>Rémi Korzeniowski</p>
            </div>
          </div>
        </div>
      </div>
    )
}