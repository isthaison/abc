import React from 'react'
import logo from './logo.svg';
import './Home.css';
export function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Nhóm  <code>ABC</code> never die.
        </p>
        <a
          className="App-link"
          href="/game"
          target="_blank"
          rel="noopener noreferrer"
        >
          Run
        </a>
      </header>
    </div>
  );
}
