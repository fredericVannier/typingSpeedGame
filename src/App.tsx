import { WSAECONNREFUSED } from "constants";
import React, { ChangeEvent, Component } from "react";
import "./styles/main.css";

interface State {
  typeTest: string;
  words: Array<string>;
  enteredText: string;
  score: number;
  started: boolean;
  startTime: Date | null;
  wordsPerMinute: number | null;
}

class App extends Component {
  state: State = {
    typeTest: "This is the sentence to type",
    words: [],
    enteredText: "",
    score: 0,
    started: false,
    startTime: null,
    wordsPerMinute: null,
  };

  componentDidMount() {
    this.setState({ words: this.state.typeTest.split(" ") });
  }

  wordsPerMinute = (charsTyped: number, millis: number): number =>
    Math.floor(charsTyped / 5 / (millis / 60000));

  checkFinished = (): void => {
    if (!this.state.words.length) {
      if (this.state.startTime) {
        const timeMillis: number =
          new Date().getTime() - this.state.startTime.getTime();
        const wpm = this.wordsPerMinute(this.state.typeTest.length, timeMillis);
        this.setState({ wordsPerMinute: wpm });
      }
    }
  };

  onWordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (!this.state.started) {
      this.setState({ started: true, startTime: new Date() });
    }
    console.log(e.currentTarget.value);
    let enteredText = e.currentTarget.value;
    this.setState({ enteredText });

    if (enteredText === this.state.words[0]) {
      this.setState({ score: this.state.score + 1 });
      this.setState({ enteredText: "" });
      this.setState({ words: this.state.words.slice(1) }, (): void =>
        this.checkFinished()
      );
    }
  };

  render() {
    return (
      <div className="App">
        <h1>
          {this.state.wordsPerMinute
            ? `${this.state.wordsPerMinute} WPM`
            : "Test your typing speed"}
        </h1>
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
