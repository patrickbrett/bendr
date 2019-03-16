import React, { Component } from "react";
import Header from "./Header.jsx";
import PageContent from "./PageContent.jsx";
import Footer from "./Footer.jsx";

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
