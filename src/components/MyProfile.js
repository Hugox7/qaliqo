import React from 'react';
import { Button, Avatar, Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { compose } from 'redux';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/core/styles'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import { DropzoneArea } from 'material-ui-dropzone'

import './myProfile.css';
import { uploadProfilPic } from '../config/firebase';
import * as listenerTypes from '../store/types/listener';


const styles = theme => ({
    large: {
        width: theme.spacing(12),
        height: theme.spacing(12),
    },
})


class MyProfile extends React.Component {

    state = {
        image: null,
        error: null,
        success: null,
        progress: 0,
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (!prevState.success && this.state.success) {
            setTimeout(() => {
                this.setState({
                    success: null,
                }, () => console.log(this.state));
            }, 3000);
        }
    }

    backHome = () => {
        this.props.history.push('/')
    }

    setError = (error) => {
        this.setState({ error }, () => console.log(this.state));
    }

    setSuccess = (success) => {
        this.setState({ success }, () => console.log(this.state));
    }

    setProgress = (progress) => {
        this.setState({ progress });
    }

    handleChange = (e) => {
        const image = e.target.files[0];
        if (image) {
            this.setState({ image });
        }
    }

    handleProfilePicUpload = async (e) => {
        e.preventDefault();
        const { image } = this.state;
        const { context, handlePhotoChangeListener } = this.props;
        await uploadProfilPic(
            image, 
            context.user, 
            this.setError, 
            this.setSuccess, 
            handlePhotoChangeListener,
            this.setProgress
        );
    }

    render() {

        const { user } = this.props.context;
        const { classes } = this.props
        console.log(this.props);

        return (
            <div id='profile'>
                <Grid container>
                    <Grid item xl={2} lg={2} md={1} sm={12} xs={12} />
                    <Grid item xl={8} lg={8} md={10} sm={12} xs={12} >
                        <div className='profile-content'>
                            <div id='profile-header'>
                                <h5>Mon profil</h5>
                                <Button onClick={this.backHome} size='small' variant='contained' color='primary'>Accueil</Button>
                            </div>
                            <div className='content-part'>
                                <h5 style={{ textAlign: 'center', margin: '15px 0 8px 0' }}>Modifier ma photo de profil</h5>
                                <div className='subpart'>
                                    <input type='file' onChange={this.handleChange} />
                                    <div>
                                        <Avatar className={classes.large} src={user.photo ? user.photo : null} />
                                    </div>
                                </div>
                                <Button 
                                    onClick={this.handleProfilePicUpload} 
                                    variant='contained' 
                                    color='primary' 
                                    disabled={!this.state.image || (this.state.progress > 0 && this.state.progress < 100)}
                                    size='small'
                                    startIcon={<CloudUploadIcon />}
                                >
                                    Upload
                                </Button>
                                <LinearProgress variant="determinate" value={this.state.progress} />
                            </div>
                        </div>
                    </Grid>
                </Grid>     
            </div>
        );
    } 
}

const mapDispatchToProps = (dispatch) => ({
    handlePhotoChangeListener: (data) => {
        dispatch({ type: listenerTypes.LISTENER, data })
    }, 
});

export default compose(
    withStyles(styles),
    connect(null, mapDispatchToProps),
)(MyProfile)