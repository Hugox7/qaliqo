import React from 'react';
import { Link } from 'react-router-dom';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import './signUp.css';
import { signUp } from '../config/firebase';

class SignUp extends React.Component {

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
        const {email, username, password} = this.state;
        e.preventDefault();
        this.setState({ loading: true });
        await signUp(email, password, username, this.props.history);
        
    }

    render() {

        return (
            <div id='sign-up'>
                <div id='sign-up-content'>
                    <div id='loading-div'>
                       <CircularProgress color='primary' /> 
                    </div>
                    <p>Créez votre compte gratuitement</p>
                    <div id='form-part'>
                        <ValidatorForm
                            onSubmit={this.handleSubmit}
                        >
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

export default SignUp