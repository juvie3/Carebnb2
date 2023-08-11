// frontend/src/components/Navigation/index.js
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import logo from './apple-touch-icon.png';
import magGlass from './search2.png';
import { useHistory } from "react-router-dom";

function Navigation({ isLoaded }) {
  const [cityVal, setCityVal] = useState('')
  const [stateVal, setStateVal] = useState('')
  const [countryVal, setCountryVal] = useState('')
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory()

  const reset = () => {
    setCityVal('')
    setStateVal('')
    setCountryVal('')
  }

  const resetEnter = () => {
    if (!cityVal && !stateVal && !countryVal) {
      history.push('/')
    } else {
      history.push(`/spots/filtered/${query}`)
      reset()
    }
  }

  let query = '';

  if (cityVal) query = `city=${cityVal}`

  if (cityVal && stateVal) query = `${query}&&state=${stateVal}`

  if (!cityVal && stateVal) query = `state=${stateVal}`

  if ((cityVal || stateVal) && countryVal) query = `${query}&&country=${countryVal}`

  if (!cityVal && !stateVal && countryVal) query = `country=${countryVal}`


  const temp = 'city=Denver'

  return (
    <header>
      <nav>
        <NavLink exact to="/" >
          <img className="logo" src={logo} />
        </NavLink>
        <NavLink id='main-logo-link' exact to="/">
          <h1 id="carebnb" >carebnb</h1>
        </NavLink>
        <div className="topNav">
          <input id='citySearch' className="navi"
                  type="text"
                  value={cityVal}
                  placeholder="Any City"
                  onChange={(e)=>setCityVal(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' ?
                      resetEnter() : false
                  }
            />
          <h2 className="navi line">|</h2>
          <input id='stateSearch' className="navi"
                  type="text"
                  value={stateVal}
                  placeholder="Any State"
                  onChange={(e)=>setStateVal(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' ?
                      resetEnter() : false
                  }
            />
          <h2 className="navi line">|</h2>
          <input id='countrySearch' className="navi"
                  type="text"
                  value={countryVal}
                  placeholder="Any Country"
                  onChange={(e)=>setCountryVal(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' ?
                      resetEnter() : false
                  }
            />

          {
            !cityVal && !stateVal && !countryVal ?
            <NavLink to={`/`}>
              <img className="search" src={magGlass} onClick={reset}/>
            </NavLink>
            :
            <NavLink to={`/spots/filtered/${query}`}>
              <img className="search" src={magGlass} onClick={reset}/>
            </NavLink>
          }

        </div>
      </nav>


      {isLoaded && (
        <div className="button-login">
          {sessionUser ?
              <h4 className="login create c-link">
                <NavLink id="create-link" exact to="/spots/new">Create a New Spot</NavLink>
              </h4> :
              <h4 className="login your-home h-link">Carebnb your home</h4>
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
