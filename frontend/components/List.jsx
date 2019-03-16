import React, { Component } from "react";

class List extends Component {
  render() {
    const chosenBars = this.props.chosenBars;

    const chosenBarsDisplay = chosenBars.map(bar => {
      return (
        <div key={bar.name}>{bar.name} <button onClick={()=>this.props.removeBar(bar)} className="removeButton">Remove</button></div>
      );
    });

    return (
      <div id="barList">
        <button onClick={this.props.toggleAddMode} className={`addButton` + (this.props.isAddMode ? ` isAddMode` : ``)}>Add</button>
        {chosenBarsDisplay}
        <button onClick={this.props.bendMe} className={`bendMeButton`}>Bend Me!</button>
      </div>
    );
  }
}

export default List;
