import React, {Component} from 'react';
import './Logo.css';

class Logo extends Component {
    render() {
        return (
            <div className="row pt-2 pb-2">
                <div className="col-12">
                    <img className="img-fluid img-transparent"
                         src={require('./thapawong_2.png')}
                         alt="logo"/>
                </div>
            </div>

        )

    };
}

export default Logo;