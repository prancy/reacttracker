import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor() {
    super()
    this.state = {
      todos: ["bake bread", "wash feet"],
      inputFieldText: ""
    }
  }

  handleNewSubmit = (e) => {
    //the code below is to prevent a full page refresh
    e.preventDefault();
    //passing in this event object
    let newTodo = this.state.inputFieldText
    //now we want to call this.setState
    //Why? BEcause the only way to modify state is via the setState method and the prevState is the currentState which will become the prevState
    this.setState((prevState) => ({
      todos: [...prevState.todos, newTodo],
      inputFieldText: ""
    }))

  }

  updateFieldValue = (e) => {
    this.setState({
      inputFieldText: e.target.value
    })
  }

  removeTodo = (index) => {
    //everytime you call this.setState, it is reexecuting the render()
    this.setState((prevState) => ({
      todos: prevState.todos.filter((item, idx) => idx !== index)
    }))
    }

  render() {
    return (
      <div>
        <h1>To Do</h1>
        {/* We are passing through a controlled component */}
        <InputField updateFieldValue={this.updateFieldValue}
                    inputFieldText={this.state.inputFieldText}
                    handleNewSubmit={this.handleNewSubmit}
          />
        <TodoListItems todoItems={this.state.todos} removeTodo={this.removeTodo} />
      </div>
    )
  }
}

const TodoListItems = ({ todoItems, removeTodo }) => (
  <ul>
    {todoItems.map((item, index) => <li onClick={ () => removeTodo(index) } key={index}>{item}</li>)}
  </ul>
)

const InputField = ({ updateFieldValue, handleNewSubmit, inputFieldText }) => (
  <form onSubmit={(e) => handleNewSubmit(e)}>
    <input type="text" value={inputFieldText} onChange={(e) => updateFieldValue(e)} />
    <input type="submit" value="Submit" />
  </form>
)

export default App;
