import React from "react";
import "./base.css";
import { Link } from 'react-router-dom'

export default class VerifySuccess extends React.Component {
  render() {
    return (
      <div className="thewholebackground">
        <div className="theotherdiv">
          <img className="roundimage" src="https://i.imgur.com/IccB0h7.png"></img>
          <h3 className="sometext">Verified Success! Click the link below to return to home page!</h3>
          <Link className="sometext linkcolor" to="/"><h5 className="linkcolor">Click this link!</h5></Link>
        </div>
      </div>
    )
  }
}
