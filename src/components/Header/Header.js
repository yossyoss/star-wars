import logo from "../../assets/images/logo.jpg"
import "./Header.css"

export default function Header() {
  return (
    <div className='container'>
      <header className='header'>
        <img src={logo} alt='Star Wars' className='header-logo' />
      </header>
    </div>
  )
}
