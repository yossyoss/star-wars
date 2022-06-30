import { Link } from "react-router-dom"
import generateKey from "../../utils/getKeyGenrator"
import "./List.css"

export default function List({ list, page, onEditClicked, onDeleteClicked }) {
  return (
    <ul className='list'>
      <li className=''>
        <h3>{page.toUpperCase()}</h3>
      </li>

      {list &&
        page === "films" &&
        list.map((film) => {
          if (film.deleted) return null
          let key = film.url
          return (
            <li key={key} className='list-item'>
              <h3 key={key} className=' list-film list-film-container'>
                <div className='list-film content'>{film.title}</div>
                <div
                  className='list-film action edit'
                  onClick={() => onEditClicked(film)}
                >
                  edit
                </div>
                <div
                  className='list-film action remove'
                  onClick={() => onDeleteClicked(film)}
                >
                  delete
                </div>
              </h3>
            </li>
          )
        })}
      {list &&
        page === "actors" &&
        list.map((actor) => {
          return (
            <li key={actor.name} className='list-item list-item-actor'>
              <Link to={`/${actor.url.match(/[0-9]+/)}`}>
                <h3>{actor.name}</h3>
              </Link>
            </li>
          )
        })}
    </ul>
  )
}
