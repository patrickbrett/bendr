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
          <input type="text" onChange={this.props.updateSearch} />
        </form>
      </div>
    );
  }
}

export default Search;
