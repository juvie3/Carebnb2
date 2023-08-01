import { SpotForm } from "../SpotForm"

export const CreateSpot = () => {

      const createForm = {
            address: '',
            city: '',
            state: '',
            country: '',
            lat: null,
            lng: null,
            name: '',
            description: '',
            price: 0

      }

      return (
            <SpotForm form={createForm} formTitle="Create a New Spot" />
      )

}
