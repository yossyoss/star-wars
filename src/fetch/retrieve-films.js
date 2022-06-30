import getData from "../utils/getData"

const retrieveFilms = async (array) => {
  let dataList = []
  for (let url of array) {
    dataList = [...dataList, await getData(url)]
  }
  return dataList
}

export default retrieveFilms
