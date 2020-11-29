import React from "react";
import "./base.css";
import { Link } from 'react-router-dom'

export default class VerifyFail extends React.Component {
    render() {
        return (
            <div className="background">
            <div className="bar"><h3 className="top-text">Waiting Room</h3></div>
                <div className="add-bar">
                  <img className="spin" src="https://i.imgur.com/NAMu24E.png"></img>
                  <h3 className="generictext">Waiting for host to start!</h3>
                </div>
            </div>
        )
    }
}
