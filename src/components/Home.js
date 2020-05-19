import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

import { auth } from '../config/firebase';

class Home extends React.Component {

    logout = (e) => {
        e.preventDefault();
        auth.signOut();
    }

    render() {

        const { user } = this.props.context;

        return (
            <div>
                <p>hello {user.username}</p>
                <Button color='primary' variant='contained' onClick={this.logout}>Deconnection</Button>
                <Link to='/profile'>Mon profil</Link>
            </div>
        );
    }
    
}

export default Home;