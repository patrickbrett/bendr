import React, { Component } from "react";

class Search extends Component {
  render() {
    const submit = (e) => {
      this.props.performSearch();
      e.preventDefault();
    }

    return (
        <form onSubmit={submit}>
          <input className="searchBar" type="text" placeholder="Enter a location..." onChange={this.props.updateSearch} value={this.props.searchTerm} />
        </form>
    );
  }
}

export default Search;
