import React from "react";
import {Link} from 'react-router-dom';
import profileImage from "./profile.png";

class Project extends React.PureComponent {
    render() {
        return (
            <div>
                <button>
                    <span class="icon">
                    </span>
                </button>
            </div>
        )
    }
}

export default class LandingPage extends React.Component {
    render() {
        return (
            <div className="cont" id="containerLogin">
                <div className="header" id="headerLoginS">
                    <div>
                        <h2 className="headerTitle">BubbleIdeas</h2>
                    </div>
                    <div>
                        <h1>Project view</h1>
                    </div>
                    <div>
                        <i className={"icon icon-person_outline btn-blue btn-circle"} />
                    </div>
                </div>

                <div className="body" id="bodyLogin">
                </div>
            </div>
        )
    }
}
