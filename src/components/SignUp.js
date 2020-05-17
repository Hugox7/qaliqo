import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Alert } from '@material-ui/lab';


import './signUp.css';
import { signUp } from '../config/firebase';
import * as errorTypes from '../store/types/error';

class SignUp extends React.Component {

    state = {
        username: '',
        email: '',
        password: '',
        loading: false,
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (!prevState.loading && this.state.loading) {
            ReactDOM.findDOMNode(this.loadingRef).style.visibility='visible';
        }
        if (prevState.loading && !this.state.loading) {
            ReactDOM.findDOMNode(this.loadingRef).style.visibility='hidden';
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = async (e) => {
        const {email, username, password} = this.state;
        e.preventDefault();
        this.setState({ loading: true });
        await signUp(email, password, username, this.props.handleSignupError);
        this.setState({ loading: false });
        
    }

    render() {

        return (
            <div id='sign-up'>
                <div id='sign-up-content'>
                    <div id='loading-sign-up' ref={node => this.loadingRef = node}>
                       <CircularProgress color='primary' /> 
                    </div>
                    <p>Créez votre compte gratuitement</p>
                    <div id='form-part'>
                        <ValidatorForm
                            onSubmit={this.handleSubmit}
                        >
                            <div className='alert-part'>
                                {this.props.signupError &&
                                    <Alert onClose={() => this.props.handleSignupError(null)} severity="error">
                                        L'utilisateur existe déjà
                                    </Alert>
                                }
                            </div>
                            <TextValidator 
                                onChange={this.handleChange}
                                type='text' 
                                size='small'
                                label="Nom d'utilisateur"
                                name='username'
                                value={this.state.username}
                                validators={['required']}
                                errorMessages={['Champ requis']}
                            />
                            <TextValidator 
                                onChange={this.handleChange}
                                type='email' 
                                size='small'
                                label='Adresse email'
                                name='email'
                                value={this.state.email}
                                validators={['required', 'isEmail']}
                                errorMessages={['Champ requis', 'Adresse mail non valide']}
                            />
                            <TextValidator 
                                onChange={this.handleChange}
                                type='password' 
                                size='small'
                                label='Mot de passe'
                                name='password'
                                value={this.state.password}
                                validators={['required']}
                                errorMessages={['Champ requis']}
                            />
                            <Button 
                                type='submit' 
                                variant='contained' 
                                color='primary' 
                                style={{ marginTop: '60px', borderRadius: '20px', width: '100%' }}
                                disabled={this.state.loading}
                            >
                                Créez votre compte
                            </Button>
                        </ValidatorForm>
                        <div id="has-account">
                        <p style={{ textAlign: 'center' }}>
                            Vous avez déjà un compte ? <Link to='/'>Connectez-vous ici</Link>
                        </p>
                        </div>  
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    signupError: state.error.handleError.signupError,
  });

const mapDispatchToProps = (dispatch) => ({
    handleSignupError: (data) => {
        dispatch({ type: errorTypes.SET_SIGNUP_ERROR, data })
    }, 
});


export default connect(mapStateToProps, mapDispatchToProps)(SignUp);