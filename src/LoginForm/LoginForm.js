import React, { Component } from 'react';
import axios from 'axios';

import Logo from '../components/Logo/Logo';

class LoginForm extends Component {

    state = {
        phoneNumber: "",
        password: "",
        showErrorMessage: false,
        errorMessage: "",
        phoneError: "",
        passwordError: ""
    }

    phoneNumberHandler = (event) => {
        this.setState({phoneNumber: event.target.value})
    }

    passwordHandler = (event) => {
        this.setState({password: event.target.value})
    }

    onSubmitHandler = () => {
        if (this.state.phoneNumber==="" && this.state.password==="") {
            this.setState({showErrorMessage: true,
                           errorMessage: "Please fill Phone Number and Password fields!"})
        }

        if (this.state.phoneNumber==="" && this.state.password!=="") {
            this.setState({showErrorMessage: true,
                           errorMessage: "Please fill Phone Number field!"})
        }

        if (this.state.phoneNumber!=="" && this.state.password==="") {
            this.setState({showErrorMessage: true,
                           errorMessage: "Please fill Password field!"})
        }

        if (this.state.phoneNumber!=="" && this.state.password!=="") {
            const payload = {
                username: this.state.phoneNumber,
                password: this.state.password
            };
            const accessToken = '976d0331e8324e2ebec371d2a35eaba1c8868af5'
           
            axios.post('http://127.0.0.1:8080/rest-auth/login/', payload, 
                        {headers: {"Authorization": accessToken, "Content-Type": "application/json"}})
                       .then((res) => {
                           if (res.data.is_success) {
                               this.setState({showErrorMessage: false});
                               this.props.history.push("/repackaging_form");
                           }
                       })
                       .catch(error => {
                           console.log(error);
                           this.setState({showErrorMessage: true, errorMessage: "Please enter the correct phone number and password for a staff account. Note that both fields may be case-sensitive."})
                       });
            
        }
    }

    // componentDidMount() {
    //     const payload = {
    //         username: this.state.phoneNumber,
    //         password: this.state.password
    //     };
    //     const accessToken = '976d0331e8324e2ebec371d2a35eaba1c8868af5'
       
    //     axios.post('http://127.0.0.1:8080/rest-auth/login/', payload, 
    //                 {headers: {"Authorization": accessToken, "Content-Type": "application/json"}})
    //                .then((res) => {
    //                    console.log(res.data)
    //                })
    //                .catch(error => {
    //                    console.log(error.data);
    //                });
    // }


    render() {
        let error = this.state.showErrorMessage ? 
    <p style={{color: "red", fontWeight: "bold", marginTop: "10px", marginLeft: "16px"}}>{this.state.errorMessage}</p>
                    : null
        return (
            <div style={{width: "500px", margin: "auto"}} justifyContent="center" className="z-depth-1">
                <span className="d-block p-3 text-white" style={{backgroundColor: "#417690", marginTop: "170px"}}><Logo /></span>
                {error}
                <div className="form-group mt-4 ml-3 mr-4">
                    <label htmlFor="formGroupExampleInput" style={{fontWeight: "bold"}}>Phone Number :</label>
                    <input type="text" style={{backgroundColor: "#E8F0FE"}} className="form-control" onChange={this.phoneNumberHandler}/>

                    <label htmlFor="formGroupExampleInput" style={{fontWeight: "bold"}}>Password :</label>
                    <input type="text" style={{backgroundColor: "#E8F0FE"}} className="form-control" onChange={this.passwordHandler}/>
                </div>
                <button type="button" onClick={this.onSubmitHandler} style={{width: "130px", marginLeft: "200px", fontWeight: "bold"}} className="btn btn-info">Log in</button>
            </div>
        )
    }
}


export default LoginForm;