// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import { SpotsIndex } from "./components/SpotsIndex";
import { SpotDetails } from "./components/SpotDetails";
import { CreateSpot } from "./components/CreateSpot";
import { CurrentSpots } from "./components/CurrentSpots";
import { UpdateSpot } from "./components/UpdateSpot";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Switch>
        {/* <Route path='/spots?type=cabin' component={SpotsIndex} /> */}
        <Route exact path='/' component={SpotsIndex} />
        <Route exact path='/spots/new' component={CreateSpot} />
        <Route exact path='/spots/current' component={CurrentSpots} />
        <Route exact path='/spots/update/:spotId' component={UpdateSpot} />
        <Route exact path='/spots/:spotId' component={SpotDetails} />
        </Switch>}
    </>
  );
}

export default App;
