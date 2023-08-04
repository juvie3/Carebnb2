import './deleteReviewModal.css'
import { useModal } from '../../context/Modal'
import { useDispatch } from 'react-redux';
import { fetchRemoveReview } from '../../store/reviewsReducer';


export const DeleteReviewModal = ({review}) => {

      const { closeModal } = useModal();
      const dispatch = useDispatch();


      const deleteReview = () => {
            dispatch(fetchRemoveReview(review.id))
            .then(closeModal)
      }

      return (
            <div id='deleteModal' >
                  <h2>Confirm Delete</h2>
                  <div id='youSure' >Are you sure you want to delete this review?</div>
                  <button id='buttonY' onClick={deleteReview}>Yes - Delete Review</button>
                  <button id='buttonN' onClick={closeModal}>No - Keep Review</button>


            </div>

      )


}
