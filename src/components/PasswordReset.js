import React from 'react';
import { connect } from 'react-redux';
import { Alert } from '@material-ui/lab';
import { Button } from '@material-ui/core';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { Link } from 'react-router-dom';


import './passwordReset.css';
import * as errorTypes from '../store/types/error';
import { resetPassword } from '../config/firebase';

class PasswordReset extends React.Component {
    
    state = {
        email: '',
        emailHasBeenSent: false,
        loading: false,
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    setEmailHasBeenSent = (bool) => {
        this.setState({ emailHasBeenSent: bool });
    }

    sendMail = async (e) => {
        e.preventDefault();

        const { email } = this.state;
        const { handleResetPasswordError } = this.props;
        this.setState({ loading: true });
        await resetPassword(email, this.setEmailHasBeenSent, handleResetPasswordError);
        this.setState({ loading: false });
    }

    render() {
        return (
            <div id='password-reset'>
                <div id='password-reset-content'>
                    <h2>Vous avez oublié mot de passe ?</h2>
                    <p>Confirmez votre adresse email ci-dessous et nous vous enverrons un lien afin de pouvoir le réinitialiser.</p>
                    <div id='form-part'>
                        <ValidatorForm onSubmit={this.sendMail}>
                            {this.props.resetPasswordError && 
                                <Alert 
                                    severity="error" 
                                    onClose={() => this.props.handleResetPasswordError(null)}
                                    style={{ marginBottom: '30px' }}
                                >
                                    {this.props.resetPasswordError}
                                </Alert>
                            }
                            {this.state.emailHasBeenSent &&
                                <Alert 
                                    severity="success" 
                                    onClose={() => this.setEmailHasBeenSent(false)}
                                    style={{ marginBottom: '30px' }}
                                >
                                    Un email vous a été envoyé à l'adresse {this.state.email}
                                </Alert>
                            }
                            <TextValidator
                                onChange={this.handleChange}
                                type='email' 
                                size='small'
                                label='Votre adresse email'
                                name='email'
                                value={this.state.email}
                                validators={['required', 'isEmail']}
                                errorMessages={['Champ requis', 'Adresse mail non valide']}
                            >

                            </TextValidator>
                            <Button
                                type='submit' 
                                variant='contained' 
                                color='primary' 
                                style={{ marginTop: '40px', borderRadius: '20px', width: '100%' }}
                                disabled={this.state.loading}
                            >
                                Réinitialiser
                            </Button>
                        </ValidatorForm>
                    </div>
                    <div id='back'>
                        <Link to='/'>En fait je m'en souviens</Link>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    resetPasswordError: state.error.handleError.resetPasswordError,
});

const mapDispatchToProps = (dispatch) => ({
    handleResetPasswordError: (data) => {
        dispatch({ type: errorTypes.SET_RESET_PASSWORD_ERROR, data })
    }, 
});

export default connect(mapStateToProps, mapDispatchToProps)(PasswordReset);