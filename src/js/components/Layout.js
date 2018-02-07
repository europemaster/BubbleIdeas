import React from "react";


import LeftPane from "./LeftPane";
import RightPane from "./RightPane";
import {Navbar, Tabs, Tab, Grid, Row, Col} from "react-bootstrap";

export default class Layout extends React.Component {
    constructor() {
        super();
        this.state = {
            title: "Welcome",
        };
    }

    changeTitle(title) {
        this.setState({title});
    }

    render() {
        const myStyle = {
            width: "100%",
            height: "100vh"
        };
        const myStyle2 = {
            width: "98%",
        };
        const leftStyle = {
            height: "100vh",
            borderRight: "thin solid #e5e5e5"
        };
        const rightStyle = {
            height: "100vh",
            borderLeft: "thin solid #e5e5e5"
        };
        return (
            <div style={myStyle}>
                <Grid style={myStyle2}>
                    <Row className="show-grid">
                        <Col lg={5} md={5} style={leftStyle}>
                            <div>
                                <LeftPane />
                            </div>
                        </Col>
                        <Col lg={7} md={7} style={rightStyle}>
                            <div >
                                <RightPane />
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}
