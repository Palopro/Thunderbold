import React, {Component} from 'react';

import './Main.css';

import Logo from '../Logo/Logo';
import LoginForm from '../LoginForm/LoginForm';
import Footer from '../Footer/Footer';

class Main extends Component {

    render() {
        return (
            <div className="bg-orange">
                <div className="container-fluid">
                    <div className="container">
                        <Logo/>
                        <LoginForm/>
                        <Footer/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;