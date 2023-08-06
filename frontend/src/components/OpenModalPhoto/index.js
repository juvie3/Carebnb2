import React from "react";
import { useModal } from "../../context/Modal";
import './openModalPhoto.css'

function OpenModalPhoto({
  modalComponent, // component to render inside the modal
  image, // img src
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (typeof onButtonClick === "function") onButtonClick();
    if (typeof onModalClose === "function") setOnModalClose(onModalClose);
    setModalContent(modalComponent);
  };

  return <img id='modalPhoto' onClick={onClick} src={image} />;
}

export default OpenModalPhoto;
