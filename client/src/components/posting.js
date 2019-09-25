import React, { Component } from 'react';
import './styles/materialize/css/materialize.css'
import './styles/materialize/css/materialize.min.css'

import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

class Posting extends Component {

  constructor(props) {
    
    super(props);
    this.state = {
      username: '',
      title: '',
      description: '',
      date: '',
      _id: '',
      topics: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.addTopic = this.addTopic.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  addTopic(e) {
    e.preventDefault();
    if(this.state._id) {
      fetch(`/api/topics/${this.state._id}`, {
        method: 'PUT',
        body: JSON.stringify({
          username: this.state.username,
          title: this.state.title,
          description: this.state.description,
          date: this.state.date
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
         
          this.setState({_id: '', title: '', date:'',description: ''});
          this.fetchTopics();
        });
    } else {
      var da = (new Date()).toLocaleString();
     
      fetch('/api/topics', {
        method: 'POST',
        body: JSON.stringify({
          username: this.state.username,
          title: this.state.title,
          description: this.state.description,
          date: da
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
   
          this.setState({title: '', date:'',description: ''});
          this.fetchTopics();
        })
        .catch(err => console.error(err));
    }

  }

  deleteTopic(id) {
    
      fetch(`/api/topics/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
         
          this.fetchTopics();
        });
    
  }

  editTopic(id) {
    fetch(`/api/topics/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          title: data.title,
          description: data.description,
          date: data.date,
          _id: data._id
        });
      });
  }

  componentDidMount() {
    
    if(localStorage.getItem('token')){
      fetch('/api/users/validatetoken', {
              method: 'POST',
              body: JSON.stringify({token:localStorage.getItem('token')}),
              headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
              }
           })
          .then(res => res.json())
          .then(data => {
              if (data.error){
                  this.props.history.push('/login')
              }
              else{
                fetch('/api/users/getuser', {
                  method: 'POST',
                  body: JSON.stringify({id:data.id}),
                  headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                  }
               })
              .then(resp => resp.json())
              .then(dato => {
                  this.setState({username:dato.username})
                  console.log(dato.username)
              })
              .catch(err => console.error(err));
                  this.fetchTopics();
              }
          })
          .catch(err => console.error(err));
    }
    else{
      this.props.history.push('/login')
  }

    
  }
  logout = () =>{
    localStorage.clear()
    
  }

  fetchTopics() {
    fetch('/api/topics')
      .then(res => res.json())
      .then(data => {
        this.setState({topics: data});
       
      });
  }

  render() {
    return (
      <div> 
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div className="col-11">
                    <ul class="nav nav-tabs">
                        <li class="nav-item">
                        <Link to={{
                         pathname: '/',
                                state: {
                                username: this.state.username
                                }
                                }}>Dashboard</Link>
                        
                        </li>
                        
                        <li class="nav-item">
                            <a class="nav-link" href="posting">Posting</a>
                        </li>

                    </ul>
                </div>
                <div className="col-4">
                    <a onClick={this.logout} href="/login">Log Out</a>
                </div>
            </nav>
        <div className="container">
          <div className="row">
            <div className="col s5">
              <div className="card">
                <div className="card-content">
                  <form onSubmit={this.addTopic}>
                    <div className="row">
                      <div className="input-field col s12">
                        <input name="title" onChange={this.handleChange} value={this.state.title} type="text" placeholder="Task Title" autoFocus/>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <textarea name="description" onChange={this.handleChange} value={this.state.description} cols="30" rows="10" placeholder="Task Description" className="materialize-textarea"></textarea>
                      </div>
                    </div>

                    <button type="submit" className="btn light-blue darken-4">
                      Send 
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col s7">
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  { 
                    this.state.topics.map(topic => {
                      return (
                        <tr key={topic._id}>
                          <td>{topic.title}</td>
                          <td>{topic.description}</td>
                          <td>
                            <button onClick={() => this.deleteTopic(topic._id)} className="btn light-blue darken-4">
                              <i className="material-icons">delete</i> 
                            </button>
                            <button onClick={() => this.editTopic(topic._id)} className="btn light-blue darken-4" style={{margin: '4px'}}>
                              <i className="material-icons">edit</i>
                            </button>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default Posting;