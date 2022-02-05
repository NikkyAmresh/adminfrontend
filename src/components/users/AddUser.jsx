import React from "react";
import { connect } from "react-redux";
import { addUser } from "../../store/actions/appActions";

class AddUser extends React.Component {
  state = {
    username: "",
    email: "",
    mobile: "",
    address: "",
  };
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  resetState = () => {
    this.setState({ username: "", email: "", mobile: "", address: "" });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addUser(this.state);
  };
  render() {
    let { creationErrors, userCreated } = this.props;
    let successMessage = null;
    if (userCreated) {
      creationErrors = [];
      successMessage = "User Successfully Created!";
    }
    return (
      <div>
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Add User</h5>
          <div className="input-field">
            <label htmlFor="username">User Name</label>
            <input
              type="text"
              id="username"
              pattern="^[a-zA-Z0-9]*$"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="mobile">Mobile</label>
            <input
              type="tel"
              id="mobile"
              pattern="[0-9]{10}"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="address">Address</label>
            <textarea
              className="materialize-textarea"
              id="address"
              onChange={this.handleChange}
              required
            />
          </div>

          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Add User</button>
            <div className="center red-text">
              {creationErrors.map((err, idx) => (
                <p key={idx}>{err}</p>
              ))}
            </div>
            <div className="center blue-text">
              {successMessage && <p>{successMessage}</p>}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    creationErrors: state.app.creationErrors,
    userCreated: state.app.userCreated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (user) => dispatch(addUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);
