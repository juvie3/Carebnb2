import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createNewSpot, fetchUpdateSpot } from '../../store/spotsReducer';
import './spotForm.css';


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
            } else if (formTitle === "Create a new Spot") {
                  const newSpot = await dispatch(createNewSpot(form))
                  form = newSpot
            }

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
            <form id='form-holder' onSubmit={submitForm}>
            <div id='form'>

                  <h2>{formTitle}</h2>
                  <div id='section1'>
                        <div id='sec1-1'>Where's your place located?</div>
                        <div id='sec1-2'>Guests will only get your exact address once they book a reservation.</div>
                  </div>

                  <div id="addressSection">
                        <label>
                              <div>Country</div>
                              <input id='formInput'
                                    type='text'
                                    placeholder='Country'
                                    value={country}
                                    onChange={(e)=>setCountry(e.target.value)}
                              />
                        </label>
                        <label>
                              <div>Street Address</div>
                              <input id='formInput'
                                    type='text'
                                    placeholder='Address'
                                    value={address}
                                    onChange={(e)=>setAddress(e.target.value)}
                              />
                        </label>
                        <label>
                              <div>City</div>
                              <input id='formInput'
                                    type='text'
                                    placeholder='City'
                                    value={city}
                                    onChange={(e)=>setCity(e.target.value)}
                              />
                        </label>
                        <label>
                              <div>State</div>
                              <input id='formInput'
                                    type='text'
                                    placeholder='State'
                                    value={state}
                                    onChange={(e)=>setState(e.target.value)}
                              />
                        </label>
                        <label>
                              <div>Latitude</div>
                              <input id='formInput'
                                    type='number'
                                    placeholder='Latitude'
                                    value={lat}
                                    onChange={(e)=>setLat(e.target.value)}
                              />
                        </label>
                        <label>
                              <div>Longitude</div>
                              <input id='formInput'
                                    type='number'
                                    placeholder='Longitude'
                                    value={lng}
                                    onChange={(e)=>setLng(e.target.value)}
                              />
                        </label>
                  </div>

                  <div id='section2'>
                        <div id='sec2-1'>Describe your place to guests</div>
                        <div id='sec2-2'>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</div>
                  </div>

                  <div id="descriptionSection">
                        <label>
                              <textarea id="descInput"
                                    type='text'
                                    placeholder='Please write at least 30 characters'
                                    value={description}
                                    onChange={(e)=>setDescription(e.target.value)}
                              />
                        </label>
                  </div>

                  <div id='section3'>
                        <div id='sec3-1'>Create a title for your Spot</div>
                        <div id='sec3-2'>Catch guests' attention with a spot title that highlights what makes your place special.</div>

                  </div>

                  <div id="nameSection">
                        <label>
                              <input id="nameInput"
                                    type='text'
                                    placeholder='Name of your spot'
                                    value={name}
                                    onChange={(e)=>setName(e.target.value)}
                              />
                        </label>
                  </div>

                  <div id='section4'>
                        <div id='sec4-1'>Set a base price for your spot</div>
                        <div id='sec4-2'>Competitive pricing can help your listing stand out and rank higher in search results.</div>
                  </div>

                  <div id="priceSection">
                        <label>
                              $
                              <input id='priceInput'
                                    type='number'
                                    placeholder='Price per night (USD)'
                                    value={price}
                                    onChange={(e)=>setPrice(e.target.value)}
                              />
                        </label>
                  </div>

                  <div id='subButt'>
                        <button id='formsubButt' type='submit'>{formTitle}</button>
                  </div>
            </div>

            </form>
      )

}
