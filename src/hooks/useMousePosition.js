import { useState, useEffect } from "react"

export default function useMousePosition() {
  let [mousePosition, setMousePosition] = useState({ x: null, y: null })

  useEffect(() => {
    function handleMousePosition(e) {
      setMousePosition({ x: e.pageX, y: e.pageY })
    }
    window.addEventListener("mousemove", handleMousePosition)
    return () => window.addEventListener("mousemove", handleMousePosition)
  }, [])
  return mousePosition
}
