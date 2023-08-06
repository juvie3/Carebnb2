import { csrfFetch } from "./csrf";

export const LOAD_SPOTS = 'spots/loadSpots';
export const GET_SPOT = 'spots/getSpot';
export const DELETE_SPOT = 'spots/deleteSpot'
export const UPDATE_SPOT = 'spots/updateSpot'
export const ADD_SPOT_IMAGE = 'spots/addSpotImage'

export const loadSpots = (spots) => ({
      type: LOAD_SPOTS,
      spots
});

export const getSpot = (spots) => ({
      type: GET_SPOT,
      spots
})

export const deleteSpot = (spotId) => ({
      type: DELETE_SPOT,
      spotId
})

export const updateSpot = (spot) => ({
      type: UPDATE_SPOT,
      spot
})

export const addSpotImage = (image) => ({
      type: ADD_SPOT_IMAGE,
      image
})


/** Thunk Action Creators */

export const fetchSpots = () => async (dispatch) => {
      const res = await csrfFetch('/api/spots');

      if (res.ok) {
            const allSpots = await res.json();
            const spots = {}
            allSpots.Spots.forEach(spot => spots[spot.id] = spot)
            dispatch (loadSpots(spots));
      }
}

export const fetchSpotDetails = (spotId) => async (dispatch) => {
      const res = await csrfFetch(`/api/spots/${spotId}`)

      if (res.ok) {
            const spot = await res.json();
            const spots = {}
            spots.singleSpot = { ...spot }
            dispatch(getSpot(spots))
      } else {
            const errors = await res.json()
            return errors
      }
}

export const fetchCreateNewSpot = (spot) => async (dispatch) => {
      const res = await csrfFetch('/api/spots', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(spot)
      })

      if (res.ok) {
            const newSpot = await res.json()
            const spots = {}
            spots.singleSpot = { ...newSpot }
            dispatch(getSpot(spots))
            return spots
      } else {
            const errors = await res.json()
            return errors
      }
}

export const fetchCurrentUserSpots = () => async (dispatch) => {
      const res = await csrfFetch('/api/spots/current')

      if (res.ok) {
            const allSpots = await res.json();
            const spots = {}
            allSpots.Spots.forEach(spot => spots[spot.id] = spot)
            dispatch (loadSpots(spots));
            return allSpots
      }
}

export const fetchRemoveSpot = (spotId) => async (dispatch) => {
      const res = await csrfFetch(`/api/spots/${spotId}`, {
            method: 'DELETE'
      })

      if (res.ok) {
            dispatch(deleteSpot(spotId))
      } else {
            const errors = await res.json()
            return errors
      }
}

export const fetchUpdateSpot = (spot) => async (dispatch) => {
      const res = await csrfFetch(`/api/spots/${spot.id}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(spot),
      })

      if (res.ok) {
            const editedSpot = await res.json()
            dispatch(updateSpot(editedSpot))
            return editedSpot
      } else {
            const errors = await res.json()
            return errors
      }
}

export const fetchAddSpotImage = (imageobj) => async (dispatch) => {

      const imageObj = { url: imageobj.url, preview: imageobj.preview}

      const res = await csrfFetch(`/api/spots/${imageobj.spotId}/images`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(imageObj),
      })

}

/** Reducer */

const initialState = {};

export const spotsReducer = (state = initialState, action) => {
      switch (action.type) {
            case LOAD_SPOTS:
                  return { ...action.spots};
            case GET_SPOT:
                  return { ...action.spots};
            case DELETE_SPOT:
                  const newState = { ...state };
                  delete newState[action.spotId];
                  return newState;
            case UPDATE_SPOT:
                  return { ...state, [action.spot.id]: action.spot}
            default:
                  return state
      }
}
