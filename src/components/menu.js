import React, { useState, useEffect, useRef } from "react"
import { Link } from "gatsby"
import { useLocation } from "@reach/router"
import { motion, AnimatePresence } from "framer-motion"
import { Image } from "../components/gatsby-images/image"
import { Close } from "../icons/icons.js"
import data from "../data/products.json"

//Transition
const transition = { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.9] }
//Variants
const titleSlideUp = {
  initial: { y: 200 },
  animate: { y: 0 },
}
const parent = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 1,
    },
  },
}
const maskAnimation = {
  initial: { width: "100%" },
  animate: { width: 0 },
}
const Menu = ({ menu, setMenu, x, y, setMouseHovered }) => {
  const location = useLocation()
  useEffect(() => {
    setMenu(false)
  }, [location])
  return (
    <>
      <AnimatePresence>
        {menu && (
          <>
            <motion.div
              className="projects"
              initial={{ visibility: "hidden" }}
              animate={{ visibility: "visible", transition: { delay: 1 } }}
              exit={{ visibility: "hidden", transition: { delay: 1 } }}
            >
              <div className="menu-title">Products</div>
              <div
                className="close"
                onClick={() => setMenu(false)}
                onMouseEnter={() => setMouseHovered(true)}
                onMouseLeave={() => setMouseHovered(false)}
              >
                <Close />
              </div>
              <div className="menu">
                <div className="container">
                  <div className="menu-inner">
                    <motion.ul
                      variants={parent}
                      initial="initial"
                      animate="animate"
                    >
                      {data.map(list => (
                        <List
                          key={list.id}
                          title={list.title}
                          imageData={list.src}
                          slug={list.id}
                          leftLineFlex={list.leftLineFlex}
                          rightLineFlex={list.rightLineFlex}
                          thumbnailPosition={list.thumbnailPosition}
                          setMouseHovered={setMouseHovered}
                          offset={list.offset}
                          x={x}
                          y={y}
                        />
                      ))}
                    </motion.ul>
                  </div>
                </div>
              </div>
            </motion.div>
            <Panels />
          </>
        )}
      </AnimatePresence>
    </>
  )
}

const List = ({
  title,
  imageData,
  slug,
  leftLineFlex,
  rightLineFlex,
  thumbnailPosition,
  setMouseHovered,
  offset,
  x,
  y,
}) => {
  const [hoverState, setHoverState] = useState(false)
  const list = useRef()
  const [hoverImgPosition, setHoverImgPosition] = useState({
    top: 0,
    left: 0,
  })
  useEffect(() => {
    setHoverImgPosition({
      top: list.current.getBoundingClientRect().top,
      left: list.current.getBoundingClientRect().left,
    })
  }, [hoverState])
  return (
    <motion.li ref={list}>
      <Link to={`/products/${slug}`}>
        <div className="wrapper">
          <div className={`line left flex-${leftLineFlex}`}>
            <motion.div
              className="mask left"
              variants={maskAnimation}
              transition={{ ...transition, duration: 1 }}
            ></motion.div>
          </div>
          <div className="title">
            <h2>
              <motion.div
                className="text"
                variants={titleSlideUp}
                onMouseEnter={() => setMouseHovered(true)}
                onMouseLeave={() => setMouseHovered(false)}
                onHoverStart={() => setHoverState(true)}
                onHoverEnd={() => setHoverState(false)}
              >
                {title}
              </motion.div>
            </h2>
          </div>
          <motion.div className="thumbnail" style={{ left: thumbnailPosition }}>
            <Image src={imageData} />
            <motion.div
              className="mask"
              variants={maskAnimation}
              transition={{ ...transition, duration: 1 }}
            ></motion.div>
          </motion.div>
          <motion.div
            className="floating-image"
            initial={{ opacity: 0 }}
            animate={{
              opacity: hoverState ? 1 : 0,
              x: x - hoverImgPosition.top + offset,
              y: y - hoverImgPosition.left,
            }}
            transition={{ ease: "linear" }}
          >
            <Image src={imageData} />
          </motion.div>
          <div className={`line right flex-${rightLineFlex}`}>
            <motion.div
              className="mask right"
              variants={maskAnimation}
              transition={{ ...transition, duration: 1 }}
            ></motion.div>
          </div>
        </div>
      </Link>
    </motion.li>
  )
}

const Panels = () => {
  return (
    <>
      <motion.div
        className="left-panel-background"
        initial={{ height: 0 }}
        animate={{ height: [0, window.innerHeight, 0], bottom: [null, 0, 0] }}
        exit={{ height: [0, window.innerHeight, 0], top: [null, 0, 0] }}
        transition={{ ...transition, duration: 2, times: [0, 0.5, 1] }}
      ></motion.div>
      <motion.div
        className="right-panel-background"
        initial={{ height: 0 }}
        animate={{
          height: [0, window.innerHeight, 0],
          bottom: [0, 0, window.innerHeight],
        }}
        exit={{
          height: [0, window.innerHeight, 0],
          top: [0, 0, window.innerHeight],
        }}
        transition={{ ...transition, duration: 2, times: [0, 0.5, 1] }}
      ></motion.div>
    </>
  )
}

export default Menu
