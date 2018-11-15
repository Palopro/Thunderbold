import React, {Component} from 'react';
import './Footer.css';

class Footer extends Component {

    render() {
        return (
            <div className="row">
                <div className="navbar fixed-bottom">
                    <div className="mx-auto">
                        <a href="/" className=" text-center text-black">Forgotten access details?</a>
                    </div>
                </div>
            </div>
        )
    };
}

export default Footer;