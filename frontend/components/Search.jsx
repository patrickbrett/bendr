import React, { Component } from "react";

class Search extends Component {
  render() {
    return (
      <div id="searchContainer">
        <input className = "searchBar" type="text" onChange={this.props.updateSearch} />
        <button className = "searchButton" onClick={this.props.performSearch}>Go</button>
      </div>
    );
  }
}

export default Search;
