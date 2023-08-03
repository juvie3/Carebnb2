import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchSpots } from "../../store/spotsReducer"
import { SpotCard } from "../SpotCard"


export const SpotsIndex = () => {
      const dispatch = useDispatch()

      const spots = Object.values (useSelector(state => (state.spots ? state.spots : {})))

      useEffect(() => {
            dispatch(fetchSpots())
      }, [dispatch])


      if ( spots !== {} && spots !== [] ) {

            return (
                  <>
                  <div className="filter-holder"   >
                        <h3 className="filter">Cabins</h3>
                        <h3 className="filter">Beachfront</h3>
                        <h3 className="filter">Tiny homes</h3>
                        <h3 className="filter">Mansions</h3>
                        <h3 className="filter">Lakefront</h3>
                        <h3 className="filter">Treehouses</h3>
                        <h3 className="filter">Castles</h3>
                        <h3 className="filter">Boats</h3>
                        <h3 className="filter">Farms</h3>
                        <h3 className="filter">Iconic cities</h3>
                  </div>

                  <section className="card-holder">

                        {
                              spots.map((spot) => (
                                   <SpotCard spot={spot} key={spot.id} />
                              ))

                        }

                  </section>
                  </>
            )
      }
}
