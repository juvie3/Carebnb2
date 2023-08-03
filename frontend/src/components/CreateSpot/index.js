import { SpotForm } from "../SpotForm"

export const CreateSpot = () => {

      const createForm = {
            address: '',
            city: '',
            state: '',
            country: '',
            lat: '',
            lng: '',
            name: '',
            description: '',
            price: '',
            previewImage: '',
            image2: '',
            image3: '',
            image4: '',
            image5: ''
      }

      return (
            <SpotForm form={createForm} formTitle="Create a new Spot" />
      )

}
