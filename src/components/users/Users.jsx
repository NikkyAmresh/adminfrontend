import React from "react";
import { connect } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import TableContainer from "@mui/material/TableContainer";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import { getAllUsers, deleteUser } from "../../store/actions/appActions";

class Users extends React.Component {
  componentDidMount() {
    this.props.getAllUsers(1);
  }
  columns = [
    { field: "username", headerName: "Username", width: 100 },
    { field: "email", headerName: "Email", width: 160 },
    {
      field: "mobile",
      headerName: "Mobile",
      width: 100,
    },
    {
      field: "address",
      headerName: "Address",
      width: 150,
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      width: 150,
      renderCell: (params) => (
        <Stack
          direction="row"
          spacing={2}
          justifyContent="flex-end"
          alignItems="right"
        >
          <Button
            variant="outlined"
            onClick={() => {
              this.props.deleteUser(params.id);
            }}
            endIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </Stack>
      ),
    },
  ];

  render() {
    const users = this.props.users;
    return (
      <div>
        <TableContainer component={Paper}>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={users}
              columns={this.columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </div>
        </TableContainer>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.app.users,
    userCreated: state.app.userCreated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUsers: (page) => dispatch(getAllUsers(page)),
    deleteUser: (userId) => dispatch(deleteUser(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
