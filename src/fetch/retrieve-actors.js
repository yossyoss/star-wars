import getData from "../utils/getData"
const initialActorsUrl = "https://swapi.dev/api/people/"

const retrieveActors = async (actorId) => {
  if (actorId) return await getData(`${initialActorsUrl}${actorId}`)
  return await getData(initialActorsUrl)
}

export default retrieveActors
