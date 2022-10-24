import React from "react";
import './App.css';


// declare an iterator
// eslint-disable-next-line no-unused-vars

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      i : 0,
      error: null,
      isLoaded: false,
      items: []
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
      i: state.i + 1
    }));
  }
    
  

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <h1>{items[this.state.i].text}</h1>
          <h2>{items[this.state.i].author}</h2>
          <button onClick={this.Increment}>Click Here</button>
        </div>
      );
    }
  }
}

export default App;
