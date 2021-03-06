import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { notify } from "../../../services/notify";
import Menu from "../../../components/generic/Menu";
import { isNotUserValid } from "../../../services/generic";
import Header from "../../../components/generic/Header";
import DeviceDetails from "../../../components/inventory/deviceDetails";
import * as actionsMyProfile from "../../../redux/myProfile/actions/myProfile";
import * as actions from '../../../redux/actions';
import * as actionsManageDevice from "../../../redux/inventory/actions/inventory";
import UnassignDevice from "../../../modules/inventory/components/UnassignDevice";
import AssignDevice from "../../../modules/inventory/components/AssignDevice";
import _ from "lodash";
import $ from 'jquery';

class MyInventory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: [],
      status_message: "",
      openUnassigned: false,
      openAssigned: false,
      user_profile_detail: {},
      user_assign_machine: [],
      device: [],
      unassignDeviceList: [],
      activeAuditId: "",
      auditMsg: "",
      activeItemName: "",
      show_alert_message: true,
      activeAudits: []
    };
    this.props.onIsAlreadyLogin();
    this.callUpdateUserDeviceDetails = this.callUpdateUserDeviceDetails.bind(
      this
    );
    this.unassignDevice = this.unassignDevice.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleAddDialog = this.handleAddDialog.bind(this);
    this.handleCloseAssign = this.handleCloseAssign.bind(this);
    this.callAddUserComment = this.callAddUserComment.bind(this);
    this.callAssignDevice = this.callAssignDevice.bind(this);
  }

  componentWillMount() {
    this.props.onUnassignDeviceList();
    this.props.onMyProfileDetails();
    this.props.onGetMyInventory();
  }
  componentWillReceiveProps(props) {
    let isNotValid = isNotUserValid(this.props.location.pathname, props.loggedUser);
    if (isNotValid.status && isNotValid.redirectTo !== '/my_inventory') {
      this.props.history.push(isNotValid.redirectTo);
    }
    this.setState({
      user_profile_detail: props.myProfile.user_profile_detail,
      user_assign_machine: props.myProfile.myInventory,
      show_alert_message: true
    });
    if (props && props.myProfile && props.myProfile.myInventory) {
      _.map(props.myProfile.myInventory, val => {
        if (!val.audit_current_month_status.status) {
          this.setState({ show_alert_message: false });
        }
      });
    }
  }

  callUpdateUserDeviceDetails(newDeviceDetails) {
    this.props.onUpdateDeviceDetails(newDeviceDetails);
  }
  callAssignDevice(assign_device) {
    this.props.onAssignDevice(assign_device).then(
      data => {
        this.props.onGetMyInventory();
        notify("Success!", data, "success");
      },
      error => {
        notify("Error!", error, "error");
      }
    );
  }
  unassignDevice(val) {
    this.setState({
      openUnassigned: true,
      status_message: "",
      device: val
    });
  }
  handleClose() {
    this.setState({
      openUnassigned: false,
      status_message: ""
    });
  }
  handleCloseAssign() {
    this.setState({
      openAssigned: false,
      status_message: ""
    });
  }
  handleAddDialog() {
    this.setState({
      user_id: this.props.loggedUser.data.id,
      unassignDeviceList: this.props.unassignedDeviceList.unassignedDeviceList,
      openAssigned: true,
      status_message: ""
    });
  }
  callAddUserComment(addUserCommentDetails) {
    this.props.onAddUserComment(addUserCommentDetails);
    this.setState({
      openUnassigned: false,
      status_message: ""
    });
  }
  handleAuditClick = val => {
    this.setState({
      activeAuditId: val.id,
      activeItemName: val.machine_name
    });
  };
  handleAuditSubmit = (activeAuditId, auditMsg) => {
    const activeBtn = this.state.activeAudits.concat(activeAuditId);
    this.setState({
      activeAudits: activeBtn
    });
    $("#modalAudit").modal("hide");
    this.props
      .onAddAuditComment(activeAuditId, auditMsg)
      .then(res => {
        this.props.onGetMyInventory();
      })
      .catch(() => {
        const remainActive = _.filter(this.state.activeAudits, function(n) {          
          return n !== activeAuditId;
        });        
        this.setState({
          activeAudits: remainActive
        });
      });
    this.setState({
      auditMsg: ""
    });
  };
  render() {
    const {
      auditMsg,
      activeAuditId,
      activeItemName,
      show_alert_message
    } = this.state;
    return (
      <div>
        <Menu {...this.props} />
        <div id="content" className="app-content box-shadow-z0" role="main">
          <Header pageTitle={"My Inventory"} {...this.props} />
          <div id="modalAudit" className="modal" data-backdrop="true">
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <div>
                    <div className="col-xs-11">
                      <h5 className="modal-title">Audit of {activeItemName}</h5>
                    </div>
                    <div className="col-xs-1">
                      <button
                        className="btn btn-icon white"
                        data-dismiss="modal"
                      >
                        <i className="fa fa-remove" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="modal-body p-lg">
                  <div className="form-group row">
                    <label className="col-sm-2 form-control-label">
                      Message
                    </label>
                    <div className="col-sm-9">
                      <small className="text-red-np">
                        <i>
                          Add a short description about inventory. Eg. Working
                          fine, keys not working, etc.
                        </i>
                      </small>
                      <input
                        type="text"
                        className="form-control"
                        value={auditMsg}
                        onChange={e =>
                          this.setState({
                            auditMsg: e.target.value
                          })
                        }
                        onKeyUp={e => {
                          if (e.keyCode === 13) {
                            if (auditMsg != "") {
                              this.handleAuditSubmit(activeAuditId, auditMsg);
                            }
                          }
                        }}
                        required
                      />
                      {auditMsg === "" ? (
                        <small className="text-red-np">
                          {" "}
                          Please write something
                        </small>
                      ) : null}
                    </div>
                  </div>
                  <div className="form-group row m-t-md">
                    <div className="col-sm-10">
                      <button
                        className="md-btn md-raised m-b-sm w-xs blue"
                        onClick={() => {
                          if (auditMsg != "") {
                            this.handleAuditSubmit(activeAuditId, auditMsg);
                          }
                        }}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="app-body" id="view">
            <div className="padding">
              <div className="row no-gutter">
                {!show_alert_message ? (
                  <div className="col-xs-12 text-red bg-white">
                    <h6>Important:</h6>
                    <h6>-Your monthly audit of inventories is pending.</h6>
                    <h6>
                      -Click on Audit Pending button to do audit of an
                      inventory.
                    </h6>
                    <h6>
                      -Once you are done with all the inventories you will be
                      able to access rest of HR app.
                    </h6>
                  </div>
                ) : null}
              </div>
              <AssignDevice
                handleCloseAssign={this.handleCloseAssign}
                openAssign={this.state.openAssigned}
                handleAddDialog={this.handleAddDialog}
                unassignDeviceList={this.state.unassignDeviceList}
                callAssignDevice={this.callAssignDevice}
                user_id={this.state.user_id}
                loggedUser={this.props.loggedUser}
              />
              <DeviceDetails
                unassignDevice={this.unassignDevice}
                userAssignMachine={this.state.user_assign_machine}
                callUpdateUserDeviceDetails={this.callUpdateUserDeviceDetails}
                loggedUser={this.props.loggedUser}
                handleAuditClick={this.handleAuditClick}
                activeAuditId={this.state.activeAuditId}
                activeAudits={this.state.activeAudits}
                showPending={this.props.showPending}
              />
            </div>
            <UnassignDevice
              callAddUserComment={this.callAddUserComment}
              user_Id={this.state.user_profile_detail.user_Id}
              handleClose={this.handleClose}
              open={this.state.openUnassigned}
              device={this.state.device}
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) { 
  return {
    frontend: state.frontend.toJS(),
    loggedUser: state.logged_user.userLogin,
    myProfile: state.myProfile.toJS(),
    unassignedDeviceList: state.manageDevice.toJS(),
    showPending: state.myProfile.toJS().showPending
  };
}
const mapDispatchToProps = dispatch => {
  return {
    onIsAlreadyLogin: () => {
      return dispatch(actions.isAlreadyLogin());
    },
    onAddAuditComment: (id, msg) => {
      return dispatch(actionsMyProfile.addInventoryAudit(id, msg));
    },
    onMyProfileDetails: () => {
      return dispatch(actionsMyProfile.getMyProfileDetails());
    },
    onUpdateDeviceDetails: newDeviceDetails => {
      return dispatch(
        // actionsMyProfile.updateUserDeviceDetails(newDeviceDetails)
      );
    },
    onAddUserComment: addUserCommentDetails => {
      return dispatch(
        actionsManageDevice.addUserComment(addUserCommentDetails)
      );
    },
    onUnassignDeviceList: () => {
      return dispatch(actionsManageDevice.unassignDeviceList());
    },
    onAssignDevice: assign_device => {
      return dispatch(actionsManageDevice.assignDevice(assign_device));
    },
    onGetMyInventory: () => {
      return dispatch(actionsMyProfile.getMyInventory());
    }
  };
};

const RouterVisibleMyInventory = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MyInventory)
);

export default RouterVisibleMyInventory;
