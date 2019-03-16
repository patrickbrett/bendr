import React, { Component } from "react";
import Header from "./Header";
import PageContent from "./PageContent";
import Footer from "./Footer";

class Index extends Component {
  render() {
    return (
      <div id="container">
        <Header />
        <PageContent />
        <Footer />
      </div>
    );
  }
}

export default Index;
