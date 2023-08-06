import { NavLink } from 'react-router-dom';
import star from './star.png';

export const SpotCard = ({spot}) => {

      let dollar = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
      });


      return (

            <div className='hover-text' id="entireCard">
                  <NavLink to={`/spots/${spot.id}`} className="card-link" activeClassName="active">

                        <div id="cardImage" className="entireCardItem">
                        <img className='spots-preview' src={spot.previewImage} alt='spot image'/>
                        </div>
                        <div id="cardDetails" className="entireCardItem">
                              <div id="leftSideDetails" className="cardDetailsItem">
                                    <div id="cityState">{`${spot.city}, ${spot.state}`}</div>
                                    <div id="rate">{`${dollar.format(spot.price)} night`}</div>
                              </div>
                              <div id="rightSideDetails" className="cardDetailsItem">
                                    <div id="starRating"> <img id="star" src={star}/>



                                    {
                                          spot.avgRating && spot.avgRating > 0 ? (spot.avgRating).toPrecision(2) : <div id='newWordIndex'>New</div>


                                    }



                                    </div>



                                    <div id="blank"></div>
                              </div>
                        </div>
                  </NavLink>
                  <span id='topTip' className='tooltip-text'>{spot.name}</span>
            </div>



      )
}
