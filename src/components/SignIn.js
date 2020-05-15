import React from 'react';
import { Link } from 'react-router-dom';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';
import { signIn } from '../config/firebase';

import './signIn.css';

class SignIn extends React.Component {

    state = {
        username: '',
        email: '',
        password: '',
        loading: false,
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        this.setState({ loading: true });
        await signIn(this.state.email, this.state.password);
    }

    render() {
        return (
            <div id='sign-in'>
                <div id='sign-in-content'>
                    <h2>Ma tissuthèque virtuelle</h2>
                    <p>Gérez vos stocks de tissus et d'accessoires, créez des projets, et partagez-les avec vos amis !</p>
                    <div id='form-part'>
                        <ValidatorForm
                            onSubmit={this.handleSubmit}
                        >
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
                                disabled={this.state.loading}
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

export default SignIn;