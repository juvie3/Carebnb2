
export const LOAD_SPOTS = 'spots/loadSpots';

export const loadSpots = (spots) => ({
      type: LOAD_SPOTS,
      spots
});


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


/** Reducer */

const initialState = {};

export const spotsReducer = (state = initialState, action) => {
      switch (action.type) {
            case LOAD_SPOTS:
                  console.log("target", action.spots);
                  return { ...state, ...action.spots}
            default:
                  return state
      }
}
