import { WSAECONNREFUSED } from "constants";
import React, { ChangeEvent, Component } from "react";
import "./styles/main.css";

interface State {
  typeTest: string;
  words: Array<string>;
  enteredText: string;
}

class App extends Component {
  state: State = {
    typeTest: "This is the sentence to type",
    words: [],
    enteredText: "",
  };

  componentDidMount() {
    this.setState({ words: this.state.typeTest.split(" ") });
  }

  onWordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    console.log(e.currentTarget.value);
    let enteredText = e.currentTarget.value
    this.setState({ enteredText: enteredText})
  };

  render() {
    return (
      <div className="App">
        <h1>Test your typing test</h1>
        <div className="timer">0</div>
        <div className="container">
          <div className="quote-display" id="quote-display">
            Quote
          </div>
          <input
            id="quoteInput"
            className="quote-input"
            autoFocus
            value={this.state.enteredText}
            onChange={this.onWordChange}
          />
        </div>
      </div>
    );
  }
}

export default App;
