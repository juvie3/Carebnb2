// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import { SpotsIndex } from "./components/SpotsIndex";
import { SpotDetails } from "./components/SpotDetails";
import { CreateSpot } from "./components/CreateSpot";

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
        <Route exact path='/' component={SpotsIndex} />
        <Route exact path='/spots/new' component={CreateSpot} />
        <Route exact path='/spots/:spotId' component={SpotDetails} />

        </Switch>}
    </>
  );
}

export default App;
