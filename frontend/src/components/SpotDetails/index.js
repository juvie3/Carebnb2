import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchSpotDetails } from "../../store/spotsReducer"
import logo from './airbnb.png'
import './spotDetails.css'
import { fetchReviews } from "../../store/reviewsReducer"
import { ReviewCard } from "../ReviewCard"
import OpenModalButton from "../OpenModalButton"
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem'
import { AddReviewModal } from "../AddReviewModal"
import { ComingModal } from "../ComingModal"

export const SpotDetails = () => {
      const { spotId } = useParams()
      const dispatch = useDispatch()

      let dollar = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
      });

      // const setOffModal = () => {

      //       OpenModalButton (modalComponent=<ComingModal/>)


      // }

      const sessionUser = useSelector((state) => state.session.user);

      const spot = useSelector( (state) =>
            state.spots ? state.spots.singleSpot : null
      )

      const allReviews = useSelector( (state) =>
            state.reviews ? Object.values(state.reviews) : null
      )

      useEffect( () => {
            dispatch(fetchSpotDetails(spotId))
      }, [dispatch, spotId])


      useEffect(() => {
            const fetchReviewsData = async () => {
              try {
                const res = await dispatch(fetchReviews(spotId));
                if (res.status === 404) {
                  console.log("No reviews found for the spot with ID:", spotId);
                }
              } catch (error) {
                console.error("Error fetching reviews:", error);
              }
            };
            fetchReviewsData();
      }, [dispatch, spotId]);

      const reviews = allReviews.filter( review => review.spotId == spotId )

      reviews.reverse()


      if (spot === undefined) {
            return null
      } else if (spot.SpotImages === undefined) {
            return null
      } else {

            if (sessionUser) {


                  let redLight = false;

                  if(!sessionUser) redLight = true
                  if (sessionUser && sessionUser.id == spot.ownerId) redLight = true


                  const flag = reviews.find(review => review.User?.id === sessionUser.id)
                  if (flag) redLight = true


                  return (

                        <div id='detailsPage'>

                              <div id='detailsHolder'>
                                    <h2 className='spotName'>{spot.name}</h2>
                                    <p className='spotName'>{`${spot.city}, ${spot.state}, ${spot.country}`}</p>

                                    <div id='imageHolder'>
                                          <div id='previewImage'>
                                                { spot.SpotImages[0] ?
                                                      <img id='image1' src={spot.SpotImages[0].url} /> :
                                                      <img id='image1' src={logo} />
                                                }
                                          </div>
                                          <div id='otherImages'>
                                                <div id='leftImages'>
                                                      <div className="topImage">
                                                      { spot.SpotImages[1] ?
                                                      <img id='image2' src={spot.SpotImages[1].url} /> :
                                                      <img id='image2' src={logo} />
                                                }
                                                      </div>
                                                      <div className="bottomImage">
                                                      { spot.SpotImages[2] ?
                                                      <img id='image3' src={spot.SpotImages[2].url} /> :
                                                      <img id='image3' src={logo} />
                                                }
                                                      </div>
                                                </div>
                                                <div id='rightImages'>
                                                      <div className="topImage">
                                                      { spot.SpotImages[3] ?
                                                      <img id='image4' src={spot.SpotImages[3].url} /> :
                                                      <img id='image4' src={logo} />
                                                }
                                                      </div>
                                                      <div className="bottomImage">
                                                      { spot.SpotImages[4] ?
                                                      <img id='image5' src={spot.SpotImages[4].url} /> :
                                                      <img id='image5' src={logo} />
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
                                                                  <p id='nightly'>{`${dollar.format(spot.price)} night`}</p>
                                                            </div>

                                                            {
                                                                  spot.numReviews == 0 ?

                                                                        <div id='starred'>
                                                                              <p>&#9733;{` New`}
                                                                              </p>
                                                                        </div>

                                                                        :

                                                                  spot.numReviews == 1 ?

                                                                        <div id='starred'>
                                                                              <p>&#9733;{` ${spot.avgStarRating && (spot.avgStarRating).toFixed(1)} • ${spot.numReviews} review`}
                                                                              </p>
                                                                        </div>

                                                                        :

                                                                        <div id='starred'>
                                                                              <p>&#9733;{` ${spot.avgStarRating && (spot.avgStarRating).toFixed(1)} • ${spot.numReviews} reviews`}
                                                                              </p>
                                                                        </div>



                                                            }

                                                      </div>

                                                      <div id='reserveButt'>
                                                            <OpenModalMenuItem
                                                                  itemText="Reserve"
                                                                  modalComponent={<ComingModal/>}
                                                            />
                                                      </div>

                                                </div>
                                                <div>

                                                </div>
                                          </div>
                                    </div>

                                    <div id='reviewsHolder'>
                                          <div id='reviewbar'>

                                                <div id='star-reviews-rh'>

                                                {

                                                      spot.numReviews == 0 ?
                                                      <p>&#9733;{` New`}</p>
                                                      :
                                                      spot.numReviews == 1 ?
                                                      <p>&#9733;{` ${spot.avgStarRating && (spot.avgStarRating).toFixed(1)} • ${spot.numReviews} review`}</p>
                                                      :
                                                      <p>&#9733;{` ${spot.avgStarRating && (spot.avgStarRating).toFixed(1)} • ${spot.numReviews} reviews`}</p>

                                                }


                                                </div>

                                          </div>

                                          <div id='post-review-butt'>

                                                {

                                                      redLight===false?
                                                            <OpenModalButton buttonText="Post Your Review" modalComponent={<AddReviewModal spot={spot} />} /> : <p></p>



                                                }




                                          </div>

                                          <div id='reviewMap'>

                                                {
                                                      reviews.length > 0 ?
                                                      reviews.map((review) => (
                                                            <ReviewCard review={review} key={review.id} />

                                                      ))

                                                      :

                                                      sessionUser.id == spot.ownerId ?
                                                      <p></p>
                                                      :
                                                      <h4>Be the first to post a review!</h4>
                                                }

                                          </div>



                                    </div>






                              </div>











                        </div>







                  )



            } else {

                  let redLight = false;

                  if(!sessionUser) redLight = true
                  if (sessionUser && sessionUser.id == spot.ownerId) redLight = true


                  const flag = reviews.find(review => review.User?.id === sessionUser && sessionUser.id)
                  if (flag) redLight = true


                  return (

                        <div id='detailsPage'>

                              <div id='detailsHolder'>
                                    <h2 className='spotName'>{spot.name}</h2>
                                    <p className='spotName'>{`${spot.city}, ${spot.state}, ${spot.country}`}</p>

                                    <div id='imageHolder'>
                                          <div id='previewImage'>
                                                { spot.SpotImages[0] ?
                                                      <img id='image1' src={spot.SpotImages[0].url} /> :
                                                      <img id='image1' src={logo} />
                                                }
                                          </div>
                                          <div id='otherImages'>
                                                <div id='leftImages'>
                                                      <div className="topImage">
                                                      { spot.SpotImages[1] ?
                                                      <img id='image2' src={spot.SpotImages[1].url} /> :
                                                      <img id='image2' src={logo} />
                                                }
                                                      </div>
                                                      <div className="bottomImage">
                                                      { spot.SpotImages[2] ?
                                                      <img id='image3' src={spot.SpotImages[2].url} /> :
                                                      <img id='image3' src={logo} />
                                                }
                                                      </div>
                                                </div>
                                                <div id='rightImages'>
                                                      <div className="topImage">
                                                      { spot.SpotImages[3] ?
                                                      <img id='image4' src={spot.SpotImages[3].url} /> :
                                                      <img id='image4' src={logo} />
                                                }
                                                      </div>
                                                      <div className="bottomImage">
                                                      { spot.SpotImages[4] ?
                                                      <img id='image5' src={spot.SpotImages[4].url} /> :
                                                      <img id='image5' src={logo} />
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
                                                                  <p id='nightly'>{`${dollar.format(spot.price)} night`}</p>
                                                            </div>


                                                            {
                                                                  spot.numReviews == 0 ?

                                                                        <div id='starred'>
                                                                              <p>&#9733;{` New`}
                                                                              </p>
                                                                        </div>

                                                                        :

                                                                  spot.numReviews == 1 ?

                                                                        <div id='starred'>
                                                                              <p>&#9733;{` ${spot.avgStarRating && (spot.avgStarRating).toFixed(1)} • ${spot.numReviews} review`}
                                                                              </p>
                                                                        </div>

                                                                        :

                                                                        <div id='starred'>
                                                                              <p>&#9733;{` ${spot.avgStarRating && (spot.avgStarRating).toFixed(1)} • ${spot.numReviews} reviews`}
                                                                              </p>
                                                                        </div>



                                                            }

                                                      </div>

                                                      <div id='reserveButt'>
                                                            <OpenModalMenuItem
                                                                  itemText="Reserve"
                                                                  modalComponent={<ComingModal/>}
                                                            />
                                                      </div>

                                                </div>
                                                <div>

                                                </div>
                                          </div>
                                    </div>

                                    <div id='reviewsHolder'>
                                          <div id='reviewbar'>

                                                <div id='star-reviews-rh'>

                                                {

                                                      spot.numReviews == 0 ?
                                                      <p>&#9733;{` New`}</p>
                                                      :
                                                      spot.numReviews == 1 ?
                                                      <p>&#9733;{` ${spot.avgStarRating && (spot.avgStarRating).toFixed(1)} • ${spot.numReviews} review`}</p>
                                                      :
                                                      <p>&#9733;{` ${spot.avgStarRating && (spot.avgStarRating).toFixed(1)} • ${spot.numReviews} reviews`}</p>

                                                }


                                                </div>

                                          </div>

                                          <div id='post-review-butt'>

                                                {

                                                      redLight===false?
                                                            <OpenModalButton buttonText="Post Your Review" modalComponent={<AddReviewModal spot={spot} />} /> : <p></p>



                                                }




                                          </div>

                                          <div id='reviewMap'>

                                                {
                                                      reviews.length > 0 ?
                                                      reviews.map((review) => (
                                                            <ReviewCard review={review} key={review.id} />

                                                      ))

                                                      :

                                                      <h4>Be the first to post a review!</h4>
                                                }

                                          </div>



                                    </div>






                              </div>











                        </div>








                  )







            }



      }




}
