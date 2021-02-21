import { WSAECONNREFUSED } from "constants";
import React, { ChangeEvent, Component } from "react";
import "./styles/main.css";

interface State {
  typeTest: string;
  words: Array<string>;
  enteredText: string;
  score: number
}

class App extends Component {
  state: State = {
    typeTest: "This is the sentence to type",
    words: [],
    enteredText: "",
    score: 0
  };

  componentDidMount() {
    this.setState({ words: this.state.typeTest.split(" ") });
  }

  onWordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    console.log(e.currentTarget.value);
    let enteredText = e.currentTarget.value
    this.setState({ enteredText })

    if (enteredText === this.state.words[0]) {
      this.setState({ score: this.state.score +1})
      this.setState({ enteredText: "" })
    }
  };

  render() {
    return (
      <div className="App">
        <h1>Test your typing test</h1>
        <div className="timer">0</div>
        <div className="container">
            <h3>Type the following</h3>
          <div className="quote-display" id="quote-display">
            <h6>{this.state.typeTest}</h6>
          </div>
          <input
            id="quoteInput"
            className="quote-input"
            autoFocus
            value={this.state.enteredText}
            onChange={this.onWordChange}
          />

          <h3>Your score: {this.state.score}</h3>
        </div>
      </div>
    );
  }
}

export default App;
