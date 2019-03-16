import React, { Component } from "react";

class Search extends Component {
  render() {
    const submit = (e) => {
      this.props.performSearch();
      e.preventDefault();
    }

    return (
      <div id="searchContainer">
        <form onSubmit={submit}>
          <input className="searchBar" type="text" onChange={this.props.updateSearch} value={this.props.searchTerm} />
        </form>
      </div>
    );
  }
}

export default Search;
