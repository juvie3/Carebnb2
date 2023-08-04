import { csrfFetch } from "./csrf";

export const LOAD_REVIEWS = 'reviews/loadReviews';
export const ADD_REVIEW = 'reviews/addReview';
export const REMOVE_REVIEW = 'reviews/removeReview';

export const loadReviews = (reviews) => ({
      type: LOAD_REVIEWS,
      reviews
})

export const addReview = (review) => ({
      type: ADD_REVIEW,
      review
})

export const removeReview = (reviewId) => ({
      type: REMOVE_REVIEW,
      reviewId
})


/** Thunk Action Creators */

export const fetchReviews = (spotId) => async (dispatch) => {


      const res = await csrfFetch(`/api/spots/${spotId}/reviews`)


      if (res.ok) {

            const allReviews = await res.json()
            const reviews = {}

            allReviews.Reviews.forEach(review => reviews[review.id] = review)

            dispatch(loadReviews(reviews))
            return allReviews


      } else {
            const errors = await res.json()
            return errors
      }


}

export const fetchAddReview = (reviewObj) => async (dispatch) => {

            const newReview = { review: reviewObj.review, stars: reviewObj.stars}

      const res = await csrfFetch(`/api/spots/${reviewObj.spotId}/reviews`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newReview)
      })

      if (res.ok) {
            const brandnewReview = await res.json()
            const reviewDone = {}
            reviewDone[brandnewReview.id] = brandnewReview
            dispatch(fetchReviews(reviewObj.spotId))
      } else {
            const errors = await res.json()
            return errors
      }

}

export const fetchRemoveReview = (reviewId) => async (dispatch) => {

      const res = await csrfFetch(`/api/reviews/${reviewId}`, {
            method: 'DELETE'
      })

      if (res.ok) {
            dispatch(removeReview(reviewId))
      } else {
            const errors = await res.json()
            return errors
      }

}





/** Reducer */

const initialState = {}

export const reviewsReducer = (state = initialState, action) => {
      switch (action.type) {
            case LOAD_REVIEWS:
                  return { ...action.reviews };
            case ADD_REVIEW:
                  return { ...state, [action.review.id]: action.review };
            case REMOVE_REVIEW:
                  const newState = { ...state };
                  delete newState[action.reviewId];
                  return newState;
            default:
                  return state

      }

}
