import React from "react";

import Basic from "./Right/Basic";
import Advanced from "./Right/Advanced";
import RightLabel from "./Right/RightLabel";
import Base64 from "base-64";
import Utf8 from "utf8";
import CryptoJS from "crypto-js";
import {Grid, Row, Col, PageHeader, Button, Panel} from "react-bootstrap";

import Devices from "../stores/Devices";
import * as DeviceActions from "../actions/DeviceActions";

export default class RightPane extends React.Component {
  constructor(props) {
    super(props)
    this.state ={
      myState: true,
      finished: Devices.getFinished(),
      devices: Devices.getAll(),
      selectedUuid: Devices.getSelected(),
      basicValues: Devices.getBasicValues(),
      inputValues: Devices.getInputValues(),
      sentValues: "",
    };
  }

  componentWillMount() {
    Devices.on("change", () => {
      this.setState({
        finished: Devices.getFinished(),
        selectedUuid: Devices.getSelected(),
        inputValues: Devices.getInputValues(),
        sentValues: "",
      });
    });
  }
  renderBasic(myState) {
    this.setState( {
      myState: false
    });
  }

  renderAdvanced(myState) {
    this.setState( {
      myState: true
    });
  }

  readCommand(uuid, type, index) {
    var apiKey = "14e5b1ae5f51284b";
    var apisecret = "/Qm8TcrgIahViSrIq/5TWfMMgFZEnre6B8g51MuTaOE";
    var d = new Date();
    var nd = d.toUTCString();
    var self = this;
    var key2 ="POST\n\n" + "application/json" + "\n" + nd + "\n/api/cmd/Param/"+uuid;

    var toSha2=CryptoJS.HmacSHA256(key2, apisecret);

    var encodedHeader2 = CryptoJS.enc.Base64.stringify(toSha2);

    var auth2 =apiKey+":"+encodedHeader2;


    var headers2 = new Headers();
    headers2.append("Content-Type", "application/json");
    headers2.append("Authorization", auth2);
    headers2.append("X-Date", nd);
    //console.log("Type is: ",type);
    var myBody = {"Data" : [{"Control":0, "Type": type, "Value": ""}]}; // change myBody to match api/session with correct data in url parameter
    var sBody = JSON.stringify(myBody);

    ////////////////////// fetch2 ///////////////////////
    fetch("http://192.168.101.55:8081/api/cmd/Param/"+uuid, {  //use url/api/session/uuid
        method: "POST", // use PUT
        headers : headers2,
        body: sBody
    }).then(function(response) {
      return response.json();
    }).then(function(json){
      // console.log("Response: ", json);
      //console.log("Uuid ", uuid);
      var val = json[uuid][0].Value;
      console.log("TCLV OBJECT type: ",json[uuid][0].Type," Value: ", json[uuid][0].Value);
        if(Devices.getLen() < 90 ) {
          DeviceActions.setBasicValues(val);
          DeviceActions.setInputValues(val);
          var count=index+1;
          var nexType=type+1;
          self.readCommand(uuid, nexType, count);
      }
      //console.log("TCLV read: ",JSON.stringify(json));
    }).catch(function(err) {
      console.log("err: ",err);
    });

  }
  sendCommand(uuid, type, value) {
    var apiKey = "14e5b1ae5f51284b";
    var apisecret = "/Qm8TcrgIahViSrIq/5TWfMMgFZEnre6B8g51MuTaOE";
    var d = new Date();
    var nd = d.toUTCString();
    var self = this;
    var key2 ="POST\n\n" + "application/json" + "\n" + nd + "\n/api/cmd/Param/"+uuid;

    var toSha2=CryptoJS.HmacSHA256(key2, apisecret);

    var encodedHeader2 = CryptoJS.enc.Base64.stringify(toSha2);

    var auth2 =apiKey+":"+encodedHeader2;


    var headers2 = new Headers();
    headers2.append("Content-Type", "application/json");
    headers2.append("Authorization", auth2);
    headers2.append("X-Date", nd);
    //console.log("Type is: ",type);
    var myBody = {"Data" : [{"Control":1, "Type": type, "Value": value}]};
    var sBody = JSON.stringify(myBody);

    ////////////////////// fetch2 ///////////////////////
    fetch("http://192.168.101.55:8081/api/cmd/Param/"+uuid, {
        method: "POST",
        headers : headers2,
        body: sBody
    }).then(function(response) {
      return response.json();
    }).then(function(json){
    }).catch(function(err) {
      console.log("err: ",err);
    });
  }
  sendFlashSave(uuid) {
    var apiKey = "14e5b1ae5f51284b";
    var apisecret = "/Qm8TcrgIahViSrIq/5TWfMMgFZEnre6B8g51MuTaOE";
    var d = new Date();
    var nd = d.toUTCString();
    var self = this;
    var key2 ="POST\n\n" + "application/json" + "\n" + nd + "\n/api/cmd/Param/"+uuid;

    var toSha2=CryptoJS.HmacSHA256(key2, apisecret);

    var encodedHeader2 = CryptoJS.enc.Base64.stringify(toSha2);

    var auth2 =apiKey+":"+encodedHeader2;


    var headers2 = new Headers();
    headers2.append("Content-Type", "application/json");
    headers2.append("Authorization", auth2);
    headers2.append("X-Date", nd);
    //console.log("Type is: ",type);
    var myBody = {"Data" : [{"Control":1, "Type": 53, "Value": ""}]};
    var sBody = JSON.stringify(myBody);

    ////////////////////// fetch2 ///////////////////////
    fetch("http://192.168.101.55:8081/api/cmd/Param/"+uuid, {
        method: "POST",
        headers : headers2,
        body: sBody
    }).then(function(response) {
      return response.json();
    }).then(function(json){
      console.log("Flash saved");
    }).catch(function(err) {
      console.log("err: ",err);
    });
  }
  sendValues(uuidSel,basicValues, inputValues) {
    var changes = [];
    var self=this;
    for (var i=0; i<basicValues.length; i++) {
      if(inputValues[i] != basicValues[i]) {
        changes.push(i);
        self.sendCommand(uuidSel, i, inputValues[i]);
        var sVal = "Types changed on this device: " + changes;
        self.setState({sentValues: sVal});
      }
    }
    for(var i=0; i<90; i++) {
      document.querySelectorAll(".form-control")[i].value="";
    }
    self.sendFlashSave(uuidSel);
    self.setState({sentValues: ""});
    return changes;
  }

  fillCommand(uuidSel) {
    var self=this;
    Devices.delBasics();
    Devices.delInputValues();
    //console.log("Filling");
    self.readCommand(uuidSel, 0,0);
  }
  render() {
    const headerS = {
      height: "10%",
      width: "100%",
      position: "absolute",
      right: "15"
    };
    const labelS = {
      height: "5%",
      top: "10%",
      width: "90%",
      position: "absolute",
      left: "5%"
    };
    const mainS = {
      height: "66%",
      top: "22%",
      width: "100%",
      right: "0",
      //background: "blue",
      position: "absolute",
      right: "15",
      overflowY: "scroll",
      borderBottom: "thin solid #e5e5e5"
    };
    const footerS = {
      width: "100%",
      position: "absolute",
      bottom: "3%",
      right: "15"
    };
    const myS = {
      marginLeft: "40",
      marginTop: "-5%"
    };
    const bs = {
      color: "green",
      marginLeft: "3%",
      fontSize: "50%"
    };
    const bs2 = {
      color: "red",
      marginLeft: "3%",
      fontSize: "50%",
    };
    const uuidSt = {
      marginBottom: "1%",
      fontSize: "35%",
    }
    const myStylee = {
      textAlign: "center"
    };

    const {basicValues} = this.state;
    var basAdv, myContent, bB, aB;
    var uuidSel = this.state.selectedUuid;
    //console.log("Finished: ", this.state.finished);
    if(uuidSel.length > 1 && this.state.finished)  {
      this.fillCommand(uuidSel);
      DeviceActions.setFinished(false);
    }

    if (this.state.myState) {
      basAdv = <div ><h3>Settings<small style={bs2}>ADVANCED</small></h3></div>;
      myContent = <Advanced />;
      bB = <Button bsStyle="success" onClick={this.renderBasic.bind(this)}>BASIC</Button>;
      aB = <Button bsStyle="danger" onClick={this.renderAdvanced.bind(this)} disabled>ADVANCED</Button>;
      if (this.state.basicValues.length > 0 && this.state.basicValues.length < 89) {
          aB = <Button bsStyle="danger" onClick={this.renderAdvanced.bind(this)} disabled>wait...</Button>;
      }
      if (this.state.basicValues.length > 0 && this.state.basicValues.length < 53) {
          bB = <Button bsStyle="success" onClick={this.renderBasic.bind(this)}>wait...</Button>;
      }
    } else {
      basAdv = <div><h3>Settings<small style={bs}>BASIC</small></h3></div>;
      myContent = <Basic />;
      bB = <Button bsStyle="success" onClick={this.renderBasic.bind(this)} disabled>BASIC</Button>;
      aB = <Button bsStyle="danger" onClick={this.renderAdvanced.bind(this)}>ADVANCED</Button>;
      if (this.state.basicValues.length > 0 && this.state.basicValues.length < 89) {
          aB = <Button bsStyle="danger" onClick={this.renderAdvanced.bind(this)}>wait...</Button>;
      }
      if (this.state.basicValues.length > 0 && this.state.basicValues.length < 53) {
          bB = <Button bsStyle="success" onClick={this.renderBasic.bind(this)} disabled>wait...</Button>;
      }
    }

    var sendUpload = <Button
    bsStyle="primary"
    bsSize="large"
    onClick={this.sendValues.bind(this, this.state.selectedUuid, this.state.basicValues, this.state.inputValues)}
    >Save & Upload</Button>
    return (
      <div>
        <Grid>
        <Row style={headerS}>
        <PageHeader>
          <Row>
            <Col lg={9}>
              <div style={myS}>
                {basAdv}
                <div style={uuidSt}>{uuidSel} </div>
              </div>
            </Col>
            <Col lg={1}>
              <div>
                {bB}
              </div>
            </Col>
            <Col lg={2}>
              <div>
                {aB}
              </div>
            </Col>
          </Row>
        </PageHeader>
        </Row>
        <Row style={labelS}>
            <RightLabel />
        </Row>
        <Row style={mainS}>
          {myContent}
        </Row>
        <Row style={footerS}>
        <div >
          <Row>
            <Col lg={9}>
              <div  style={myStylee}>
              </div>
            </Col>
            <Col lg={3}>
              <div>
                {sendUpload}
              </div>
            </Col>
          </Row>
        </div>
        </Row>
        </Grid>
      </div>
    );
  }
}
