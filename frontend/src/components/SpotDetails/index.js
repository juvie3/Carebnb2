import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchSpotDetails } from "../../store/spotsReducer"

export const SpotDetails = () => {
      const { spotId } = useParams()
      const dispatch = useDispatch()

      const spotDetails = useSelector( (state) =>
            state.spots ? state.spots.singleSpot : null
      )

      useEffect( () => {
            dispatch(fetchSpotDetails(spotId))
      }, [dispatch, spotId])

      return (
            <h1>Details Page</h1>
      )





}
