import React from "react";
import "./base.css";
import { Link } from 'react-router-dom'

export default class WaitingForStudent extends React.Component {
    render() {
        return (
            <div className="background">
                <div className="centerbox outdiv">
                    <h3 className="gamendtext">Waiting for students to finish...!</h3>
                    <div className="circles"></div>
                    <div className="circles"></div>
                    <div className="circles"></div>
                    <div className="circles"></div>
                    <div className="circles"></div>
                    <div className="circles"></div>
                </div>
            </div>
        )
    }
}
