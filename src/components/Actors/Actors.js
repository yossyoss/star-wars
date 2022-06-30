import { useState, useEffect } from "react"

import "./Actors.css"
import Loader from "../Loader/Loader"
import List from "../../components/List/List"
import Button from "../../components/Button/Button"
import retrieveActors from "../../fetch/retrieve-actors"
import getData from "../../utils/getData"
import { Outlet } from "react-router-dom"

export default function Actors() {
  const [actorsList, setActorsList] = useState(null)
  const [page, setPage] = useState()
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const getActors = async () => {
      const res = await retrieveActors()

      setActorsList(res.results)
      setPage(res.next)
      setCount(res.count)
      setLoading(false)
    }
    getActors()
  }, [])

  const handleShowMoreActors = async () => {
    if (page) {
      const res = await getData(page)
      setActorsList([...actorsList, ...res.results])
      setPage(res.next)
    }
  }

  const handleScrollTop = () => {
    window.scrollTo(0, 0)
  }
  if (loading) {
    return <Loader />
  }
  return (
    <>
      {actorsList && (
        <div className='people'>
          <List list={actorsList} page={"actors"} />
          {actorsList.length < count ? (
            <Button
              open={handleShowMoreActors}
              text={"VIEW MORE"}
              name={"action-button"}
            />
          ) : (
            <Button
              open={handleScrollTop}
              text={"BACK TO TOP"}
              name={"action-button"}
            />
          )}
        </div>
      )}
      <Outlet />
    </>
  )
}
