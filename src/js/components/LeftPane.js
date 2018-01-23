import React from "react";
import ReactDOM from "react-dom";

import {Grid, Row, Col, PageHeader, Button, Panel} from "react-bootstrap";
import UuidEl from "./Left/UuidEl";
import Base64 from "base-64";
import Utf8 from "utf8";
import CryptoJS from "crypto-js";
import Devices from "../stores/Devices";
import * as DeviceActions from "../actions/DeviceActions";

export default class LeftPane extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      finished: Devices.getFinished(),
      devices: Devices.getAll(),
      selectedUuid : Devices.getSelected(),
      basicValues: Devices.getBasicValues(),
      online: Devices.getOnline(),
      dateLoad: Devices.getDate(),
    };
  }
  getDevices() {
    var apiKey = "0c4cc14c4dec25c6";
    var apisecret = "mmmsmkyZM/+0Rsq8dY2bzFVsISxao0N77JXzdE94bos";
    var d = new Date();
    var nd = d.toUTCString();

    var key ="GET\n\n" + "application/json" + "\n" + nd + "\n/api/device/";

    var toSha=CryptoJS.HmacSHA256(key, apisecret);

    var encodedHeader = CryptoJS.enc.Base64.stringify(toSha);

    var auth = apiKey+":"+encodedHeader;

    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", auth);
    headers.append("X-Date", nd);


    ////////////////////// fetch ///////////////////////
    fetch("http://192.168.101.138:8081/api/device/", {
        method: "GET",
        headers : headers
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
        //console.log("Entire Object: ", json);
        //console.log("First Object: ", json[0]);
        for(var i=0; i<json.length; i++) {
            //window.localStorage.setItem(i, (json[i]).Uuid);
            DeviceActions.createDevice(json[i].Uuid);
            DeviceActions.setOnline(json[i].State);
            //console.log("Uuid at ",i," is:",(json[i]).Uuid);
        }
    })
    .then(function() {
      console.log("Finished?");
    })
    .catch(function(err) {
      console.log("Err", err);
    });
    /*
    ////////////////////// fetch 3 //////////////////////////
    fetch("http://192.168.101.99:8081/api/device/46002c00-1351-3432-3434-373300000000", {
        method: "DELETE",
        headers : headers2
    });*/
    //this.setState({myRows: rows});
  }

  componentWillMount() {
    Devices.on("change", () => {
      this.setState({
        finished: Devices.getFinished(),
        devices: Devices.getAll(),
        selectedUuid: Devices.getSelected(),
        online: Devices.getOnline(),
        dateLoad: Devices.getDate(),
      });
    });
  }

  createDevice() {
    var self = this;
    Devices.deleteAll();
    Devices.deleteOnline();
    this.getDevices();
    console.log("Device list states: ",this.state.online);
    var d = new Date();
    var nd = d.toUTCString();
    DeviceActions.setDate("Last refresh at:"+nd.slice(16,25)+" UTC");
    //console.log("Device list refreshed at: ",nd);

    setInterval(function() {
      Devices.deleteAll();
      Devices.deleteOnline();
      self.getDevices();
      var d = new Date();
      var nd = d.toUTCString();
      DeviceActions.setDate("Last refresh at:"+"  "+nd.slice(16,25)+" UTC");
      //console.log("Device list refreshed at: ",d);
    },300000);
  }
  /*createDeviceRefresh() {
    Devices.deleteAll();
    Devices.deleteOnline();
    this.getDevices();
  }*/
  setSelected(uuid) {
    try {
        DeviceActions.setFinished(true);
        DeviceActions.setSelected(uuid);
    } catch (e) {
      console.log("Error is: ", e.message, "and uuid is: ",uuid);
    }
  }
  componentDidMount() {
      this.createDevice();
  }
  render() {
    const headerS = {
      height: "10%",
      width: "100%",
      position: "absolute",
      left: "15",
      top: "0"
    };
    const mainS = {
      height: "86%",
      top: "12%",
      width: "100%",
      //background: "blue",
      position: "absolute",
      left: "15",
      overflowY: "scroll",
      borderBottom: "thin solid #e5e5e5"
    };
    const myS = {
      marginLeft: "30",
      marginTop: "-6%"
    };
    const dateS = {
      fontSize: "50%",
    };



    //this.createDevice();
    //console.log("State is: ",this.state.selectedUuid);
    const {devices} = this.state;
    //console.log("Finished?",Devices.getLen());
    //console.log("before mounting: ", devices);

      var MyDevices = devices.map((device, i) => {
          //console.log("Uuid I read is", device);
          var setSelectedClick = this.setSelected.bind(this, device);
          return <UuidEl
                    key={device}
                    uuid = {device}
                    ind={i}
                    onClick = {setSelectedClick}
          />;
      });




    const myStylee = {
        textAlign: "center",
        width: "90%",
        marginLeft: "3%",
        marginRight: "3%"
    };
    var refreshButton = < Button bsStyle = "Info" onClick = {
      this.createDevice.bind(this)
      }> Refresh < /Button>;
    return (
      <div>
        <Grid>
        <Row style={headerS}>
          <PageHeader>
            <Row>
              <Col lg={9}>
                <div style={myS}>
                  <h3>Device list <p style={dateS}>{this.state.dateLoad}</p></h3>
                </div>
              </Col>
              <Col lg={3}>
                  {refreshButton}
              </Col>
            </Row>
          </PageHeader>
        </Row>
        <Row style={mainS}>
          <div style={myStylee}>
            {MyDevices}
          </div>
        </Row>
        </Grid>
      </div>
    );
  }
}
