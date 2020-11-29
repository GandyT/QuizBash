import React from "react";
import "./base.css";
import { Link } from 'react-router-dom'

export default class GameEnd extends React.Component {
    render() {
        return (
            <div className="background">
                <div className="centerbox">
                    <img className="gameendimage" src="https://i.imgur.com/9Q931PX.png"></img>
                    <h3 className="gamendtext">Game has ended!</h3>
                </div>
            </div>
        )
    }
}
