import './photoModal.css'


export const PhotoModal = ({src}) => {

      console.log('src', src);
      return (
            <img id='modalPhotoSize' src={src} />
      )

}
