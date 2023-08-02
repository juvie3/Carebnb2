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
            price: ''

      }

      return (
            <SpotForm form={createForm} formTitle="Create a New Spot" />
      )

}
