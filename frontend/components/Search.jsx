import React, { Component } from "react";

class Search extends Component {
  render() {
    return (
      <div id="searchContainer">
        <input type="text" onChange={this.props.updateSearch} />
        <button onClick={this.props.performSearch}>Go</button>
      </div>
    );
  }
}

export default Search;
