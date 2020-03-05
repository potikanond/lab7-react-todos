import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

import { BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css';

import Todos from './components/Todos'
import AddTodo from './components/AddTodo'
import Header from './components/Header'
import About from './components/About'


class App extends Component {
  state = {
    todos: [
      // {
      //   id: uuidv4(),
      //   title: 'take out trash',
      //   completed: false
      // },
      // {
      //   id: uuidv4(),
      //   title: 'finish react lab',
      //   completed: true
      // },
      // {
      //   id: uuidv4(),
      //   title: 'grocery shopping',
      //   completed: false
      // }
    ]
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then( res => {
        this.setState( { todos: res.data } );
      });
  }

  addTodo = (title) => {
    axios.post('https://jsonplaceholder.typicode.com/todos',
      {
        id: uuidv4(),
        title: title,
        completed: false
      }
    )
    .then( res => {
      this.state.todos.push(res.data);
      this.setState( { todos: this.state.todos });
    });

    // console.log('Item added!!!');
    // const newTodo = {
    //   id: uuidv4(),
    //   title: title,
    //   completed: false
    // }

    // this.state.todos.push(newTodo);
    // this.setState( { todos: this.state.todos });
  }

  markComplete = (id) => {
    console.log('item completed!!!:'+id);
 
    let new_todos = this.state.todos.map( todo => {
      if(todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
 
    console.log(new_todos);
    this.setState( { todos: new_todos });
  }

  delTodo = (id) => {
    axios.delete('https://jsonplaceholder.typicode.com/todos/'+id)
      .then( res => {
        console.log(res.data);
        let new_todos = this.state.todos.filter( todo => todo.id !== id);
        this.setState( { todos: new_todos });
      });

    // console.log('delete item:'+id);
    // let new_todos = this.state.todos.filter( todo => todo.id !== id);
    // this.setState( { todos: new_todos });
  }

  render() {
    return (
      <Router>
      <div className="App">
        <div className="container">
          <Header />
          <Route exact path="/" render={ props => (
            <div>
              <AddTodo addTodo={this.addTodo}/>
              <Todos  todos={this.state.todos}
                      markComplete={this.markComplete}
                      delTodo={this.delTodo}/>
            </div>
          )} />

          <Route exact path="/about" component={About} />

        </div>
      </div>
      </Router>
    )
  }

  // return (
  //   <div className="App">
  //     <div className="container">
  //       <h3>App Component</h3>
  //       <Todos />
  //     </div>
  //   </div>
  // );
}

export default App;
