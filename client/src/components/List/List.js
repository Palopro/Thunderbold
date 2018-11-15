import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Modal from 'react-modal';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

import {deleteUser, updateUser, userCreate, usersFetchData} from "../../actions/users";
import More from 'react-icons/lib/md/more-vert';
import Plus from 'react-icons/lib/fa/plus';

import './List.css';

Modal.setAppElement('#root');

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            firstName: '',
            lastName: '',
            domain: '',
            role: '',
            email: '',
            password: '',
            repPassword: '',
            passwordError: '',
            emailError: '',
            modalIsOpenCreate: false,
            modalIsOpenUpdate: false,
            selectedFile: []
        };

        this.handleDelete = this.handleDelete.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.openModalCreate = this.openModalCreate.bind(this);
        this.closeModalCreate = this.closeModalCreate.bind(this);

        this.openModalUpdate = this.openModalUpdate.bind(this);
        this.closeModalUpdate = this.closeModalUpdate.bind(this);

        this.handleModalUpdate = this.handleModalUpdate.bind(this);
        this.fileUploadHandler = this.fileUploadHandler.bind(this);

        this.uploadHandler = this.uploadHandler.bind(this);
    }

    onChange(e) {
        console.log({[e.target.name]: e.target.value});
        this.setState({[e.target.name]: e.target.value});
    }

    openModalCreate() {
        this.setState({modalIsOpenCreate: true});
    }

    closeModalCreate() {
        this.setState({modalIsOpenCreate: false});
    }

    handleModalUpdate(id) {
        this.setState({id: id});
        this.openModalUpdate();
    }

    openModalUpdate() {
        this.setState({modalIsOpenUpdate: true});
    }

    closeModalUpdate() {
        this.setState({modalIsOpenUpdate: false});
    }

    // get API
    componentDidMount() {
        this.props.fetchData();
    }

    validateEmail = () => {
        if (this.state.email.indexOf("@") === -1) {
            this.setState({emailError: "Please enter valid Email"});
        } else {
            this.setState({emailError: ''});
        }
    };

    validatePassword(pass, repPass) {
        if (pass === repPass) {
            this.setState({passwordError: ""});
            return true;
        } else {
            this.setState({passwordError: "Passwords must be same"});
            return false;
        }
    };

    onSubmit(e) {
        //e.preventDefault();
        let err = this.validateEmail();
        if (!err) {
            this.props.userCreate(this.state);
            this.defaultsStates();
        }
    }

    handleDelete = id => {
        this.props.userDelete(id);
    };

    // Set to default state
    defaultsStates = () => {
        this.setState({
            id: '',
            firstName: '',
            lastName: '',
            domain: '',
            role: '',
            email: '',
            password: '',
            repPassword: '',
            passwordError: '',
            emailError: '',
            modalIsOpenCreate: false,
            modalIsOpenUpdate: false,
            selectedFile: []
        });
    };

    //Update Action
    handleUpdate = (e) => {
        e.preventDefault();
        let res = this.validatePassword(this.state.password, this.state.repPassword);
        if (res) {
            e.preventDefault();
            let name = this.state.firstName + " " + this.state.lastName;
            let user = {
                id: this.state.id,
                name: name,
                email: this.state.email,
                password: this.state.password,
                domain: this.state.domain,
                avatar: this.state.selectedFile.name,
            };

            this.props.userUpdate(user);
            this.defaultsStates();
            this.closeModalUpdate();
        }
        this.defaultsStates();
    };

    fileUploadHandler = (event) => {
        let image = event.target.files[0];
        this.setState({selectedFile: image});
    };

    uploadHandler = (event) => {
        event.preventDefault();
        console.log(this.state.selectedFile.name);
        const formData = new FormData();
        formData.append('file', this.state.selectedFile);

        console.log("Image: %s", this.state.selectedFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        axios.post('/public', formData);
    };

    render() {
        const {firstName, lastName, domain, role, email, password, repPassword} = this.state;

        const style = {
            overlay: {
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.75)'
            },
            content: {
                position: 'absolute',
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                border: '1px solid #ccc',
                background: '#fff',
                borderRadius: '4px',
                transform: 'translate(-50%, -50%)'
            }
        };

        return (
            <div className="container-fluid container-list">
                <div className="container ">
                    <div className="row pt-5 pb-2">
                        <div className="col-6 col-sm-6 col-md-6">
                            {jwtDecode(localStorage.getItem('jwtToken')).user.role === 'admin' ?
                                <button className="btn btn-default btn-circle" onClick={this.openModalCreate}>
                                    <Plus/>
                                </button> : null
                            }
                            <Modal
                                isOpen={this.state.modalIsOpenCreate}
                                onRequestClose={this.closeModalCreate}
                                style={style}>
                                <div className="container">
                                    <p className="h2">Add new User</p>

                                    <form onSubmit={this.onSubmit}>
                                        <div className="form-row pt-1 pb-1">
                                            <div className="col">
                                                <input type="text" className="form-control"
                                                       placeholder="Enter first name"
                                                       name="firstName"
                                                       onChange={this.onChange}
                                                       value={firstName}/>
                                            </div>
                                            <div className="col">
                                                <input type="text" className="form-control"
                                                       placeholder="Enter last name"
                                                       name="lastName"
                                                       onChange={this.onChange}
                                                       value={lastName}/>
                                            </div>
                                        </div>
                                        <div className="form-row pt-1 pb-1">
                                            <div className="col">
                                                <input type="text" className="form-control"
                                                       placeholder="Enter domain"
                                                       name="domain"
                                                       onChange={this.onChange}
                                                       value={domain}/>
                                            </div>
                                            <div className="col">
                                                <input type="text" className="form-control"
                                                       placeholder="Enter role"
                                                       name="role"
                                                       onChange={this.onChange}
                                                       value={role}/>
                                            </div>
                                        </div>
                                        <div className="form-row pt-1 pb-1">
                                            <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                                <input type="text" className="form-control"
                                                       placeholder="Enter e-mail"
                                                       name="email"
                                                       onChange={this.onChange}
                                                       value={email}/>
                                                <small id="emailHelp"
                                                       className="form-text text-danger">{this.state.emailError}
                                                </small>
                                            </div>
                                        </div>
                                        <div className="form-row pt-1 pb-1">
                                            <div className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                                <input type="password" className="form-control"
                                                       placeholder="Enter password"
                                                       name="password"
                                                       onChange={this.onChange}
                                                       value={password}/>
                                            </div>
                                        </div>
                                        <div className="form-row float-right pt-1 pb-1">
                                            <button className="btn btn-outline-dark mr-3"

                                                    onClick={this.closeModalCreate}>
                                                Cancel
                                            </button>
                                            <button className="btn btn-primary"
                                                    >
                                                Add user
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </Modal>
                        </div>
                        <div className="col-6 col-sm-6 col-md-6 ">
                            <img className="img-fluid avatar float-right"
                                 src={jwtDecode(localStorage.getItem('jwtToken')).user.avatar}
                                 alt="avatar"/>
                        </div>
                    </div>

                    <div className="row pb-2 pt-2">
                        <div className="col-6">
                            <div>Users</div>
                        </div>
                        {/*                        <div className="col-2">
                            <div>All Roles</div>
                        </div>
                        <div className="col-2">
                            <div>All domains</div>
                        </div>
                        <div className="col-2">
                            <div>Active users</div>
                        </div>*/}
                    </div>

                    <div className="row">
                        <div className="col-4">
                            <div className="text-center">Name</div>
                        </div>
                        <div className="col-2">
                            <div>Domain</div>
                        </div>
                        <div className="col-6">
                            <div>Last signed in</div>
                        </div>
                    </div>

                    {this.props.users.map((user) => (
                        <div className="row pt-2 pb-2" key={user.id}>
                            <div className="col-2 text-right">
                                <img className="img-fluid avatar" src={user.avatar} alt="avatar"/>
                            </div>
                            <div className="col-2">
                                <div>{user.name}</div>
                            </div>
                            <div className="col-2">
                                <div>{user.domain}</div>
                            </div>
                            <div className="col-4">
                                <div>{user.lastSignedIn}</div>
                            </div>
                            <div className="col-2 ">
                                <div className="dropdown">
                                    <button className="btn btn-outline-dark" type="button"
                                            id={user.id} data-toggle="dropdown">
                                        <div><More/></div>
                                    </button>
                                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby={user.id}
                                         value={user.id}>
                                        <button className="dropdown-item" type="button">Reset Password</button>

                                        <button className="dropdown-item" type="button"
                                                onClick={(event) => this.handleModalUpdate(user.id)}
                                                data-id={user.id}>
                                            Update user
                                        </button>
                                        <Modal
                                            data-id={user.id}
                                            isOpen={this.state.modalIsOpenUpdate}
                                            onRequestClose={this.closeModalUpdate}
                                            style={style}>
                                            <div className="container">
                                                <p className="h2">Update</p>

                                                <form data-id={user.id}>
                                                    <div className="form-row pt-1 pb-1">
                                                        <div className="col">
                                                            <input type="file" name="file"
                                                                   className="btn btn-link mr-1"
                                                                   onChange={this.fileUploadHandler}/>
                                                            <button className="btn btn-info ml-1"

                                                                    onClick={(event) => this.uploadHandler(event)}>
                                                                Upload
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="form-row pt-1 pb-1">
                                                        <div className="col">
                                                            <input type="text" className="form-control"
                                                                   placeholder="Enter first name"
                                                                   name="firstName"
                                                                   onChange={this.onChange}
                                                                   value={firstName}/>
                                                        </div>
                                                        <div className="col">
                                                            <input type="text" className="form-control"
                                                                   placeholder="Enter last name"
                                                                   name="lastName"
                                                                   onChange={this.onChange}
                                                                   value={lastName}/>
                                                        </div>
                                                    </div>
                                                    <div className="form-row pt-1 pb-1">
                                                        <div
                                                            className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                                            <input type="text" className="form-control"
                                                                   placeholder="Enter e-mail"
                                                                   name="email"
                                                                   onChange={this.onChange}
                                                                   value={email}/>
                                                        </div>
                                                    </div>
                                                    <div className="form-row pt-1 pb-1">
                                                        <div
                                                            className="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                                            <input type="password" className="form-control"
                                                                   placeholder="Enter password"
                                                                   name="password"
                                                                   onChange={this.onChange}
                                                                   value={password}/>
                                                        </div>
                                                    </div>
                                                    <div className="form-row pt-1 pb-1">
                                                        <div className="col-12">
                                                            <input type="password" className="form-control"
                                                                   placeholder="Repeat password"
                                                                   name="repPassword"
                                                                   onChange={this.onChange}
                                                                   value={repPassword}/>
                                                            <small id="passHelp"
                                                                   className="form-text text-danger">{this.state.passwordError}
                                                            </small>
                                                        </div>
                                                    </div>
                                                    <div className="form-row float-right pt-1 pb-1">
                                                        <button className="btn btn-outline-dark mr-3"
                                                                onClick={this.closeModalUpdate}>
                                                            Cancel
                                                        </button>
                                                        <button className="btn btn-primary"
                                                                key={user.id}
                                                                onClick={(e) => this.handleUpdate(e)}>
                                                            Update
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </Modal>

                                        <button className="dropdown-item" type="button"
                                                onClick={(e) => this.handleDelete(user.id, e)}>Delete user
                                        </button>
                                        <button className="dropdown-item" type="button">Suspend user</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

List
    .propTypes = {
    userCreate: PropTypes.func.isRequired,
    fetchData: PropTypes.func.isRequired,
    userUpdate: PropTypes.func.isRequired,
    userDelete: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired,
    hasError: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
};

const
    mapStateToProps = (state) => {
        return {
            users: state.users,
            hasError: state.usersHasError,
            hasDeleted: state.hasDeleted,
            hasUpdated: state.hasUpdated,
            isLoading: state.usersHasError,
        };
    };

const
    mapDispatchToProps = (dispatch) => {
        return {
            userCreate: (user) => dispatch(userCreate(user)),
            fetchData: (url) => dispatch(usersFetchData(url)),
            userDelete: (id) => dispatch(deleteUser(id)),
            userUpdate: (id) => dispatch(updateUser(id)),
        };
    };

export default connect(mapStateToProps, mapDispatchToProps)(List);