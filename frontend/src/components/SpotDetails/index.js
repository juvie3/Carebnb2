import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchSpotDetails } from "../../store/spotsReducer"
import logo from './airbnb.png'
import './spotDetails.css'

export const SpotDetails = () => {
      const { spotId } = useParams()
      const dispatch = useDispatch()

      const spot = useSelector( (state) =>
            state.spots ? state.spots.singleSpot : null
      )

      useEffect( () => {
            dispatch(fetchSpotDetails(spotId))
      }, [dispatch, spotId])

      if (spot) {
            console.log('det',spot.SpotImages);
            for (let image of spot.SpotImages) {
                  console.log('inner', image.url);
            }

      }

      if (spot) {
            console.log('own',spot.Owner.firstName);

            return (


                        <div id='detailsHolder'>
                              <h2 className='spotName'>{spot.name}</h2>
                              <p className='spotName'>{`${spot.city}, ${spot.state}, ${spot.country}`}</p>

                              <div id='imageHolder'>
                                    <div id='previewImage'>
                                          { spot.SpotImages[0] ?
                                                <img id='image1' src={spot.SpotImages[0].url} /> :
                                                <img src={logo} />
                                          }
                                    </div>
                                    <div id='otherImages'>
                                          <div id='leftImages'>
                                                <div className="topImage">
                                                { spot.SpotImages[0] ?
                                                <img id='image1' src={spot.SpotImages[0].url} /> :
                                                <img src={logo} />
                                          }
                                                </div>
                                                <div className="bottomImage">
                                                { spot.SpotImages[0] ?
                                                <img id='image1' src={spot.SpotImages[0].url} /> :
                                                <img src={logo} />
                                          }
                                                </div>
                                          </div>
                                          <div id='rightImages'>
                                                <div className="topImage">
                                                { spot.SpotImages[0] ?
                                                <img id='image1' src={spot.SpotImages[0].url} /> :
                                                <img src={logo} />
                                          }
                                                </div>
                                                <div className="bottomImage">
                                                { spot.SpotImages[0] ?
                                                <img id='image1' src={spot.SpotImages[0].url} /> :
                                                <img src={logo} />
                                          }
                                                </div>
                                          </div>
                                    </div>
                              </div>

                              <div id='hostRate'>
                                    <div id='host'>
                                          <h2 id='hostName'>{`Hosted by ${spot.Owner.firstName} ${spot.Owner.lastName}`}</h2>
                                          <p id='desc'>{spot.description}</p>
                                    </div>
                                    <div id='rateBox'>
                                          <div id='reserveBox'>
                                                <div id='rateStars'>
                                                      <div id='night'>
                                                            <p id='nightly'>{`$${spot.price} night`}</p>
                                                      </div>
                                                      <div id='starred'>
                                                            <p>&#9733;{` ${spot.avgStarRating} -- ${spot.numReviews} reviews`}</p>
                                                      </div>

                                                </div>
                                                <div id='reserveButt'>
                                                      <p id='reserveWord'>Reserve</p>
                                                </div>

                                          </div>
                                          <div>

                                          </div>
                                    </div>




                              </div>






                        </div>







            )

      }





}
