import React from 'react';
import Button from '@material-ui/core/Button';

import { auth } from '../config/firebase';

class Home extends React.Component {

    disconnect = (e) => {
        e.preventDefault();
        auth.signOut();
    }

    render() {

        const { user } = this.props.context;

        return (
            <div>
                <p>hello {user.username}</p>
                <Button color='primary' variant='contained' onClick={this.disconnect}>Deconnection</Button>
            </div>
        );
    }
    
}

export default Home;