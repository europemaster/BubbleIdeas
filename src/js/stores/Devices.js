import { EventEmitter } from "events";

import dispatcher from "../dispatcher/dispatcher";
class Devices extends EventEmitter {
  constructor() {
    super();
    this.devices = [

    ];
    this.selectedUuid ="";
    this.finished = true;
    this.dateLoad="";
    this.basicValues = [

    ];
    this.inputValues = [

    ];
    this.online = [

    ];
    this.controls = [
      {"Control":0, "Type": 1, "Value": ""},{"Control":0, "Type": 2, "Value": ""},{"Control":0, "Type": 3, "Value": ""},
      {"Control":0, "Type": 4, "Value": ""},{"Control":0, "Type": 5, "Value": ""},{"Control":0, "Type": 6, "Value": ""},
      {"Control":0, "Type": 7, "Value": ""},{"Control":0, "Type": 8, "Value": ""},{"Control":0, "Type": 9, "Value": ""},
      {"Control":0, "Type": 10, "Value": ""},{"Control":0, "Type": 11, "Value": ""},{"Control":0, "Type": 12, "Value": ""},
      {"Control":0, "Type": 13, "Value": ""},{"Control":0, "Type": 14, "Value": ""},{"Control":0, "Type": 15, "Value": ""},
      {"Control":0, "Type": 16, "Value": ""},{"Control":0, "Type": 17, "Value": ""},{"Control":0, "Type": 18, "Value": ""},
      {"Control":0, "Type": 19, "Value": ""},{"Control":0, "Type": 20, "Value": ""},{"Control":0, "Type": 21, "Value": ""},
      {"Control":0, "Type": 22, "Value": ""},{"Control":0, "Type": 23, "Value": ""},{"Control":0, "Type": 24, "Value": ""},
      {"Control":0, "Type": 25, "Value": ""},{"Control":0, "Type": 26, "Value": ""},{"Control":0, "Type": 27, "Value": ""},
      {"Control":0, "Type": 28, "Value": ""},{"Control":0, "Type": 29, "Value": ""},{"Control":0, "Type": 30, "Value": ""},
      {"Control":0, "Type": 31, "Value": ""},{"Control":0, "Type": 32, "Value": ""},{"Control":0, "Type": 33, "Value": ""},
      {"Control":0, "Type": 34, "Value": ""},{"Control":0, "Type": 35, "Value": ""},{"Control":0, "Type": 36, "Value": ""},
      {"Control":0, "Type": 37, "Value": ""},{"Control":0, "Type": 38, "Value": ""},{"Control":0, "Type": 39, "Value": ""},
      {"Control":0, "Type": 40, "Value": ""},{"Control":0, "Type": 41, "Value": ""},{"Control":0, "Type": 42, "Value": ""},
      {"Control":0, "Type": 43, "Value": ""},{"Control":0, "Type": 44, "Value": ""},{"Control":0, "Type": 45, "Value": ""},
      {"Control":0, "Type": 46, "Value": ""},{"Control":0, "Type": 47, "Value": ""},{"Control":0, "Type": 48, "Value": ""},
      {"Control":0, "Type": 49, "Value": ""},{"Control":0, "Type": 50, "Value": ""},{"Control":0, "Type": 51, "Value": ""},
      {"Control":0, "Type": 52, "Value": ""},{"Control":0, "Type": 53, "Value": ""},{"Control":0, "Type": 54, "Value": ""},
      {"Control":0, "Type": 55, "Value": ""},{"Control":0, "Type": 56, "Value": ""}
    ];
  }
  //////////////////////////////////////////////////////////////////////////
  // DEVICES ///
  createDevice(uuid) {
    //console.log("Store got devices: ",uuid);
    this.devices.push(uuid);
    this.emit("change");
  }
  getAll() {
    return this.devices;
  }
  deleteAll() {
    return this.devices.length = 0;
  }
  //////////////////////////////////////////////////////////////////////////
  // UUID ///
  setSelected(selUuid) {
    this.selectedUuid = selUuid;
    this.emit("change");
  }
  getSelected() {
    return this.selectedUuid;
  }
  //////////////////////////////////////////////////////////////////////////
  // FINISHED ///
  setFinished(bool) {
    this.finished=bool;
  }
  getFinished() {
    return this.finished;
  }
  //////////////////////////////////////////////////////////////////////////
  // DATE ///
  setDate(date) {
    this.dateLoad=date;
    this.emit("change");
  }
  getDate() {
    return this.dateLoad;
  }
  //////////////////////////////////////////////////////////////////////////
  // BASIC ///
  setBasicValues(value) {
    this.basicValues.push(value);
    this.emit("change");
  }
  getBasicValues() {
    return this.basicValues;
  }
  getLen() {
    return this.basicValues.length;
  }
  delBasics() {
    return this.basicValues.length=0;
  }
  //////////////////////////////////////////////////////////////////////////
  // INPUT ///
  setInputValues(value) {
    this.inputValues.push(value);
    this.emit("change");
  }
  getInputValues() {
    return this.inputValues;
  }
  delInputValues() {
    return this.inputValues.length=0;
  }
  replaceElement(index, value) {
    this.inputValues[index]=value;
  }
  //////////////////////////////////////////////////////////////////////////
  // ONLINE ///
  setOnline(state) {
    this.online.push(state);
    this.emit("change");
  }
  getOnline() {
    return this.online;
  }
  deleteOnline() {
    return this.online.length = 0;
  }
  //////////////////////////////////////////////////////////////////////////
  // CONTROLS ///
  getControls() {
    return this.controls;
  }
  //////////////////////////////////////////////////////////////////////////



  handleActions(action) {
    switch (action.type) {
      case "CREATE_DEVICE": {
        this.createDevice(action.uuid);
        break;
      }
      case "SET_SELECTED": {
        this.setSelected(action.selUuid);
        break;
      }
      case "SET_BASIC": {
        this.setBasicValues(action.value);
        break;
      }
      case "SET_INPUT": {
        this.setInputValues(action.value);
        break;
      }
      case "CHANGE_INPUT": {
        this.replaceElement(action.index, action.value);
        break;
      }
      case "SET_FINISHED": {
        this.setFinished(action.bool);
        break;
      }
      case "SET_ONLINE": {
        this.setOnline(action.state);
        break;
      }
      case "SET_DATE": {
        this.setDate(action.date);
        break;
      }
    }
  }
}

const devices = new Devices;
dispatcher.register(devices.handleActions.bind(devices));
//window.dispatcher = dispatcher;
window.devices = devices;
export default devices;
