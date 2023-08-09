import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
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
      const [filter, setFilter] = useState('')

      const spots = Object.values (useSelector(state => (state.spots ? state.spots : {})))

      useEffect(() => {
            dispatch(fetchSpots())
      }, [dispatch])


      if ( spots !== {} && spots !== [] ) {

            return (
                  <>
                  <div className="filter-holder">

                        <div className='filterBox' onClick={(e)=>setFilter('cabin')}>
                              <img className="filter-icon" src={cabin} />
                              <div className="filter filter-word">Cabins</div>
                              {
                                    filter === 'cabin' ?
                                    <div id='cabin-line'></div> : null
                              }
                        </div>

                        <div className='filterBox' onClick={(e)=>setFilter('beachfront')}>
                              <img className="filter-icon" src={beach} />
                              <div className="filter filter-word">Beachfront</div>
                              {
                                    filter === 'beachfront' ?
                                    <div id='beachfront-line'></div> : null
                              }
                        </div>

                        <div className='filterBox' onClick={(e)=>setFilter('tiny')}>
                              <img className="filter-icon" src={tiny} />
                              <div className="filter filter-word">Tiny Homes</div>
                              {
                                    filter === 'tiny' ?
                                    <div id='tiny-line'></div> : null
                              }
                        </div>

                        <div className='filterBox' onClick={(e)=>setFilter('mansion')}>
                              <img className="filter-icon" src={mansion} />
                              <div className="filter filter-word">Mansions</div>
                              {
                                    filter === 'mansion' ?
                                    <div id='mansion-line'></div> : null
                              }
                        </div>

                        <div className='filterBox' onClick={(e)=>setFilter('lakefront')}>
                              <img className="filter-icon" src={lake} />
                              <div className="filter filter-word">Lakefront</div>
                              {
                                    filter === 'lakefront' ?
                                    <div id='lakefront-line'></div> : null
                              }
                        </div>

                        <div className='filterBox' onClick={(e)=>setFilter('treehouse')}>
                              <img className="filter-icon" src={tree} />
                              <div className="filter filter-word">Treehouses</div>
                              {
                                    filter === 'treehouse' ?
                                    <div id='treehouse-line'></div> : null
                              }
                        </div>

                        <div className='filterBox' onClick={(e)=>setFilter('castle')}>
                              <img className="filter-icon" src={castle} />
                              <div className="filter filter-word">Castles</div>
                              {
                                    filter === 'castle' ?
                                    <div id='castle-line'></div> : null
                              }
                        </div>

                        <div className='filterBox' onClick={(e)=>setFilter('boat')}>
                              <img className="filter-icon" src={boat} />
                              <div className="filter filter-word">Boats</div>
                              {
                                    filter === 'boat' ?
                                    <div id='boat-line'></div> : null
                              }
                        </div>

                        <div className='filterBox' onClick={(e)=>setFilter('farm')}>
                              <img className="filter-icon" src={farm} />
                              <div className="filter filter-word">Farms</div>
                              {
                                    filter === 'farm' ?
                                    <div id='farm-line'></div> : null
                              }
                        </div>

                        <div className='filterBox' onClick={(e)=>setFilter('iconic')}>
                              <img className="filter-icon" src={cities} />
                              <div className="filter filter-word">Iconic cities</div>
                              {
                                    filter === 'iconic' ?
                                    <div id='iconic-line'></div> : null
                              }
                        </div>

                  </div>

                  {
                        filter === "" ? null :
                        <div id='filter-reset' onClick={(e)=>setFilter('')}>See All Spots</div>

                  }


                  <section className="card-holder">



                        {
                              spots.filter((spot) => {
                                    return filter === '' ? spot : spot.category == filter
                              }).map((spot) => (
                                   <SpotCard spot={spot} key={spot.id} />
                              ))

                        }

                  </section>
                  </>
            )
      }
}
