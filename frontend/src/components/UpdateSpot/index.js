import { useParams } from "react-router-dom";
import { SpotForm } from "../SpotForm";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchSpotDetails } from "../../store/spotsReducer";

export const UpdateSpot = () => {
      const { spotId } = useParams()
      const dispatch = useDispatch()

      const spot = useSelector( (state) =>
            state.spots ? state.spots.singleSpot : null
      )

      useEffect( () => {
            dispatch(fetchSpotDetails(spotId))
      }, [dispatch, spotId])

      console.log('test', spot);

      if (spot) {

            const updateForm = {


            }

            return (
                  <SpotForm form={spot} formTitle="Update Spot" />
            )


      } else {
            return (
                  <h2>Currently Loading</h2>
            )
      }

}
