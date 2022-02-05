import React from "react";
import { connect } from "react-redux";
import "./homepage.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "./TabPanel";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import GroupIcon from "@mui/icons-material/Group";
import { getAllUsers } from "../../store/actions/appActions";
import { Redirect } from "react-router-dom";
import AddUser from "../users/AddUser";
import Users from "../users/Users";
class HomePage extends React.Component {
  state = {
    value: 0,
  };

  componentDidMount() {
    this.props.getAllUsers(1);
  }
  handleListAdd = () => {
    this.props.addList();
  };

  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };
  render() {
    const { user } = this.props;
    if (!user) return <Redirect to="/" />;
    console.log(this.props);
    return (
      <>
        <div className="homepage-container">
          <Tabs
            centered
            value={this.state.value}
            onChange={this.handleChange}
            aria-label="icon position tabs example"
          >
            <Tab
              icon={<PersonAddAltIcon />}
              iconPosition="start"
              label="Add User"
            />
            <Tab icon={<GroupIcon />} iconPosition="start" label="Users" />
          </Tabs>
          <TabPanel value={this.state.value} index={0}>
            <AddUser />
          </TabPanel>
          <TabPanel value={this.state.value} index={1}>
            <Users />
          </TabPanel>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    appState: state.app.appState,
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUsers: (page) => dispatch(getAllUsers(page)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
