import React, { createContext } from 'react';
import { auth, getUserDocument }  from '../config/firebase';

export const UserContext = createContext({ user: null });

class UserProvider extends React.Component {

    state = {
        user: null,
        loading: true,
        authenticated: false,
    }

    componentDidMount = async () => {
        try {
            auth.onAuthStateChanged(async user => {
                if (user) {
                    this.setState({
                        user: await getUserDocument(user),
                        loading: false,
                        authenticated: true,
                    }, () => console.log(this.state));
                } else {
                    this.setState({
                        loading: false,
                        authenticated: false,
                    }, () => console.log(this.state));
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevState.user && !this.state.user) {
            this.setState({ authenticated: false });
        }
    }

    render() {
        return (
            <UserContext.Provider value={this.state}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}

export default UserProvider;