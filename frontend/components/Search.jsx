import React, { Component } from "react";

class Search extends Component {
  render() {
    const submit = (e) => {
      this.props.performSearch();
      e.preventDefault();
    }

    return (
      <div id="searchContainer">
        <input className = "searchBar" type="text" onChange={this.props.updateSearch} />
        <button className = "searchButton" onClick={this.props.performSearch}>Go</button>
        <form onSubmit={submit}>
          <input type="text" onChange={this.props.updateSearch} />
        </form>
      </div>
    );
  }
}

export default Search;
