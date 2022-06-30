import { useState, useEffect } from "react"

import "./Modal.css"
import "./Input.css"
import useLocalstorage from "../../hooks/useLocalstorage"
import ModalLogo from "../../assets/images/modal-logo.png"
import Button from "../Button/Button"
import { useLocation } from "react-router-dom"
import generateKey from "../../utils/getKeyGenrator"
export default function Modal({
  setOnFormSubmited,
  closeModal,
  isEdit,
  title,
  editFormData,
}) {
  const [filmName, setFilm] = useState("")
  const { pathname } = useLocation()
  const [localStorageData, setLocalStorageData] = useLocalstorage(
    pathname.substring(1)
  )
  useEffect(() => {
    if (isEdit) setFilm(editFormData.title)
  }, [isEdit])

  const handleSubmit = () => {
    let newArray
    if (isEdit) {
      newArray = [...localStorageData]
      let newForm = localStorageData.find(
        (data) => data.url === editFormData.url
      )
      newForm.title = filmName
    } else {
      newArray = [
        ...localStorageData,
        { title: filmName, url: generateKey(filmName) },
      ]
    }
    setLocalStorageData(newArray)
    setOnFormSubmited(true)
    closeModal(false)
  }
  return (
    <div className='modal'>
      <div className='modal-container'>
        <img src={ModalLogo} alt='' className='modal-logo' />
        <div className='modal-form'>
          <h2 className='modal-title'>{title}</h2>
          <input
            onChange={(e) => setFilm(e.target.value)}
            value={filmName}
            type='text'
            name='name'
            id='name'
            maxLength='60'
            className='input'
            placeholder={"film name"}
          />
        </div>
        <Button name={"form-submit"} open={handleSubmit} text={"Submit"} />
        <Button
          name={"modal-close"}
          open={() => closeModal(false)}
          text={"X"}
        />
      </div>
    </div>
  )
}
