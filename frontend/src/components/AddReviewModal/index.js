import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal"
import './addReviewModal.css'
import { useState } from "react";
import { fetchAddReview } from "../../store/reviewsReducer";
import { fetchSpotDetails } from "../../store/spotsReducer";
import { useHistory } from "react-router-dom";

export const AddReviewModal = ({spot}) => {
      const history = useHistory()

      const [stars, setStars] = useState()
      const [review, setReview] = useState('')

      const { closeModal } = useModal();
      const dispatch = useDispatch();


      const submitReview = async () => {

            const reviewObj = { review: review, stars: stars, spotId: spot.id }

            await dispatch(fetchAddReview(reviewObj))


            await dispatch(fetchSpotDetails(spot.id))



            .then(closeModal)
            // history.push(`/spots/${spot.id}`)
      }

      return (
            <div id='theWholeThing'>
            <h3>How was your stay?</h3>
            <textarea id='reviewInput'
                  type='text'
                  placeholder="Leave your review here"
                  value={review}
                  onChange={(e)=>setReview(e.target.value)}
            />
            <form>
                  <fieldset id='starsBox'>
                  <div class="star-cb-group">
                        <input type="radio" className="starClass" id="rating-5" name="rating" value="5" onChange={e=>setStars(e.target.value)} />
                        <label for="rating-5">5</label>
                        <input type="radio" className="starClass" id="rating-4" name="rating" value="4" onChange={e=>setStars(e.target.value)} />
                        <label for="rating-4">4</label>
                        <input type="radio" className="starClass" id="rating-3" name="rating" value="3" onChange={e=>setStars(e.target.value)} />
                        <label for="rating-3">3</label>
                        <input type="radio" className="starClass" id="rating-2" name="rating" value="2"  onChange={e=>setStars(e.target.value)} />
                        <label for="rating-2">2</label>
                        <input type="radio" className="starClass" id="rating-1" name="rating" value="1"  onChange={e=>setStars(e.target.value)} />
                        <label for="rating-1">1</label>
                  </div>
                  <div id='star-word'>Stars</div>
                  </fieldset>
            </form>
            <button disabled={review.length<10} id='thisDangButton' onClick={submitReview}>Submit Your Review</button>


            </div>

      )

}
