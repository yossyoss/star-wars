import "./Loader.css"
import spinnerLight from "../../assets/star-wars.svg"
const Loader = ({ spinner }) => {
  return (
    <div className='loader'>
      <img src={spinnerLight} className={"spinner"} alt='loading...' />
    </div>
  )
}

export default Loader
