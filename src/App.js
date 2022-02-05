import HomePage from "./components/homepage/HomePage";
import "./styles.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignIn from "./components/auth/SignIn";
import { checkAuth } from "./store/actions/authActions";
import Navbar from "./components/layout/Navbar";
import React from "react";
import { connect } from "react-redux";

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(checkAuth());
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={SignIn} />
            <Route path="/home" component={HomePage} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
export default connect()(App);
