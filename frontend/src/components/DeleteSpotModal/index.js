import './deleteSpotModal.css'
import { useModal } from '../../context/Modal'
import { useDispatch } from 'react-redux';
import { fetchRemoveSpot } from '../../store/spotsReducer';

export const DeleteSpotModal = ({spot}) => {

      const { closeModal } = useModal();
      const dispatch = useDispatch();

      const deleteSpot = () => {
            dispatch(fetchRemoveSpot(spot.id))
            .then(closeModal)
      }

      return (
            <div id='deleteModal' >
                  <h2>Confirm Delete</h2>
                  <div id='youSure' >Are you sure you want to remove this spot from the listings?</div>
                  <button id='buttonY' onClick={deleteSpot}>Yes - Delete Spot</button>
                  <button id='buttonN' onClick={closeModal}>No - Keep Spot</button>


            </div>

      )


}
