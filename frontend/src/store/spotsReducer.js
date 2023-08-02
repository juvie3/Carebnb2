
export const LOAD_SPOTS = 'spots/loadSpots';
export const GET_SPOT = 'spots/getSpot';

export const loadSpots = (spots) => ({
      type: LOAD_SPOTS,
      spots
});

export const getSpot = (spots) => ({
      type: GET_SPOT,
      spots
})


/** Thunk Action Creators */

export const fetchSpots = () => async (dispatch) => {
      const res = await fetch('/api/spots');

      if (res.ok) {
            const allSpots = await res.json();
            const spots = {}
            allSpots.Spots.forEach(spot => spots[spot.id] = spot)
            dispatch (loadSpots(spots));
      }
}

export const fetchSpotDetails = (spotId) => async (dispatch) => {
      const res = await fetch(`/api/spots/${spotId}`)

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

export const createNewSpot = (spot) => async (dispatch) => {
      const res = await fetch('/api/spots', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(spot)
      })

      if (res.ok) {
            const newSpot = await res.json()
            const spots = {}
            spots.singleSpot = { ...newSpot }
            dispatch(getSpot(spots))
            return newSpot
      } else {
            const errors = await res.json()
            return errors
      }


}

/** Reducer */

const initialState = {};

export const spotsReducer = (state = initialState, action) => {
      switch (action.type) {
            case LOAD_SPOTS:
                  return { ...state, ...action.spots};
            case GET_SPOT:
                  return { ...state, ...action.spots}
            default:
                  return state
      }
}
