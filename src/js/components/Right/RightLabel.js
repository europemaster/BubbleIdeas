import React from "react";
import Grid from "react-bootstrap/lib/Grid";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Button from "react-bootstrap/lib/Button";
import PageHeader from "react-bootstrap/lib/PageHeader";

export default class RightLabel extends React.Component {


  render() {
    const myS = {
      marginLeft: "20%",
      textAlign: "center"
    };
    const myS2 = {
      marginLeft: "60%"
    };
    const myT = {
      fontSize: "40%"
    };
    return (
      <PageHeader>
        <Row>
          <Col lg={6}>
            <div style={myS}>
              <h4 style={myT} >NAME</h4>
            </div>
          </Col>
          <Col lg={6}>
            <div style={myS2}>
              <h4 style={myT} >VALUE</h4>
            </div>
          </Col>

        </Row>
      </PageHeader>
    );
  }
}
