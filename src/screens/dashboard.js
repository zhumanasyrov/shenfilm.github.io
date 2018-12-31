import React from 'react'
import {
    Paper, Button, Typography, Grid, Card, CardActions, CardActionArea, CardContent, CardMedia, CardHeader
} from "@material-ui/core";
import AppStorage from "../services/AppStorage";
import {
    URL_LIST,
    URL_SEARCH,
    URL_DETAIL,
    URL_PERSON,
    URL_CAST,
    URL_VIDEO,
    API_KEY,
    URL_IMG,
    IMG_SIZE_LARGE,
    API_KEY_ALT,
    LANG_EN
} from '../const';
import axios from 'axios';


export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            movieList: [],
            lang: AppStorage.get('lang') || 'ru',
        };
    }

    componentDidMount() {
        this.getMovie();
    }

    getMovie = () => {
        axios
            .get(URL_LIST + '' + API_KEY + LANG_EN)
            .then(({data}) => {
                this.setState({
                    movieList: data.results
                });
            })
            .catch((err) => {
                console.log("ERROR IN DASHBOARD WHERE AXIOS GET ALL MOVIE");
            })
    };

    render() {

        const {movieList} = this.state;
        console.log(movieList);

        this.MovieLists = movieList && movieList.map((movie) =>
            <Grid key={movie.id} item xs={6} sm={4} md={4} lg={2}>
                <Card className="card">
                    <CardActionArea>
                        <CardMedia className="content">
                            <div className="content-overlay"></div>
                            <img src={URL_IMG + IMG_SIZE_LARGE + movie.poster_path} className="content-image"/>
                            <div className="content-details fadeIn-bottom">
                                <Typography variant="h6" className="content-title">{movie.title}</Typography>
                                <Typography component="p" className="content-text">{movie.vote_average}</Typography>
                            </div>
                        </CardMedia>
                    </CardActionArea>
                </Card>
            </Grid>
        );

        return (
            <Grid container spacing={16} className="dashboard">

                {this.MovieLists}
            </Grid>
        );
    }
}


// https://image.tmdb.org/t/p//uTVGku4LibMGyKgQvjBtv3OYfAX.jpg
// https://image.tmdb.org/t/p/w342//i2dF9UxOeb77CAJrOflj0RpqJRF.jpg
// https://image.tmdb.org/t/p/w342//rGfGfgL2pEPCfhIvqHXieXFn7gp.jpg
