import React from "react"
import { Link } from "gatsby"

const Header = ({ setMenu, setMouseHovered }) => {
  return (
    <header>
      <div className="container fluid">
        <div className="header-inner">
          <Link activeClassName="active" to="/">
            Pocket.
          </Link>
          <div
            className="hamburger-menu"
            onClick={() => setMenu(true)}
            onMouseEnter={() => setMouseHovered(true)}
            onMouseLeave={() => setMouseHovered(false)}
          >
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
