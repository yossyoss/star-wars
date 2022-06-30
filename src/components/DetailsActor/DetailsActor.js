import { useState, useEffect } from "react"
import { useParams } from "react-router"
import List from "../List/List.js"
import "./DetailsActor.css"
import Loader from "../Loader/Loader"
import udapatList from "../../utils/updateList"

import retrieveFilms from "../../fetch/retrieve-films"
import retrieveActors from "../../fetch/retrieve-actors"
import Button from "../../components/Button/Button"
import useLocalstorage from "../../hooks/useLocalstorage"

export default function DetailsActors({
  formSubmited,
  setOnFormSubmited,
  openEditModal,
  openAddNewModal,
  onEditClicked,
}) {
  const { actorId } = useParams()
  const [loading, setLoading] = useState(false)
  const [films, setFilms] = useState(null)
  const [originalServerData, setOriginalServerData] = useState(null)
  const [
    localStorageData,
    setLocalStorageData,
    getLocalStorageData,
    clearStorage,
  ] = useLocalstorage(actorId, [])

  useEffect(() => {
    setLoading(true)
    const getActor = async () => {
      const dataActor = await retrieveActors(actorId)

      const dataFilms = await retrieveFilms(dataActor.films)
      setOriginalServerData([...dataFilms])
      let udaptedFilms = udapatList(dataFilms, getLocalStorageData(actorId))

      setLocalStorageData(udaptedFilms)
      setFilms(udaptedFilms)
      setLoading(false)
    }
    getActor()
  }, [actorId])

  useEffect(() => {
    if (formSubmited) {
      setOnFormSubmited(false)
    }
    setFilms(getLocalStorageData(actorId))
  }, [localStorageData, formSubmited])

  const handleteDelete = (data) => {
    const clonedData = [...getLocalStorageData(actorId)]
    const updatedFilmList = clonedData.find((df) => df.url === data.url)
    updatedFilmList.deleted = true
    setLocalStorageData(clonedData)
  }

  const handleteEdit = (data) => {
    openEditModal(true)
    onEditClicked(data)
  }

  const handleAddMoreFilm = () => {
    openAddNewModal(true)
  }

  const handleClearStorage = () => {
    clearStorage(actorId)
    const original = originalServerData.map((item) => ({
      ...item,
      deleted: false,
    }))
    setLocalStorageData(original)
    setFilms(original)
  }

  if (loading) {
    return <Loader />
  }
  return (
    <>
      <div className='details'>
        <List
          list={films}
          page={"films"}
          onEditClicked={handleteEdit}
          onDeleteClicked={handleteDelete}
        />
        <div className='actions'>
          <Button
            open={handleAddMoreFilm}
            text={"ADD NEW FILM"}
            name={"action-button"}
          />
          <Button
            open={handleClearStorage}
            text={"RESET"}
            name={"action-button"}
          />
        </div>
      </div>
    </>
  )
}
