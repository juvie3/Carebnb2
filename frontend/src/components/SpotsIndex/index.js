import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchSpots } from "../../store/spotsReducer"
import { SpotCard } from "../SpotCard"


export const SpotsIndex = () => {
      const dispatch = useDispatch()

      // const [res, setRes] = useState([])
      // const [spotsObj, setSpotsObj] = useState({})

      const spots = Object.values (useSelector(state => (state.spots ? state.spots : {})))
//       const tr = Object.values(spots);
// console.log('silly',tr);
      // if (spots !== {}) {
      //       setRes(Object.values(spots))
            // setSpotsObj(res[0])
            // console.log('obj',spotsObj);
            // spotsObj.forEach(spot => {
            //       console.log(spot)})
            // const spotsArray = Object.values(spotsObject)
            // console.log(spotsArray);
            // for (let spot of spotsArray) {
            //       console.log(spot);
            // }
      // }


      useEffect(() => {
            dispatch(fetchSpots())
      }, [dispatch])

      console.log('finallly',spots);


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
                        {/* <div className="card"> */}

                        {
                              spots.map((spot) => (
                                    <SpotCard spot={spot} key={spot.id} />
                              ))

                              // spots.map(spot => (
                              // <img className='spots-preview' src={spot.previewImage} alt='spot image'/>
                              // ))

                        }

                        {/* </div> */}



                  </section>






                  </>


            )
      }

}
