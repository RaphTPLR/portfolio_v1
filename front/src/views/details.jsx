import '../style/details.scss';
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"


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
      <div className="details">
        {item ? (
            <p>{item.name}</p>
          ) : (
            <p></p>
          )}
      </div>
    )
}