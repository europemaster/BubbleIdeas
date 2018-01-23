import dispatcher from "../dispatcher/dispatcher";

export function createDevice(uuid) {
  dispatcher.dispatch({
    type: "CREATE_DEVICE",
    uuid,
  });
}
export function setSelected(selUuid) {
  dispatcher.dispatch({
    type: "SET_SELECTED",
    selUuid,
  });
}
export function setBasicValues(value) {
  dispatcher.dispatch({
    type: "SET_BASIC",
    value,
  });
}
export function setInputValues(value) {
  dispatcher.dispatch({
    type: "SET_INPUT",
    value,
  });
}
export function replaceElement(index, value) {
  dispatcher.dispatch({
    type: "CHANGE_INPUT",
    index,
    value,
  });
}
export function setFinished(bool) {
  dispatcher.dispatch({
    type: "SET_FINISHED",
    bool,
  });
}
export function setOnline(state) {
  dispatcher.dispatch({
    type: "SET_ONLINE",
    state,
  });
}
export function setDate(date) {
  dispatcher.dispatch({
    type: "SET_DATE",
    date,
  });
}
