import React, {Component} from 'react';

import axios from 'axios';

import setAuthHeader from '../../utils/setAuthToken';
// css
import './LoginForm.css';
//FontAwesome
import FaCaterRight from 'react-icons/lib/fa/caret-right';
import ArrowRight from 'react-icons/lib/io/arrow-right-a';


class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: '',
            isLoading: false
        };


        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleUsernameChange(e) {
        this.setState({name: e.target.value});
    }

    handlePasswordChange(e) {
        this.setState({password: e.target.value});
    }

    signIn(e) {
        e.preventDefault();
        let payload = {
            name: this.state.name,
            password: this.state.password
        };

        axios.post('/login', payload)
            .then(function (response) {
                setAuthHeader.setHeader(response.data.token);

                // redirect to page List
                document.location.href = "/list";
            })
            .catch(function (error) {
                console.log(error);
            });

    }


    render() {
        return (
            <div className="row justify-content-center align-self-stretch d-flex">
                <div className="col col-sm-6 col-md-6 col-lg-4 col-xl-4 pt-2">
                    <form>
                        <label className="text-bg-black w-100 label-no-margin text-center mt-5">
                            <h2 className="display-6">Login</h2>
                        </label>

                        <div className="input-group">
                            <div className="input-group-prepend prepend-white">
                                        <span className="input-group-text input-text">
                                            <div><FaCaterRight/></div>
                                        </span>
                            </div>
                            <input type="text"
                                   className="form-control input-text"
                                   placeholder="Enter username"
                                   onChange={this.handleUsernameChange}
                            />
                        </div>

                        <div className="input-group">
                            <div className="input-group-prepend">
                                        <span className="input-group-text input-text">
                                            <div><FaCaterRight/></div>
                                        </span>
                            </div>
                            <input type="password" className="form-control input-text"
                                   placeholder="Enter password"
                                   onChange={this.handlePasswordChange}/>
                        </div>

                        <div className="col-12 d-flex justify-content-center">
                            <button type="button"
                                    className="btn btn-black button-down"

                                    onClick={(event) => this.signIn(event)}>
                                <span><ArrowRight/></span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };
}

export default LoginForm;