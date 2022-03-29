import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { AppContext } from "../AppContext";
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export interface Details {
    adult?: boolean
    poster_path?: string
    release_date?: Date
    overview?: string
    vote_average?: number
    title?: string
    belongs_to_collection?: Array<any>
}

export const TicketPurchase = () => {
    const navigate = useNavigate();
    const Params = useParams();
    const [movieDetails, setMovieDetails] = useState<Details>({});
    const [showingform, setShowingform] = useState(false);
    const [showingExisting, setshowingExisting] = useState(false);
    const [numTickets, setnumTickets] = useState(0);
    const { MoviesWatched, setMoviesWatched, setLocation } = useContext(AppContext);

    const Existing = (araay: Array<any>) => {
        const tamp: Array<any> = [...araay];
        const exist = tamp.findIndex(i => i.id === Params.id)
        return exist
    }

    const loadMovieList = () => {
        axios
            .get(`https://api.themoviedb.org/3/movie/${Params.id}?api_key=119d9cdec7ce2d08f75e28d8304ea10e&language=he-IL`)
            .then(res => {
                let tampMovieDetails: object = res.data;
                setMovieDetails(tampMovieDetails);
            });
    };

    const AddMoviesWatched = (name: string) => {
        if (numTickets < 1) { alert("חובה לבחור לפחות כרטיס 1") }
        else {
            const tampMoviesWatched: Array<any> = [...MoviesWatched];
            const exist = Existing(MoviesWatched)
            if (exist !== -1) {
                tampMoviesWatched[exist].numTickets += 5;
            }
            else {
                tampMoviesWatched.push({ id: Params.id, name: name, purchaseDate: new Date().toISOString().slice(0, 10), numTickets: numTickets });
            }
            setMoviesWatched(tampMoviesWatched);
            setShowingform(false);
            setTimeout(() => {
                navigate('/');
                setLocation(0);
            }, 1000 * 10);
        }
    }

    useEffect(() => {
        if (Params) {
            loadMovieList();
            if (Existing(MoviesWatched) !== -1) {
                setshowingExisting(true)
            }
            else {
                setShowingform(true)
            }
        } else {
            navigate('/')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div style={{ margin: '25px 0 130px' }}>
            {showingExisting && <div style={{ width: ' 300px', margin: 'auto', padding: '25px', marginTop: '75px' }}>
                <Alert severity="warning">
                    <AlertTitle>לתשומת ליבכם</AlertTitle>
                    יש לך כבר כרטיסים לסרט זה <strong>האם תרצה להוסיף עוד ?</strong>
                    <br></br>
                    <br></br>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
                        <Button variant="outlined" onClick={() => { setshowingExisting(false); setShowingform(true) }}>כן</Button>
                        <Button variant="outlined" onClick={() => navigate('/')}>לא</Button>
                    </div>
                </Alert>
            </div>
            }
            {
                showingform && <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
                    <img src={`http://image.tmdb.org/t/p/w342${movieDetails.poster_path}`} alt={movieDetails.title} />
                    <Card sx={{ maxWidth: 345, }}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                <strong> שם: </strong>{movieDetails.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <strong>   תיאור הסרט: </strong>{movieDetails.overview}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <strong> שנת יציאה: </strong>{movieDetails.release_date ? new Date(movieDetails.release_date).getFullYear() : "אין"}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <strong> מגבלת גיל: </strong>{movieDetails.adult ? "כן" : "לא"}
                            </Typography>
                        </CardContent>
                        <CardActions style={{ display: 'flex', flexDirection: 'column', height: '140px', justifyContent: 'space-around' }}>
                            <TextField
                                value={numTickets}
                                id="outlined-number"
                                label="מספר כרטיסים"
                                onChange={(e: any) => setnumTickets(e.target.value)}
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <Button onClick={() => AddMoviesWatched(movieDetails.title || "")} variant="outlined">רכוש כרטיסים</Button>
                        </CardActions>
                    </Card>
                </div>
            }

            {
                !showingform && !showingExisting && <div style={{ width: ' 300px', margin: 'auto', padding: '25px', marginTop: '75px' }}>
                    <Alert severity="success">
                        <AlertTitle>תודה</AlertTitle>
                        תודה שהזמנת אצלנו !!
                    </Alert>
                </div>
            }
        </div >
    );
};

export default TicketPurchase;