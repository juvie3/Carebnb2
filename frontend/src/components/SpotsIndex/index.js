import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchSpots } from "../../store/spotsReducer"
import { SpotCard } from "../SpotCard"
import cabin from './cabin.jpeg'
import beach from './beach.jpeg'
import tiny from './tiny.jpeg'
import mansion from './mansions.jpeg'
import lake from './lake.jpeg'
import tree from './tree.jpeg'
import castle from './castle.jpeg'
import boat from './boats.jpeg'
import farm from './farms.jpeg'
import cities from './cities.jpeg'


export const SpotsIndex = () => {
      const dispatch = useDispatch()

      const spots = Object.values (useSelector(state => (state.spots ? state.spots : {})))

      useEffect(() => {
            dispatch(fetchSpots())
      }, [dispatch])


      if ( spots !== {} && spots !== [] ) {

            return (
                  <>
                  <div className="filter-holder">
                        <div className='filterBox'>
                              <img className="filter-icon" src={cabin} />
                              <div className="filter filter-word">Cabins</div>
                        </div>

                        <div className='filterBox'>
                              <img className="filter-icon" src={beach} />
                              <div className="filter filter-word">Beachfront</div>
                        </div>

                        <div className='filterBox'>
                              <img className="filter-icon" src={tiny} />
                              <div className="filter filter-word">Tiny homes</div>
                        </div>

                        <div className='filterBox'>
                              <img className="filter-icon" src={mansion} />
                              <div className="filter filter-word">Mansions</div>

                        </div>
                        <div className='filterBox'>

                              <img className="filter-icon" src={lake} />
                              <div className="filter filter-word">Lakefront</div>

                        </div>
                        <div className='filterBox'>

                              <img className="filter-icon" src={tree} />
                              <div className="filter filter-word">Treehouses</div>

                        </div>
                        <div className='filterBox'>

                              <img className="filter-icon" src={castle} />
                              <div className="filter filter-word">Castles</div>

                        </div>
                        <div className='filterBox'>

                              <img className="filter-icon" src={boat} />
                              <div className="filter filter-word">Boats</div>

                        </div>
                        <div className='filterBox'>

                              <img className="filter-icon" src={farm} />
                              <div className="filter filter-word">Farms</div>

                        </div>
                        <div className='filterBox'>

                              <img className="filter-icon" src={cities} />
                              <div className="filter filter-word">Iconic cities</div>

                        </div>
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
