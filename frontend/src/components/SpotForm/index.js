import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createNewSpot, fetchUpdateSpot } from '../../store/spotsReducer';


export const SpotForm = ({form, formTitle}) => {

      const [address, setAddress] = useState(form?.address);
      const [city, setCity] = useState(form?.city);
      const [state, setState] = useState(form?.state);
      const [country, setCountry] = useState(form?.country);
      const [lat, setLat] = useState(form?.lat);
      const [lng, setLng] = useState(form?.lng);
      const [name, setName] = useState(form?.name);
      const [description, setDescription] = useState(form?.description);
      const [price, setPrice] = useState(form?.price);

      const [errors, setErrors] = useState({});
      const dispatch = useDispatch();
      const history = useHistory();

      const submitForm = async (e) => {
            e.preventDefault();
            setErrors({});

            form = { ...form, address, city, state, country, lat, lng, name, description, price };

            if (formTitle === "Update Spot") {
                  const updatedSpot = await dispatch(fetchUpdateSpot(form))
                  form = updatedSpot;
            } else if (formTitle === "Create a New Spot") {
                  const newSpot = await dispatch(createNewSpot(form))
                  form = newSpot
            }

            console.log('here', form);

            if (form.errors) {
                  setErrors(form.errors)
            } else {
                  if (formTitle === "Update Spot") {
                        history.replace(`/spots/${form.id}`)
                  } else {
                        history.replace(`/spots/${form.singleSpot.id}`)
                  }
            }

      }


      return (
            <form onSubmit={submitForm}>
                  <h2>{formTitle}</h2>
                  <h3>Where's your place located?</h3>
                  <p>Guests will only get your exact address once they book a reservation.</p>

                  <div id="addressSection">
                        <label>
                              Country
                              <input
                                    type='text'
                                    placeholder='Country'
                                    value={country}
                                    onChange={(e)=>setCountry(e.target.value)}
                              />
                        </label>
                        <label>
                              Street Address
                              <input
                                    type='text'
                                    placeholder='Address'
                                    value={address}
                                    onChange={(e)=>setAddress(e.target.value)}
                              />
                        </label>
                        <label>
                              City
                              <input
                                    type='text'
                                    placeholder='City'
                                    value={city}
                                    onChange={(e)=>setCity(e.target.value)}
                              />
                        </label>
                        <label>
                              State
                              <input
                                    type='text'
                                    placeholder='State'
                                    value={state}
                                    onChange={(e)=>setState(e.target.value)}
                              />
                        </label>
                        <label>
                              Latitude
                              <input
                                    type='number'
                                    placeholder='Latitude'
                                    value={lat}
                                    onChange={(e)=>setLat(e.target.value)}
                              />
                        </label>
                        <label>
                              Longitude
                              <input
                                    type='number'
                                    placeholder='Longitude'
                                    value={lng}
                                    onChange={(e)=>setLng(e.target.value)}
                              />
                        </label>
                  </div>

                  <h3>Describe your place to guests</h3>
                  <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>

                  <div id="descriptionSection">
                        <labe>
                              <input
                                    type='text'
                                    placeholder='Please write at least 30 characters'
                                    value={description}
                                    onChange={(e)=>setDescription(e.target.value)}
                              />
                        </labe>
                  </div>

                  <h3>Create a title for your Spot</h3>
                  <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>

                  <div id="nameSection">
                        <labe>
                              <input
                                    type='text'
                                    placeholder='Name of your spot'
                                    value={name}
                                    onChange={(e)=>setName(e.target.value)}
                              />
                        </labe>
                  </div>

                  <h3>Set a base price for your spot</h3>
                  <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>

                  <div id="priceSection">
                        <labe>
                              $
                              <input
                                    type='number'
                                    placeholder='Price per night (USD)'
                                    value={price}
                                    onChange={(e)=>setPrice(e.target.value)}
                              />
                        </labe>
                  </div>

                  <button type='submit'>{formTitle}</button>

            </form>
      )

}
