// frontend/src/components/Maps/index.js
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getKey } from '../../store/maps';
import Maps from './Maps';

const MapContainer = ({ spot }) => {
  const key = useSelector((state) => state.maps.key);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!key) {
      dispatch(getKey());
    }
  }, [dispatch, key]);

  if (!key) {
    return null;
  } else {

      spot = { ...spot, key}

      return (
        <Maps apiKey={spot} />
      );
  }

};

export default MapContainer;
