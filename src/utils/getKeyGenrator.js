const generateKey = (param) => {
  return `${param}_${new Date().getTime()}`
}

export default generateKey
