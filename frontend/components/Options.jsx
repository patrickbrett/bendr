import React, { Component } from "react";
class Options extends Component {
    render() {
        return (
            <div id = "optionsBox">
                Only show places that are open: &nbsp;
                <label className="switch">
                    <input type="checkbox" id = "hoursCheck" checked = {this.props.isHoursCheck} onChange={this.props.onHoursChecked}/>
                    <span className="slider round"></span>
                </label>
            </div>
        );
    }
}

export default Options;
