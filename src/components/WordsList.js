import React, { Component } from "react";

class WordsList extends Component {

  state = {
    list: []
  }

  async componentDidMount() {
    const url = "https://random-word-api.herokuapp.com//word?number=20";
    const response = await fetch(url);
    const data = await response.json();
    const finalWords = data.map( word => word + " ")
    this.setState({list: [...finalWords]})
    console.log("my data", this.state.list);
  }

  render() {
    return (
      <div className="wordsList">
        <h1>Hello Words !!!!!</h1>
        <p>{this.state.list}</p>
      </div>
    );
  }
}

export default WordsList;
