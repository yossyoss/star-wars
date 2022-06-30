const udapatList = (serverData, localStorageData) => {
  return serverData.map((film) => {
    let found = localStorageData.find((actorData) => film.url === actorData.url)
    if (!found) return film
    if (found.title !== film.title) {
      film.title = found.title
    }
    if (found.deleted) {
      film.deleted = found.deleted
    }
    return film
  })
}
export default udapatList
