import React from "react";
import {Panel, Button, Badge} from "react-bootstrap";
import Devices from "../../stores/Devices";
import * as DeviceActions from "../../actions/DeviceActions";

export default class UuidEl extends React.Component {
  constructor(props) {
    super();
    this.state = {
      finished: Devices.getFinished(),
      devices: Devices.getAll(),
      selectedUuid : Devices.getSelected(),
      basicValues: Devices.getBasicValues(),
      online: Devices.getOnline(),
    };
  }

  render() {
    const device   = this.props.uuid;
    const key = this.props.key;

    const ind = this.props.ind;
    //orange
    const panelS = {
      borderColor: "#ffffff"
    }
    const mySCharging = {
      background:"#ffa31a",
      color: "white",
      width: "100%",
      height: "100%",
      marginTop: "5%"
    };
    //green
    const mySOnline = {
      background:"#009900",
      color: "white",
      width: "100%",
      height: "100%",
      marginTop: "5%"
    };
    //gray
    const mySOffline = {
      background:"#666666",
      color: "white",
      width: "100%",
      height: "100%",
      marginTop: "5%"
    };
    //purple
    const mySSending = {
      background:"#e0ccff",
      color: "white",
      width: "100%",
      height: "100%",
      marginTop: "5%"
    };
    //console.log("Online?: ",state);
    if(this.state.online[ind] == "charging") {
      var myButton =< Button style={mySCharging} onClick={this.props.onClick} >
                      <div>{device}  <Badge>Charging</Badge></div>
                    < /Button>;
    }
    else if(this.state.online[ind] == "online") {
      var myButton =< Button style={mySOnline} onClick={this.props.onClick} >
                      <div>{device} <Badge>Online</Badge></div>
                    < /Button>;
    }
    else if(this.state.online[ind] == "sending") {
      var myButton =< Button style={mySSending} onClick={this.props.onClick} >
                      <div>{device} <Badge>Sending</Badge></div>
                    < /Button>;
    }
    else {
      var myButton =< Button style={mySOffline} onClick={this.props.onClick} >
                      <div>{device} <Badge>Offline</Badge></div>
                    < /Button>;
    }


    return (
      <div>
        {myButton}
      </div>
    );
  }
}
