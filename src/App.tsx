import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";
import { Home } from './Home'
import { Game } from './Game'
import './App.css'

function About() {
    return <h2>About</h2>;
}

export default function App() {
    return (
        <Router>
            <body className="page-top">

                <header className="header">
                    <a className="logo" href=".page-top">ABC Team</a>
                    <input className="menu-btn" type="checkbox" id="menu-btn" />
                    <label className="menu-icon" htmlFor="menu-btn"><span className="navicon"></span></label>
                    <ul className="menu">
                        <li><a href="/" className="link link-theme link-arrow">Home</a></li>
                        <li><a href="/about" className="link link-theme link-arrow">About</a></li>
                        <li><a href="/game" className="link link-theme link-arrow">Game</a></li>
                    </ul>
                </header>


                <Switch>
                    <Route path="/about">
                        <About />
                    </Route>
                    <Route path="/game">
                        <Game />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </body>
        </Router>
    );
}
