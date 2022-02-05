import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { signOut } from "../../store/actions/authActions";

const SignedInLinks = (props) => {
  if (!(props.user && props.user.email)) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <ul className="right hide-on-small-only">
        <li>
          <a onClick={props.signOut}>Log Out</a>
        </li>
        <li>
          <button className="btn btn-floating pink lighten-1">
            {props.user.email[0]}
            {props.user.email[1]}
          </button>
        </li>
      </ul>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

export default connect(null, mapDispatchToProps)(SignedInLinks);
