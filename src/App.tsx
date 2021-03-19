import React from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Game } from "./Game";
import { Home } from "./Home";

export default function App() {
  return (
    <div className="page-top">
      <header className="header">
        <a className="logo" href=".page-top">
          ABC Team
        </a>
        <input className="menu-btn" type="checkbox" id="menu-btn" />
        <label className="menu-icon" htmlFor="menu-btn">
          <span className="navicon"></span>
        </label>
        <ul className="menu">
          <li>
            <a href="#one" className="link link-theme link-arrow">
              Home
            </a>
          </li>
          <li>
            <a href="#two" className="link link-theme link-arrow">
              GAME
            </a>
          </li>
          <li>
            <a href="#three" className="link link-theme link-arrow">
              ABOUT
            </a>
          </li>
          <li>
            <a href="#four" className="link link-theme link-arrow">
              CONTACT
            </a>
          </li>
        </ul>
      </header>

      <div id="main" className="main">
        <section className="intro">
          <article className="container">
            <h1>
              Front-end <strong>Development</strong>
            </h1>

            <h2>
              Wanna craft the beautiful, responsive digital experiences you
              dream of ? We are here for you.
            </h2>

            <p>
              <a
                href=".footer"
                className="link link-theme link-arrow"
                title="Let’s Build Something Great"
              >
                LET’S BUILD SOMETHING GREAT
              </a>
            </p>
          </article>
        </section>

        <section className="work">
          <article className="container" id="one">
            <h2>The Gregor Samsa story</h2>

            <Home />
          </article>

          <article className="container" id="two">
            <h2>The Gregor Samsa story part two</h2>

            <Game />
          </article>

          <article className="container" id="three">
            <h2>The Gregor Samsa story part three</h2>

            <p>About team</p>
          </article>

          <article className="container" id="four">
            <h2>The Gregor Samsa story part four</h2>

            <p>
              “Something’s fallen down in there”, said the chief clerk in the
              room on the left.
            </p>
          </article>
        </section>

        <footer className="footer">
          <div className="container">
            <hr />
            <article className="foot-content-left">
              <ul>&copy;2016 by Pixel Strecher</ul>
            </article>

            <article className="foot-content">
              <ul>
                <li>
                  <a href="pixelstrecher@gmail.com">pixelstrecher@gmail.com</a>
                </li>
                <li className="social">
                  <a href="https://www.facebook.com/">Facebook</a>
                </li>
                <li className="social">
                  <a href="https://twitter.com/">Twitter</a>
                </li>
                <li className="social">
                  <a href="https://www.linkedin.com/company/">LinkedIn</a>
                </li>
              </ul>
            </article>
          </div>
        </footer>
      </div>
    </div>
  );
}
