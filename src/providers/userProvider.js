import React, { createContext } from 'react';
import { auth, firestore, getUserDocument }  from '../config/firebase';
import { connect } from 'react-redux';

export const UserContext = createContext({ user: null });

class UserProvider extends React.Component {

    state = {
        user: null,
        loading: true,
        authenticated: false,
        error: null,
        auth: null,
    }

    componentDidMount = async () => {
        try {
            auth.onAuthStateChanged(async user => {
                if (user) {
                    this.setState({
                        user: await getUserDocument(user),
                        auth: user,
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
            this.setState({
                error,
            });
        }
    }

    componentDidUpdate = async (prevProps, prevState) => {
        if (prevState.user && !this.state.user) {
            this.setState({ authenticated: false });
        }
        if (!prevProps.photoChange && this.props.photoChange) {
            this.updateUser();
        }
    }

    updateUser = async () => {
        const userId = auth.currentUser.uid;
        const userDocument = await firestore.doc(`users/${userId}`).get();
        const user = { ...userDocument.data() }
        this.setState({ user });
    }

    render() {
        return (
            <UserContext.Provider value={this.state}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}

const mapStateToProps = (state) => ({
    photoChange: state.listener.listen.photoChange,
});

export default connect(mapStateToProps, null)(UserProvider);