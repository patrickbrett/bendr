import React, { Component } from "react";

class Search extends Component {
  render() {
    const submit = (e) => {
      this.props.performSearch();
      e.preventDefault();
    }

    return (
        <form onSubmit={submit}>
          <input className="searchBar" type="text" onChange={this.props.updateSearch} />
        </form>
    );
  }
}

export default Search;