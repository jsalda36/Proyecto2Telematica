import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: props.location.state.username,
            topics:[],
            comments:[],
            commentsid: []
           
        }
        
    }
    componentDidMount = () => this.fetchData();
    
    
    fetchData = () => {
        console.log("in fet");
        fetch('/api/topics')
          .then(res => res.json())
          .then(data => {
            this.setState({topics: data});
            
          });
        fetch('/api/comments')
          .then(res => res.json())
          .then(data => {
            this.setState({comments: data});
            
          });

          var temp = this.state.topics.map((value,index)=>{
              return " "
          })
          this.setState({commentsid:temp})

          console.log(this.state.commentsid)
    }


    addcomment = (top, index) => {
        
        var newComment = ({  "username":this.state.username,
                                    "topic":top,
                                    "description":this.state.commentsid[index],
                                    "date": (new Date()).toLocaleString()});
        

        fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify(newComment),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })
            .then(res => res.json())
            .then(data => {

              
              this.fetchData();
            })
            .catch(err => console.error(err));
        
        
    }
    onChange = e => {
        e.preventDefault();
        var num = parseInt(e.target.name.substring(5))
        var tempcomment=this.state.commentsid;
        tempcomment[num]=e.target.value;
        this.setState({ commentsid : tempcomment });
        
    }

    render() {
        var topicomment = null;
        const cards =
            this.state.topics.map((value, index) => {

                const topicommentfilter = this.state.comments.filter((comment) => comment["topic"] === value["_id"]);
                topicomment = topicommentfilter.map((value1, index1) => {
                    return <div className="card  p-1 m-4 col-sm-6">
                        <div className="card-body">
                            <h6 className="card-title text-center">{value1["description"]}</h6>
                            <p className="card-text text-center">@{value1["username"]}</p>
                            <p className="card-subtitle mb-2 text-muted text-center">{value1["date"]}</p>

                        </div>
                    </div>
                });

                return <div>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div className="col-11">
                    <ul class="nav nav-tabs">
                        <li class="nav-item">
                            <a class="nav-link active" href="/">Dashboard</a>
                        </li>
                        
                        <li class="nav-item">
                        <Link to={{
                         pathname: '/posting',
                                state: {
                                username: this.state.username
                                }
                                }}>Make Posts</Link>
                        </li>

                    </ul>
                </div>
                <div className="col-4">
                    <a href="">Log Out</a>
                </div>
            </nav>
                    <div className="card p-1 m-4">
                        <div className="card-body">
                            <h4 className="card-title text-center">{value["title"]}</h4>
                            <p className="card-subtitle mb-2 text-muted text-center">@{value["username"]}</p>
                            <p className="card-text text-center">{value["description"]}</p>
                            <p className="card-text text-center">{value["date"]}</p>

                        </div>
                    </div>
                    {topicomment}
                    <div>
                        <div className="card  m-4 col-sm-6">
                            <div className="card-body">
                                <h4 className="card-title text-center">Comment</h4>
                                
                                    <div className="input-field col-12 text-center">
                                        <input onChange={this.onChange} className="col-12" name={"input"+index} value={this.state.commentsid[index]} type="text"></input>
                                    </div>

                                    <div className="col-s12 text-center mt-2">
                                        <button onClick={() => this.addcomment(value["_id"],index)}
                                            className="col-8 btn  btn-danger waves-effect waves-light hoverable blue accent-3">   
                                            Send
                                        </button>
                                    </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            });

        return (
            <div className="row">
                <div className="col-sm-10 mx-auto">
                    {cards}
                </div>
            </div>
        );

    }





}



export default Dashboard;