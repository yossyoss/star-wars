import getData from "../utils/getData"

let initialActorsUrl = "https://swapi.dev/api/people/"

const retrieveActors = async (actorId) => {
  if (actorId) initialActorsUrl = `initialActorsUrl${actorId}`
  return await getData(initialActorsUrl)
}

export default retrieveActors
