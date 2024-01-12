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

  // let first, last;

  // if (item.name.indexOf(" ") !== -1) {
  //   const parts = item.name.split(" ");
  //   first = parts[0].slice(0, 5);
  //   last = parts[1] ? parts[1].slice(0, 5) : '';
  // } else {
  //   const middle = Math.ceil(item.name.length / 2);
  //   first = item.name.slice(0, middle).slice(0, 5);
  //   last = item.name.slice(middle).slice(0, 5);
  // }

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
            </div>
          </div>
          <div className="content">
            <div className="left">
              {/* <span>{first}</span> */}
            </div>
            <div className="mid">
              <div className="blur-bg"></div>
              <div className="camera-filter">
                <div className="image"
                // style={{
                //   backgroundImage: `url(${item.images[0]})`,
                // }}
                ></div>
              </div>
            </div>
            <div className="right">
              <div className="text">
                <p>STEP 1 - HOME</p>
              </div>
              {/* <span>{last}</span> */}
            </div>
          </div>
          <div className="footer">
            <div className="client">
              <p>Client</p>
              {/* <p>{item.client}</p> */}
            </div>
            <div className="type">
              <p>Type</p>
              {/* <p>{item.type}</p> */}
            </div>
            <div className="role">
              <p>Role</p>
              {/* <p>{item.role}</p> */}
            </div>
            <div className="with">
              <p>with</p>
              {/* <p>{item.collab}</p> */}
            </div>
          </div>
        </div>
      </div>
    )
}