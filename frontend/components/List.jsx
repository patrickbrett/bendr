import React, { Component } from "react";

class List extends Component {
  render() {
    const chosenBars = this.props.chosenBars;

    const chosenBarsDisplay = chosenBars.map(bar => {
      return (
        <div key={bar.name}>{bar.name} <button onClick={()=>this.props.removeBar(bar)} className="removeButton">Remove</button></div>
      );
    });

    let bendMeButton;
    if (this.props.chosenBars.length >= 3) {
      bendMeButton = <button onClick={this.props.bendMe} className={`bendMeButton`}>Bend Me!</button>;
    }

    return (
      <div id="barList">
        <button onClick={this.props.toggleAddMode} className={`addButton` + (this.props.isAddMode ? ` isAddMode` : ``)}>Add</button>
        <button onClick={this.props.removeAll} className={`removeAllButton`}>Clear</button>
        {chosenBarsDisplay}
          <span/>
        {bendMeButton}
      </div>
    );
  }
}

export default List;
