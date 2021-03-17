import { WSAECONNREFUSED } from "constants";
import React, { ChangeEvent, Component } from "react";
import "./styles/main.css";
import WordsList from "./components/WordsList"

interface State {
  typeTest: string;
  words: Array<string>;
  updatedWords: Array<string>;
  enteredText: string;
  score: number;
  started: boolean;
  startTime: Date | null;
  wordsPerMinute: number | null;
}

class App extends Component {
  state: State = {
    typeTest: " ",
    words: [],
    updatedWords: [],
    enteredText: "",
    score: 0,
    started: false,
    startTime: null,
    wordsPerMinute: null,
  };

  async componentDidMount() {
    const url = "https://random-word-api.herokuapp.com//word?number=10";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ words: data });
    this.setState({ updatedWords: data });
  }

  wordsPerMinute = (charsTyped: number, millis: number): number =>
    Math.floor(charsTyped / 5 / (millis / 60000));

  checkFinished = (): void => {
    if (!this.state.updatedWords.length) {
      if (this.state.startTime) {
        const timeMillis: number =
          new Date().getTime() - this.state.startTime.getTime();
          console.log("timeMillis", timeMillis);
        const wpm = this.wordsPerMinute(this.state.words.length, timeMillis);
        console.log("WPMMMMM", wpm);
        this.setState({ wordsPerMinute: wpm }, (): void => console.log('wpm', this.state.wordsPerMinute));
      }
    }
  };

  onWordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (!this.state.started) {
      this.setState({ started: true, startTime: new Date() });
    }

    let enteredText = e.currentTarget.value;
    this.setState({ enteredText }, (): void => console.log("ENTERED TEXT", this.state.enteredText));
    
    if (enteredText === this.state.updatedWords[0] + ' ') {
      this.setState({ score: this.state.score + 1 });
      this.setState({ updatedWords: this.state.updatedWords.slice(1) }, () => console.log('updated words', this.state.updatedWords)
      );
      this.setState({ enteredText: "" }, (): void => this.checkFinished());
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
            <h6>{this.state.updatedWords.map(word => word === this.state.updatedWords[0] ? <em className="current-word">{word} </em> : word + " ")}</h6>
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
