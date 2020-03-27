import React, { Fragment,Component } from 'react'
import {Route} from 'react-router-dom'
import Login from './login'
import Register from './register'

class AuthenticationApp extends Component
{
    render()
    {
        return(
            <Fragment>
                <Route exact path="/login" component ={(props)=> <Login userId = {this.props.userId} username = {this.props.username} isAuthenticated = {this.props.isAuthenticated} {...props} /> } />
                <Route exact path="/register" component = {() => <Register /> }  />
            </Fragment>
        )
    }
}
export default AuthenticationApp