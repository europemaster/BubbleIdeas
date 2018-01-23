import React from "react";
import {Grid, Row, Col, Panel, FormGroup, FormControl, SplitButton, MenuItem} from "react-bootstrap";
import Devices from "../../stores/Devices";
import * as DeviceActions from "../../actions/DeviceActions";

export default class Advanced extends React.Component {
  constructor(props) {
    super();
    this.state = {
      basicValues: Devices.getBasicValues(),
      inputValues: Devices.getInputValues(),
    }
  }
  componentDidMount() {
    Devices.on("change", () => {
      this.setState({
        basicValues: Devices.getBasicValues(),
        inputValues: Devices.getInputValues(),
      });
    });
  }

  handleInput(curInd, e) {
    DeviceActions.replaceElement(curInd, e.target.value);
    //console.log("Eventin storage: ", this.state.basicValues[curInd]);
    //console.log("Eventin storage: ", this.state.inputValues[curInd]);
  }
  render() {
    var tclvNames = ["TCLV Magic number", "TCLV table version", "Connectivity type",
  "Wifi ACK or NACK timeout and Waiting for next block timeout",
  "Wifi power saving timeout",
  "WiFi DTIM skip interval in msec",
  "Mobile ACK or NACK timeout and Waiting for next block timeout",
  "Mobile power saving timeout",
  "Ethernet MAC address",
  "Ethernet TCP retry count",
  "Ethernet TCP retry timeout [100ms]",
  "Ethernet ACK or NACK timeout and Waiting for next block timeout",
  "Ethernet power saving timeout",
  "IPv4 static IP",
  "IPv4 static Netmask",
  "IPv4 static Gateway",
  "IPv4 static DNS server",
  "IPv4 mode: 0=Static IP, 1=DHCP",
  "Server IP",
  "Server port",
  "VCOM of Display 0",
  "VCOM of Display 1",
  "VCOM of Display 2",
  "VCOM of Display 3",
  "VCOM of Display 4",
  "VCOM of Display 5",
  "VCOM of Display 6",
  "VCOM of Display 7",
  "Display Type",
  "Heartbeat interval",
  "Network error retry interval",
  "Proximity: offset calibration parameter",
  "Proximity: threshold in %",
  "Proximity: diode current in 10mA",
  "Accelerometer threshold count",
  "Accelerometer debounce count",
  "Battery OFF threshold",
  "Battery ON threshold",
  "Battery threshold count",
  "Front light map 0: PWM+LDR",
  "Front light map 1: PWM+LDR",
  "Front light map 2: PWM+LDR",
  "Front light map 3: PWM+LDR",
  "Front light map 4: PWM+LDR",
  "Front light map 5: PWM+LDR",
  "Front light map 6: PWM+LDR",
  "Front light map 7: PWM+LDR",
  "Front light threshold",
  "Front light server control",
  "System screens: 1=Battery, 2=Not connected, 3=Battery+Not connected",
  "Touch mode: 0=OFF, 1=ON, 3=ON+Beep",
  "Shipping mode: 0=OFF, 1=ON",
  "Sleep mode disable: 0=Sleep mode enabled, 1=Sleep mode disabled",
  "Command to save parameters to flash",
  "Roaming mode: 0=Roaming disabled, 1=Roaming enabled",
  "Roaming threshold in dBm",
  "Roaming hysteresis in dBm",
  "Writes EAP certificate chunk",
  "Writes EAP certificate descriptor",
  "Erases EAP certificate",
  "EAP certificate 0 info",
  "EAP certificate 1 info",
  "EAP certificate 2 info",
  "EAP certificate 3 info",
  "EAP certificate 4 info",
  "TCLV table version (SCPU)",
  "TCLV SCPU Frontlight Mode",
  "TCLV SCPU Frontlight map 0: PWM+LDR",
  "TCLV SCPU Frontlight map 1: PWM+LDR",
  "TCLV SCPU Frontlight map 2: PWM+LDR",
  "TCLV SCPU Frontlight map 3: PWM+LDR",
  "TCLV SCPU Frontlight map 4: PWM+LDR",
  "TCLV SCPU Frontlight map 5: PWM+LDR",
  "TCLV SCPU Frontlight map 6: PWM+LDR",
  "TCLV SCPU Frontlight map 7: PWM+LDR",
  "TCLV SCPU Frontlight PWM frequency in Hz",
  "TCLV SCPU Frontlight samplerate in sec",
  "TCLV SCPU Frontlight prefilter [0 .. 100]",
  "TCLV SCPU Frontlight postfilter [0 .. 100]",
  "TCLV SCPU Frontlight sensor timeout in sec",
  "TCLV SCPU Heater Mode",
  "TCLV SCPU Heater OFF temperature in °C",
  "TCLV SCPU Heater ON temperature in °C",
  "TCLV SCPU Device Mode",
  "TCLV SCPU Minimal OFF temperature in °C",
  "TCLV SCPU Maximal OFF temperature in °C",
  "TCLV SCPU Battery threshold in mV",
  "Command to push parameters to SCPU",
  "Command to pull parameters from SCPU",
  "Command to save parameters to SCPU"
];
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

    const myT = tclvNames.map((tclv, i) => {
      return <div style={myStylee} key={tclv}>
        <Row>
          <Col lg={8}>
            <div style= {nameS}>
              <Panel style={panelS}>
                <big>{tclv}</big>
              </Panel>
            </div>
          </Col>
          <Col lg={4}>
            <div style={valueS}>
              <FormGroup>
                <FormControl
                type="text"
                placeholder={ this.state.inputValues[i] }
                onChange={this.handleInput.bind(this,i)}
                />
              </FormGroup>
            </div>
          </Col>
        </Row>
        </div>;
    });
    return (
      <div>
      {myT}
      </div>
    );
  }
}
