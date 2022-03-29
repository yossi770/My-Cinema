import { useContext } from 'react';
import { AppContext } from "../AppContext";
import NavigateButton from '../components/NavigateButton';
import FavoritesChange from '../components/FavoritesChange';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';

export const History = () => {
  const { MoviesWatched, Favorites } = useContext(AppContext);

  return (
    <div style={{ maxWidth: '500px', margin: 'auto' }}>
      {MoviesWatched.length > 0 ? <Grid item xs={12} md={6}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          רשימת סרטים שנצפו
        </Typography>
        <List>
          {MoviesWatched.map((Movie: any, i: any) => (
            <ListItem key={i}>
              <ListItemAvatar>
                <Avatar>
                  <MovieCreationIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={Movie.name}
                secondary={Movie.purchaseDate ? Movie.purchaseDate : null}
              />
            </ListItem>
          ))}
        </List>
      </Grid> : <div style={{ textAlign: 'center', padding: '15px', border: '2px black solid', margin: '40px 20px', fontSize: '22px', color: 'Salmon' }}>אין סרטים שנצפו</div>}
      {Favorites.length > 0 ? <Grid item xs={12} md={6}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          רשימת מעודפים
        </Typography>
        <List>
          {Favorites.map((Fav: any, i: any) => (
            <ListItem key={i}>
              <ListItemAvatar>
                <Avatar>
                  <FavoritesChange Id={Fav.id} Title={Fav.title} favoritespage={true} ></FavoritesChange>
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={Fav.title}
              />
              <NavigateButton link={`/ticket/${Fav.id}`} text='רכישת כרטיס' />
            </ListItem>
          ))}
        </List>
      </Grid> : <div style={{ textAlign: 'center', padding: '15px', border: '2px black solid', margin: '40px 20px', fontSize: '22px', color: 'Salmon' }}>אין מעודפים</div>}
    </div>
  )
}