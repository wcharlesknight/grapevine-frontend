import React, {Component} from 'react'

class Login extends Component{

  state= {
    username: "",
    password: "",
  }

  handleChange = (e) => {
    let { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

    
  render() {
    return(
        
      <div className="Login">
        <form onSubmit={(e) => this.props.handleLoginOrSignup(e, this.state)}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <br />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>

    )
  }
}

export default Login 