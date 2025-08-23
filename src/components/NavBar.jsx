import CartWidget from './CartWidget'

const NavBar = () => {
  return (
    <header>
      <nav>
        <div className="logo">AYG Bombillas</div>
        <ul>
          <li><a href="#">Alpaca</a></li>
          <li><a href="#">Bronce</a></li>
          <li><a href="#">Cobre</a></li>
        </ul>
        <CartWidget />
      </nav>
    </header>
  )
}

export default NavBar
