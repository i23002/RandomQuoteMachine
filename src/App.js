/* eslint-disable jsx-a11y/anchor-has-content */
import React from "react";
import './App.css';


// declare an iterator
// eslint-disable-next-line no-unused-vars
// declare inline styles
const text_color = "white"
const colors = [
  "cyan",
  "magenta",
  "olivegreen",
  "orchid",
  "orange",
  "red",
  "gainsboro",
  "gold",
  "greenyellow",
  "hotpink",
  "indianred",
  "lawngreen",
  "lightblue",
  "mediumspringgreen",
  "limegreen",
  "lightsteelblue",
  "lightskyblue",
  "lightsalmon",
  "mistyrose"
]
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      i : 0,
      j : 0,
      error: null,
      isLoaded: false,
      items: [],
      backgroundColor: '',
      color : ''
    };
    this.Increment = this.Increment.bind(this);
  }

  componentDidMount() {
    fetch("https://type.fit/api/quotes")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
  // handle change component
  Increment(){
    this.setState(state => ({
      i: state.i + 1,
      backgroundColor : colors[state.j],
      j : state.j + 1,
      color : text_color
    }));
  }
  

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else if(items[this.state.i].author === null){
      items[this.state.i].author = 'Unknown'
      const styles = {
        color: "black",
        backgroundColor : this.state.backgroundColor
      }
      return(
        <div id="quote_box" style={styles}>
          <h1 id="text">{items[this.state.i].text}</h1>
          <h2 id="author">-{items[this.state.i].author}</h2>
          <button onClick={this.Increment} id="new-quote" style={styles}>Click Here</button>
        </div>
        
      )
    }
     else {
      const styles = {
        color: "black",
        backgroundColor : this.state.backgroundColor
      }
      return (
        <div id="quote_box" style={styles}>
          <h1 id="text"><u>{items[this.state.i].text}</u></h1>
          <h2 id="author"><u>-{items[this.state.i].author}</u></h2>
          <button onClick={this.Increment} id="new-quote">Click Here</button>
        </div>
      );
    }
  }
}

export default App;
