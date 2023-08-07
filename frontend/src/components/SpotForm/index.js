import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchAddSpotImage, fetchCreateNewSpot, fetchUpdateSpot } from '../../store/spotsReducer';
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
      const [previewImage, setPreviewImage] = useState(form.SpotImages? form.SpotImages[0]? form.SpotImages[0] : '' : '');
      const [image2, setImage2] = useState(form.SpotImages? form.SpotImages[1]? form.SpotImages[1] : '' : '');
      const [image3, setImage3] = useState(form.SpotImages? form.SpotImages[2]? form.SpotImages[2] : '' : '');
      const [image4, setImage4] = useState(form.SpotImages? form.SpotImages[3]? form.SpotImages[3] : '' : '');
      const [image5, setImage5] = useState(form.SpotImages? form.SpotImages[4]? form.SpotImages[4] : '' : '');


      const [errorMessages, setErrorMessages] = useState({});
      const dispatch = useDispatch();
      const history = useHistory();


      const submitForm = async (e) => {
            e.preventDefault();
            setErrorMessages({});

            form = { ...form, address, city, state, country, lat, lng, name, description, price };


            if (formTitle === "Update Spot") {

                  try {
                        const updatedSpot = await dispatch(fetchUpdateSpot(form))
                        form = updatedSpot;

                        history.replace(`/spots/${form.id}`)

                  } catch (error) {
                        const res = await error.json()
                        setErrorMessages({...res.errors})
                        console.error(error);
                  }


            } else if (formTitle === "Create a new Spot") {

                  try {
                        const newSpot = await dispatch(fetchCreateNewSpot(form))
                        form = newSpot

                        if (previewImage !== '') {
                              const imageObj = { spotId: form.singleSpot.id, url: previewImage.url, preview: true}
                              await dispatch(fetchAddSpotImage(imageObj))
                        }

                        if (image2 !== '') {
                              const imageObj = { spotId: form.singleSpot.id, url: image2.url, preview: false}
                              await dispatch(fetchAddSpotImage(imageObj))
                        }

                        if (image3 !== '') {
                              const imageObj = { spotId: form.singleSpot.id, url: image3.url, preview: false}
                              await dispatch(fetchAddSpotImage(imageObj))
                        }

                        if (image4 !== '') {
                              const imageObj = { spotId: form.singleSpot.id, url: image4.url, preview: false}
                              await dispatch(fetchAddSpotImage(imageObj))
                        }

                        if (image5 !== '') {
                              const imageObj = { spotId: form.singleSpot.id, url: image5.url, preview: false}
                              await dispatch(fetchAddSpotImage(imageObj))
                        }

                        history.replace(`/spots/${form.singleSpot.id}`)

                  } catch (error) {
                        const res = await error.json()
                        setErrorMessages({...res.errors})
                        console.error(error);
                  }

            }



      }

      if (formTitle === "Create a new Spot") {

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
                                    {errorMessages.country && <div className="errorr-spot">Country is required</div>}
                                    <input id='formInput'
                                          type='text'
                                          placeholder='Country'
                                          value={country}
                                          onChange={(e)=>setCountry(e.target.value)}
                                    />
                              </label>

                              <label>
                                    <div>Street Address</div>
                                    {errorMessages.address && <div className="errorr-spot">Address is required</div>}
                                    <input id='formInput'
                                          type='text'
                                          placeholder='Address'
                                          value={address}
                                          onChange={(e)=>setAddress(e.target.value)}
                                    />
                              </label>

                              <label>
                                    <div>City</div>
                                    {errorMessages.city && <div className="errorr-spot">City is required</div>}
                                    <input id='formInput'
                                          type='text'
                                          placeholder='City'
                                          value={city}
                                          onChange={(e)=>setCity(e.target.value)}
                                    />
                              </label>

                              <label>
                                    <div>State</div>
                                    {errorMessages.state && <div className="errorr-spot">State is required</div>}
                                    <input id='formInput'
                                          type='text'
                                          placeholder='State'
                                          value={state}
                                          onChange={(e)=>setState(e.target.value)}
                                    />
                              </label>

                              <label>
                                    <div>Latitude</div>
                                    {errorMessages.lat && <div className="errorr-spot">Please keep "latitude" range between -90 and 90</div>}
                                    <input id='formInput'
                                          type='number'
                                          placeholder='Latitude'
                                          value={lat}
                                          onChange={(e)=>setLat(e.target.value)}
                                          required
                                    />
                              </label>

                              <label>
                                    <div>Longitude</div>
                                    {errorMessages.lng && <div className="errorr-spot">Please keep "longitude" range between -180 and 180</div>}
                                    <input id='formInput'
                                          type='number'
                                          placeholder='Longitude'
                                          value={lng}
                                          onChange={(e)=>setLng(e.target.value)}
                                          required
                                    />
                              </label>

                        </div>

                        <div id='section2'>
                              <div id='sec2-1'>Describe your place to guests</div>
                              <div id='sec2-2'>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</div>
                        </div>
                        <div id="descriptionSection">
                        {errorMessages.description && <div className="errorr-spot">Description needs a minimum of 30 characters</div>}
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
                              <div id='sec3-1'>Create a title for your spot</div>
                              <div id='sec3-2'>Catch guests' attention with a spot title that highlights what makes your place special.</div>
                        </div>
                        <div id="nameSection">
                        {errorMessages.name && <div className="errorr-spot">Name is required</div>}
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
                        {errorMessages.price && <div className="errorr-spot">Price is required</div>}
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

                        <div id='section5'>
                              <div id='sec5-1'>Liven up your spot with photos</div>
                              <div id='sec5-2'>Submit a link to at least one photo to publish your spot</div>
                        </div>
                        <div id='imageSection'>
                              <label>
                                    <input className='image-form'
                                          type='text'
                                          placeholder='Preview Image URL ending in .png .jpg or .jpeg (Required)'
                                          value={previewImage.url}
                                          onChange={(e)=>setPreviewImage({...previewImage, url: e.target.value})}
                                          pattern='^http.*\.(png|jpg|jpeg)$'
                                          required
                                    />
                              </label>
                              <label>
                                    <input className='image-form'
                                          type='text'
                                          placeholder='Image URL ending in .png .jpg or .jpeg (optional)'
                                          value={image2.url}
                                          onChange={(e)=>setImage2({...image2, url: e.target.value})}
                                          pattern='^http.*\.(png|jpg|jpeg)$'
                                    />
                              </label>
                              <label>
                                    <input className='image-form'
                                          type='text'
                                          placeholder='Image URL ending in .png .jpg or .jpeg (optional)'
                                          value={image3.url}
                                          onChange={(e)=>setImage3({...image3, url: e.target.value})}
                                          pattern='^http.*\.(png|jpg|jpeg)$'
                                    />
                              </label>
                              <label>
                                    <input className='image-form'
                                          type='text'
                                          placeholder='Image URL ending in .png .jpg or .jpeg (optional)'
                                          value={image4.url}
                                          onChange={(e)=>setImage4({...image4, url: e.target.value})}
                                          pattern='^http.*\.(png|jpg|jpeg)$'
                                    />
                              </label>
                              <label>
                                    <input className='image-form'
                                          type='text'
                                          placeholder='Image URL ending in .png .jpg or .jpeg (optional)'
                                          value={image5.url}
                                          onChange={(e)=>setImage5({...image5, url: e.target.value})}
                                          pattern='^http.*\.(png|jpg|jpeg)$'
                                    />
                              </label>
                        </div>





                        <div id='subButt'>
                              <button id='formsubButt' disabled={!country} type='submit'>Create Spot</button>
                        </div>
                  </div>

                  </form>
            )

      } else {

            return (
                  <form id='form-holder' onSubmit={submitForm}>
                  <div id='form'>

                        <h2>Update your Spot</h2>

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
                              <button id='formsubButt' type='submit'>Update your Spot</button>
                        </div>
                  </div>

                  </form>
            )



      }


}
