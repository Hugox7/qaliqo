import React, { createContext } from 'react';
import { auth, getUserDocument }  from '../config/firebase';

export const UserContext = createContext({ user: null });

class UserProvider extends React.Component {

    state = {
        user: null,
    }

    componentDidMount = async () => {
        auth.onAuthStateChanged(async userAuth => {
            console.log('user ', userAuth)
            this.setState({ user: await getUserDocument(userAuth) });
        })
    }

    render() {
        return (
            <UserContext.Provider value={this.state.user}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}

export default UserProvider;