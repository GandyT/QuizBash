import React from "react";
import "./base.css";
import { Link } from 'react-router-dom'

export default class VerifyFail extends React.Component {
  render() {
    return (
      <div className="thewholefuckingbackground">
        <div className="thefuckingotherdiv">
          <img className="fuckingroundimage" src="https://i.imgur.com/Y03QlRm.png"></img>
          <h3 className="verylongvariablethatyouwontbeabletounderstandasingletimebecauselongvariableequalsicannotgetfired">Verified Failed! Click the link below to return to home page!</h3>
          <Link className="verylongvariablethatyouwontbeabletounderstandasingletimebecauselongvariableequalsicannotgetfired linkcolor" to="/">
            <h5 className="linkcolor">Click this link!</h5>
          </Link>
        </div>
      </div>
    )
  }
}
