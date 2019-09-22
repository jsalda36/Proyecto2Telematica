import React, { Component } from 'react';

import Dashboard from './components/dashboard';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import Posting from './components/posting'
import Signin from './components/signin'

class  App extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            username: "",
            
           
        }
    }
    
    render() { 
        return (  
            <Router>
                <div>
                    
                    <Route exact path="/" component={Dashboard} />
                    <Route path="/posting" component={Posting} />
                    <Route path="/login" component={Signin} />
                </div>
            </Router>
        );
    }
}
 
          

export default App;