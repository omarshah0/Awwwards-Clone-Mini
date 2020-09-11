import React from "react"
import "./test.css"
function test() {
  return (
    <div className="test">
      <div className="singlePost">
        <div className="left-line"></div>
        <h2 className="title">Air Max 90</h2>
        <div className="right-line"></div>
        <div className="image">
          <h3>Image</h3>
        </div>
      </div>
      <div className="singlePost">
        <div className="left-line" style={{ flex: 0.3 }}></div>
        <h2 className="title">Geezy M90</h2>
        <div className="right-line" style={{ flex: 0.7 }}></div>
        <div className="image">
          <h3>Image</h3>
        </div>
      </div>
      <div className="singlePost">
        <div className="left-line" style={{ flex: 0.6 }}></div>
        <h2 className="title">Meezy M90</h2>
        <div className="right-line" style={{ flex: 0.4 }}></div>
        <div className="image">
          <h3>Image</h3>
        </div>
      </div>
    </div>
  )
}

export default test
