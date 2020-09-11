import React, { useState } from "react"
import PropTypes from "prop-types"
import { motion } from "framer-motion"
import useMousePosition from "../hooks/useMousePosition"
import { useStaticQuery, graphql } from "gatsby"
//Menu
import Menu from "./menu"
//Components
import Header from "./header"
//Test Component Here: if necessary
//Styles
import "../styles/App.scss"

const Layout = ({ children }) => {
  const { x, y } = useMousePosition()
  const [menu, setMenu] = useState(false)
  const [mouseHovered, setMouseHovered] = useState(false)
  const siteData = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div className="app">
      <motion.div
        className="cursor"
        initial={{ opacity: 1 }}
        animate={{
          x: x - 16,
          y: y - 16,
          scale: mouseHovered ? 1.3 : 1,
          opacity: mouseHovered ? 0.7 : 1,
        }}
        transition={{ ease: "linear", duration: 0.1 }}
      ></motion.div>
      <Header
        siteTitle={siteData.site.siteMetadata.title}
        setMenu={setMenu}
        setMouseHovered={setMouseHovered}
      />
      <Menu
        menu={menu}
        setMenu={setMenu}
        x={x}
        y={y}
        setMouseHovered={setMouseHovered}
      />
      <div>
        <main>{children}</main>
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
