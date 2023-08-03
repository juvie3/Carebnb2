import { NavLink } from 'react-router-dom';
import star from './star.png';

export const SpotCard = ({spot}) => {

      return (

            <div id="entireCard">
                  <NavLink to={`/spots/${spot.id}`} className="card-link" activeClassName="active">

                        <div id="cardImage" className="entireCardItem">
                        <img className='spots-preview' src={spot.previewImage} alt='spot image'/>
                        </div>
                        <div id="cardDetails" className="entireCardItem">
                              <div id="leftSideDetails" className="cardDetailsItem">
                                    <div id="cityState">{`${spot.city}, ${spot.state}`}</div>
                                    <div id="rate">{`$${spot.price} night`}</div>
                              </div>
                              <div id="rightSideDetails" className="cardDetailsItem">
                                    <div id="starRating"> <img id="star" src={star}/> {spot.avgRating}</div>
                                    <div id="blank"></div>
                              </div>
                        </div>
                  </NavLink>
            </div>



      )
}
