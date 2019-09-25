
import React, { Component } from 'react'

class Signin extends Component {
   
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password:'',
            usernamer: "",
            passwordr1:'',
            passwordr2:'',
            errorl:'',
            errorr:''
            
        }
        this.login = this.login.bind(this); 
        this.register = this.register.bind(this);
    }

    onChange = e =>  this.setState({ [e.target.id] : e.target.value });
    
    
   
    componentDidMount = () => {
       
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
                    if (!data.error){


                        this.props.history.push('/')
                    }
                })
                .catch(err => console.error(err));
        }
    }
    
    login = (e) =>{
        e.preventDefault();
        console.log("en login")
        var json = {
            'username':this.state.username,
            'password': this.state.password
        }

        fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify(json),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })
            .then(res => res.json())
            .then(data => {
                console.log(data.token)
                localStorage.setItem('token', data.token);
              
                
                if (!data.username){ 

                    if (!data.password){
                        
                        if (!data.usernamenotfound){
                            
                            if (!data.passwordincorrect){

                                this.props.history.push('/')

                            }else{
                                this.setState({errorl:data.passwordincorrect});
                            }

                        }
                        else{
                            this.setState({errorl:data.usernamenotfound});
                        }

                    }else{
                        this.setState({errorl:data.password});
                    }

                }else{
                    this.setState({errorl:data.username});
                }
                
            
            })
            .catch(err => console.error(err));
        }
    
   
    register = (e) =>{
        e.preventDefault();
        var json = {
            'username':this.state.usernamer,
            'password': this.state.passwordr1,
            'password2': this.state.passwordr2
        }

        fetch('/api/users/register', {
            method: 'POST',
            body: JSON.stringify(json),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (!data.usernamer){ 

                    if (!data.passwordr){
                        
                            if (!data.password2r){

                               this.setState({username:this.state.usernamer, password:this.state.passwordr1})
                               this.login(e);

                            }else{
                                this.setState({errorr:data.password2r});
                            }

                    }else{
                        this.setState({errorr:data.passwordr});
                    }

                }else{
                    this.setState({errorr:data.usernamer});
                }

               
            })
            .catch(err => console.error(err));
        }
    
  
    render(){
        
        
        return (
            <div className="row m-2 p-2 float-center">
                
                <div class="card col-5 m-3 p-3">
                <h5 className="card-title disabled text-center">Log in</h5>
                    <div class="card-body">
                        <div class="row">
                            <form class="col s12">
                                <div class="row">
                                    <div class="input-field col s6">
                                    <label for="username" >Username</label>
                                        <input  onChange={this.onChange} id="username" name="username" type="text" class="validate"></input>
                                    </div>
                                </div>
                                
                                <div class="row">
                                    <div class="input-field col s12">
                                    <input onChange={this.onChange} id="password" name="password" type="password" class="validate"></input>
                                    <label for="password">Password</label>
                                    </div>
                                </div>
                                <div class="row">
                                    
                                    <input   onClick={this.login} type="submit" value="Log in" class="btn btn-primary"></input>
                                    
                                </div>
                            
                            </form>

                        </div>
                        <footer class="blockquote-footer"><b>{this.state.errorl}</b> </footer>
                    </div>
                    
                </div>

                <div class="card col-6 m-3 p-3 ">
                <h5 className="card-title disabled text-center">Sign up</h5>
                <div class="card-body">
                    <div class="row">
                        <form class="col s12">
                            <div class="row">
                                <div class="input-field col s6">
                                    <label for="usernamer">Username</label>
                                    <input id="usernamer" onChange={this.onChange} name="usernamer" type="text" class="validate"></input>
                                </div>
                            </div>
                            
                            <div class="row">
                                <div class="input-field col s12">
                                    <input id="passwordr1" name="passwordr1" onChange={this.onChange} type="password" class="validate"></input>
                                    <label for="passwordr1">Password</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s12">
                                    <input id="passwordr2" name="passwordr2" onChange={this.onChange} type="password" class="validate"></input>
                                    <label for="passwordr2">Confirm Password</label>
                                </div>
                            </div>
                            <div class="row">
                                
                                <input onClick={this.register} type="submit" value="Sign up" class="btn btn-primary"></input>
                                
                            </div>
                        
                        </form>

                    </div>
                    <footer class="blockquote-footer"><b>{this.state.errorr}</b> </footer>
                </div>
            </div>
            </div>
        );
    }
}

export default Signin;