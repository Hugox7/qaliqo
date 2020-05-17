import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';
import { signIn } from '../config/firebase';
import { connect } from 'react-redux';
import * as errorTypes from '../store/types/error';
import { Alert } from '@material-ui/lab';
import CircularProgress from '@material-ui/core/CircularProgress';
import { UserContext } from '../providers/userProvider';

import './signIn.css';

class SignIn extends React.Component {
    static contextType = UserContext;

    state = {
        username: '',
        email: '',
        password: '',
        loading: false,
    }

    componentDidUpdate = (prevProps, prevState) => {

        //const { context } = this;

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
        const { handleLoginError } = this.props;
        e.preventDefault();
        this.setState({ loading: true });
        await signIn(this.state.email, this.state.password, handleLoginError, this.props.history);
        this.setState({ loading: false });
    }

    render() {
        return (
            <div id='sign-in'>
                <div id='sign-in-content'>
                    <div id='loading-div' ref={node => this.loadingRef = node}>
                        <CircularProgress color="primary" />
                    </div>
                    <h1>Qaliqo</h1>
                    <h3>Ma tissuthèque virtuelle</h3>
                    <p>Gérez vos stocks de tissus et d'accessoires, créez des projets, et partagez-les avec vos amis !</p>
                    <div id='form-part'>
                        <ValidatorForm
                            onSubmit={this.handleSubmit}
                        >
                            <div className='alert-part'>
                                {this.props.loginError &&
                                    <Alert onClose={() => this.props.handleLoginError(null)} severity="error">
                                        L'utilisateur n'existe pas ou le mot de passe est incorrect 
                                    </Alert>
                                }
                            </div>
                            <TextValidator 
                                onChange={this.handleChange}
                                type='email' 
                                size='small'
                                label='Votre adresse email'
                                name='email'
                                value={this.state.email}
                                validators={['required', 'isEmail']}
                                errorMessages={['Champ requis', 'Adresse mail non valide']}
                            />
                            <TextValidator 
                                onChange={this.handleChange}
                                type='password' 
                                size='small'
                                label='Votre mot de passe'
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
                                //disabled={this.state.loading}
                            >
                                Connection
                            </Button>
                        </ValidatorForm>
                        <div id="no-account">
                        <p style={{ textAlign: 'center' }}>
                            Vous n'avez pas de compte ? <Link to="/sign-up">Créez votre compte ici</Link>
                            <br />
                            <Link to="/password-reset">Mot de passe oublié?</Link>
                        </p>
                        </div>  
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loginError: state.error.handleError.loginError,
  });

const mapDispatchToProps = (dispatch) => ({
    handleLoginError: (data) => {
        dispatch({ type: errorTypes.SET_LOGIN_ERROR, data })
    }, 
});



export default connect(mapStateToProps, mapDispatchToProps)(SignIn);