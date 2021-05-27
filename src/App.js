import React from "react";
import "./styles/app.css";
import Home from "./components/Home";
import Container from "./components/Container";
import Header from "./components/Header";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <br></br>
        <nav>
          <ul className="nav">
            <li>
              <Link className="link" to="/">
                <p>Home</p>
              </Link>
            </li>
            <li>
              <Link className="link" to="/container">
                <p>Show results</p>
              </Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/container">
            <Container />
          </Route>

          <Route path="/">
            <Home />
          </Route>
        </Switch>
        <footer className="footer" />
      </div>
    </Router>
  );
}

export default App;
