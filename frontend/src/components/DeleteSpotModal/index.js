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
                  <p>Are you sure you want to remove this spot from the listings?</p>
                  <button onClick={deleteSpot}>Yes</button>
                  <button onClick={closeModal}>No</button>


            </div>

      )


}
