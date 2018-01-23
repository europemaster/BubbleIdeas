import React from "react";
import {Grid, Row, Col, Panel, FormGroup, FormControl, SplitButton} from "react-bootstrap";
import {DropdownButton, MenuItem} from "react-bootstrap";
import Devices from "../../stores/Devices";
import * as DeviceActions from "../../actions/DeviceActions";

export default class Basic extends React.Component {
  constructor(props) {
    super();
    this.state = {
      basicValues: Devices.getBasicValues(),
      inputValues: Devices.getInputValues(),
    }
  }

  componentWillMount() {
    Devices.on("change", () => {
      this.setState({
        devices: Devices.getAll(),
        selectedUuid: Devices.getSelected(),
        basicValues: Devices.getBasicValues(),
        inputValues: Devices.getInputValues(),
      });
    });
  }
  componentDidMount() {
    Devices.on("change", () => {
      this.setState({
        devices: Devices.getAll(),
        selectedUuid: Devices.getSelected(),
        basicValues: Devices.getBasicValues(),
        inputValues: Devices.getInputValues(),
      });
    });
  }

  showSysScreen() {
    var val= this.state.inputValues[49];
    if(val==1) {
      return "Battery";
    }
    else if(val==2) {
      return "Not connected";
    }
    else if(val==3) {
      return "Battery+Not connected";
    }
    else {
      return "Other value("+val+")";
    }
  }
  showTouchMode() {
    var val=this.state.inputValues[50];
    if(val==0) {
      return "OFF";
    }
    else if(val==1) {
      return "ON";
    }
    else if(val==3) {
      return "ON+Beep";
    }
    else {
      return "Other value("+val+")";
    }
  }
  showSleepMode() {
    var val= this.state.inputValues[52];
    if(val==0) {
      return "Enabled";
    }
    else if(val==1) {
      return "Disabled";
    }
    else {
      return "Other value("+val+")";
    }
  }

  handleHbt(e) {
    console.log("target: ",e.target.value);
    //console.log("Value is now: ",this.state.value);
    DeviceActions.replaceElement(29, e.target.value);

    console.log("Heartbeat is now: ",this.state.inputValues[29])
  }
  handleBat(e) {
    console.log("target: ",e.target.value);
    //console.log("Value is now: ",this.state.value);
    DeviceActions.replaceElement(38, e.target.value);
    console.log("Battery is now: ",this.state.inputValues[38])
  }
  handleSys(curInd, evt) {
    console.log("Current index is: ",curInd);
    DeviceActions.replaceElement(curInd, evt);
    console.log("Event is: ",evt);
    console.log("Eventin storage: ", this.state.inputValues[curInd]);
  }
  render() {
    const myStylee = {
      textAlign: "center",
      maxWidth: "98%"
    };
    const nameS = {
      width: "80%",
      marginLeft: "5%"
    };
    const valueS = {
      width: "90%",
      marginRight: "25%"
    };
    const panelS = {
      background: "#e6f9ff"
    };
    return (
      <div style={myStylee} >
        {/*Heartbeat*/}
        <Row>
          <Col lg={8}>
            <div style= {nameS}>
              <Panel style={panelS}>
                <big>Heartbeat </big>
              </Panel>
            </div>
          </Col>
          <Col lg={4}>
            <div style={valueS}>
              <FormGroup>
                <FormControl
                id="heartbeatInput"
                type="text"
                placeholder={this.state.inputValues[29]}
                onChange={this.handleHbt.bind(this)}
                />
              </FormGroup>
            </div>
          </Col>
        </Row>
        {/*Battery threshold*/}
        <Row>
          <Col lg={8}>
            <div style= {nameS}>
              <Panel style={panelS}>
                <big>Battery threshold</big>
              </Panel>
            </div>
          </Col>
          <Col lg={4}>
            <div style={valueS}>
              <FormGroup>
                <FormControl
                id="batteryInput"
                type="text"
                placeholder={this.state.inputValues[38]}
                onChange={this.handleBat.bind(this)}
                />
              </FormGroup>
            </div>
          </Col>
        </Row>
        {/*System screens*/}
        <Row>
          <Col lg={8}>
            <div style= {nameS}>
              <Panel style={panelS}>
                <big>System screens</big>
              </Panel>
            </div>
          </Col>
          <Col lg={4}>
            <div style={valueS}>
            <DropdownButton bsStyle="default" title={this.showSysScreen()}
            onSelect={this.handleSys.bind(this, 49)}
            id="systemInput">
              <MenuItem eventKey="1">Battery</MenuItem>
              <MenuItem eventKey="2">Not connected</MenuItem>
              <MenuItem eventKey="3">Both</MenuItem>
            </DropdownButton>

            </div>
          </Col>
        </Row>
        {/*Touch mode */}
        <Row>
          <Col lg={8}>
            <div style= {nameS}>
              <Panel style={panelS}>
                <big>Touch mode</big>
              </Panel>
            </div>
          </Col>
          <Col lg={4}>
            <div style={valueS}>
                <DropdownButton bsStyle="default" title={this.showTouchMode()}
                onSelect={this.handleSys.bind(this, 50)}
                id="touchInput">
                  <MenuItem eventKey="0">Off</MenuItem>
                  <MenuItem eventKey="1">On</MenuItem>
                  <MenuItem eventKey="3">On + Beep</MenuItem>
                </DropdownButton>
            </div>
          </Col>
        </Row>
        {/*Sleep mode */}
        <Row>
          <Col lg={8}>
            <div style= {nameS}>
              <Panel style={panelS}>
                <big>Sleep mode</big>
              </Panel>
            </div>
          </Col>
          <Col lg={4}>
            <div style={valueS}>
                <DropdownButton bsStyle="default" title={this.showSleepMode()}
                onSelect={this.handleSys.bind(this, 52)}
                id="sleepInput">
                  <MenuItem eventKey="0">Enabled</MenuItem>
                  <MenuItem eventKey="1">Disabled</MenuItem>
                </DropdownButton>
            </div>
          </Col>
        </Row>
        </div>
    );
  }
}
