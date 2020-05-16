import React, { createContext } from 'react';
import { auth, getUserDocument }  from '../config/firebase';

export const UserContext = createContext({ user: null });

class UserProvider extends React.Component {

    state = {
        user: null,
    }

    componentDidMount = async () => {
        auth.onAuthStateChanged(async userAuth => {
            this.setState({ user: await getUserDocument(userAuth) }, () => console.log('user ', this.state.user));
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