import React, {Component} from 'react';
import {Grid, Typography, Card, IconButton, LinearProgress} from "@material-ui/core";
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipNextIcon from '@material-ui/icons/SkipNext';


export default class MusicPlayer extends Component {
    constructor(props) {
        super(props);
    }

    pauseSong() {
        const csrftoken = getCookie('csrftoken');

        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            }
        };
        fetch('/spotify/pause/', requestOptions);
    }

    playSong() {
        const csrftoken = getCookie('csrftoken');

        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            }
        };
        fetch('/spotify/play/', requestOptions);
    }

    skipSong() {
        const csrftoken = getCookie('csrftoken');

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            }
        };
        fetch('/spotify/skip/', requestOptions);
    }

    render () {
        const songProgress = (this.props.time/this.props.duration) * 100;

        return (
            <Card>
                <Grid container alignItems={'center'} align={'center'}>
                    <Grid item xs={4}>
                        <img src={this.props.image_url} height={'100%'} width={'100%'}/>
                    </Grid>

                    <Grid item xs={8}>
                        <Typography component={'h5'} variant={'h5'}>
                            {this.props.title}
                        </Typography>
                        <Typography color={'textSecondary'} variant={'subtitle1'}>
                            {this.props.artist}
                        </Typography>
                        <div>
                            <IconButton color={'primary'} onClick={() => {
                                this.props.is_playing ? this.pauseSong() : this.playSong();
                            }}>
                                {this.props.is_playing ? <PauseIcon/> : <PlayArrowIcon/>}
                            </IconButton>
                            <IconButton color={'primary'} onClick={() => this.skipSong()}>
                                {this.props.votes} / {this.props.votes_required}
                                <SkipNextIcon/>
                            </IconButton>
                        </div>
                    </Grid>
                </Grid>
                <LinearProgress variant={'determinate'} value={songProgress}/>
            </Card>
        )
    }

}
