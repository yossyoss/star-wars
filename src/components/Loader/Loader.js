import "./Loader.css"

const Loader = ({ spinner }) => {
  return (
    <div className='loader'>
      <img src={spinner} className={"spinner"} alt='loading...' />
    </div>
  )
}

export default Loader
