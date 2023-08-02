import { NavLink } from 'react-router-dom';
import star from './star.png';

export const SpotCard = ({spot, key}) => {

      return (

            <div id="entireCard">
                  <NavLink key={spot.id} to={`/spots/${spot.id}`} className="card-link" activeClassName="active">

                        <div id="cardImage" className="entireCardItem">
                        <img key={spot.id} className='spots-preview' src={spot.previewImage} alt='spot image'/>
                        </div>
                        <div id="cardDetails" className="entireCardItem">
                              <div id="leftSideDetails" className="cardDetailsItem">
                                    <div key={spot.id} id="cityState">{`${spot.city}, ${spot.state}`}</div>
                                    <div key={spot.id} id="rate">{`$${spot.price} night`}</div>
                              </div>
                              <div id="rightSideDetails" className="cardDetailsItem">
                                    <div key={spot.id} id="starRating"> <img id="star" src={star}/> {spot.avgRating}</div>
                                    <div id="blank"></div>
                              </div>
                        </div>
                  </NavLink>
            </div>



      )
}
