import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/AppContext";
import { NavData } from "../utils/links";
import SignOut from "./SignOut";

const Navigation = () => {
  const [size, setSize] = useState(window.innerWidth);
  const { FontAwesomeIcon } = useGlobalContext();
  const [currentSection, setCurrentSection] = useState("Budgets");
  const [showContainer, setShowContainer] = useState(false);
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);

  const checkSize = () => {
    setSize(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", checkSize);
    return () => {
      window.removeEventListener("resize", checkSize);
    };
  }, []);

  useEffect(() => {
    const linksHeight = linksRef.current.getBoundingClientRect().height;
    if (showContainer) {
      linksContainerRef.current.style.height = `${linksHeight}px`;
    } else {
      linksContainerRef.current.style.height = "0px";
    }
  }, [showContainer]);

  return (
    <nav>
      <div className="nav-center">
        <div className="nav-header">
          <h1 className="logo">{currentSection}</h1>
          <button
            className="nav-toggle"
            onClick={() => setShowContainer(!showContainer)}
          >
            <FontAwesomeIcon icon="fas fa-bars" />
          </button>
        </div>
        <div className="links-container" ref={linksContainerRef}>
          <ul className="links" ref={linksRef}>
            {NavData.map((link) => {
              const { id, path, name } = link;
              return (
                <li key={id}>
                  <Link to={path} onClick={() => setCurrentSection(name)}>
                    {name}
                  </Link>
                </li>
              );
            })}
            {size < 800 && <SignOut />}
          </ul>
        </div>
        <div className="signout-btn">
          <SignOut />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
