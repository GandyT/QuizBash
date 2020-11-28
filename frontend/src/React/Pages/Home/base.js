import React from "react";
import "./base.css";

export default class Home extends React.Component {
    render() {
        // Whatever HTML for "HOME" goes in here
        // btw to give things a class it's className and not class in react
        return (
            <div>
                <img className="banner-img"src="https://i.imgur.com/Wv7XJ9f.jpg" alt="landscape"></img>
                <div className="banner-text">
                <h1 className="title">QuizBash</h1>
                </div>
                <div className="buttons">
                    <button className="login">Login</button>
                    <button className="signup">Signup</button>
                </div>
                <div className="text-area">
                    <div className="welcome-msg">
                        <h3>What is QuizBash?</h3>
                        <p>Quizbash is an app that empowers students and teachers, allowing them to easily review material and remember it through the form of quizzes.
                        </p>
                    </div>
                    <div>
                    <section className = "card">
                        <img src="https://i.imgur.com/nMeKSqm.png" alt="study"></img>
                        <div>
                            <h2>Not Your Average App</h2>
                            <p>Instead of having students stare at their notes for hours on end, where they could easily be distracted, teachers can place their students in a fun, game-like enviornment, where they have to choose the correct answers from the questions given. Teachers are free to customize these questions to their liking. Competition breeds excellence!
                            </p>
                        </div>
                    </section>
                    <section className = "card">
                        <img src="https://i.imgur.com/9qRnH8T.png" alt="study"></img>
                        <div>
                            <h2>Statistics & Anti-Cheat</h2>
                            <p>After each and every session, teachers can view the stats and performance of their class, to get an idea of how well their students are doing. We have an anti-cheat system, which prevents window switching, resizing..etc. Our anti-cheat system also decreases the risk of inaccurate statistics. Teachers will be alerted if a student performs any activity that triggers the system. 
                            </p>
                        </div>
                    </section>
                    <section className = "card">
                        <img src="https://i.imgur.com/rMphApy.png" alt="study"></img>
                        <div>
                            <h2>Simple, Easy To Use Interface</h2>
                            <p>Our user interface is simple, it doesn't matter if you might not be the the best at technology, you will be able to use our app! Simply create a room, make questions, get people to join, and you are ready to go!
                            </p>
                        </div>
                    </section>
                    </div>
                    <footer>
                        <div>
                        <hr></hr>
                        <br></br>
                        <h3>Our Team:</h3>
                        <p>Henry Zheng, Youwei (Anthony) Zhen, Randy Sim</p>
                        </div>
                    </footer>
                </div>
            </div>
        )
    }
}