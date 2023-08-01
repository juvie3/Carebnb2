// frontend/src/components/Navigation/index.js
import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import logo from './apple-touch-icon.png';
import magGlass from './search2.png';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <header>
      <nav>
        <NavLink exact to="/">
          <img className="logo" src={logo} />
        </NavLink>
        <h1 id="carebnb" >carebnb</h1>
        <div className="topNav">
          <h4 className="navi" >Anywhere</h4>
          <h2 className="navi line">|</h2>
          <h4 className="navi">Any week</h4>
          <h2 className="navi line">|</h2>
          <h4 className="navi line">Add guests</h4>
          <img className="search" src={magGlass} />
        </div>
      </nav>


      {isLoaded && (
        <div className="button-login">
          {sessionUser ?
              <h4 className="login create">
                <NavLink id="create-link" exact to="/spots/new">Create a New Spot</NavLink>
              </h4> :
              <h4 className="login your-home">Carebnb your home</h4>
          }



          <div className='login login-button'>
            <ProfileButton  user={sessionUser} />
          </div>

        </div>
      )}
    </header>
  );
}

export default Navigation;
