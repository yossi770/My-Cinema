import { useEffect, useState, useContext } from 'react';
import { AppContext } from "../AppContext";
import axios from "axios";
import NavigateButton from '../components/NavigateButton';
import FavoritesChange from '../components/FavoritesChange';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import NestedModal from '../components/Modal'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  textAlign: 'center',
  Width: 300,
  margin: 'auto',
  boxShadow: 'none',
  color: theme.palette.text.secondary,
}));

const Home = () => {

  const { Favorites } = useContext(AppContext);
  const [movieList, setMovieList] = useState<any[]>([]);
  let currentOffset = 1;

  const shorten = (str: string) => {
    return str.replace(/^(.{100}[^\s]*).*/, "$1");
  }

  const photoValidation = (url: string) => {
    return url ? `http://image.tmdb.org/t/p/w154${url}` : "https://cdn.pixabay.com/photo/2017/07/27/15/24/movie-2545676__340.jpg";
  }

  const AddFavorites = (Id: number) => {
    const tampMovieList: Array<any> = [...movieList];
    const exist = tampMovieList.findIndex((i: any) => i.id === Id);
    tampMovieList[exist].favorite = tampMovieList[exist].favorite ? false : true;
    setMovieList(tampMovieList);
  }

  const checkFavorite = (id: number) => {
    const exist = Favorites.find((i: any) => i.id === id)
    if (exist) {
      return true
    }
    return false
  }

  const loadMovieList = () => {
    const tampMovieList: Array<any> = [];
    axios
      .get(`https://api.themoviedb.org/3/movie/now_playing?api_key=119d9cdec7ce2d08f75e28d8304ea10e&language=he-IL&include_image_language=he&page=${currentOffset}`)
      .then((res: any) => {
        res.data.results.forEach((p: any) => tampMovieList.push({ id: p.id, title: p.title, overview: p.overview, shortOverview: shorten(p.overview), poster_path: photoValidation(p.poster_path), favorite: checkFavorite(p.id) }));
        setMovieList((movieList) => [...movieList, ...tampMovieList]);
      });
    currentOffset += 1;
    if (currentOffset === 2) { loadMovieList() }
  };

  const handleScroll = (e: any) => {
    const scrollHeight = e.target.documentElement.scrollHeight;
    const currentHeight = Math.ceil(
      e.target.documentElement.scrollTop + window.innerHeight
    );
    if (currentHeight + 300 >= scrollHeight) {
      loadMovieList();
    }
  };

  useEffect(() => {
    loadMovieList();
    window.addEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Box sx={{ flexGrow: 1, padding: 3, display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        {movieList.map((_, index) => (
          <Item key={index}>
            <Card sx={{ minWidth: 220, maxWidth: 220, minHeight: 400, margin: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <CardMedia style={{ minHeight: 300 }}
                component="img"
                height="auto"
                width="auto"
                image={_.poster_path}
                alt={_.title}
              />
              <CardContent style={{ height: 185, overflow: 'hidden' }}>
                <Typography gutterBottom variant="h5" component="div">
                  {_.title}
                </Typography>
                <NestedModal overview={_.overview} shortOverview={_.shortOverview} />
              </CardContent>
              <CardActions style={{ justifyContent: 'space-between' }}>
                <NavigateButton link={`/ticket/${_.id}`} text='רכישת כרטיס' />
                <FavoritesChange Id={_.id} Title={_.title} buttonMode={_.favorite} fun={AddFavorites} ></FavoritesChange>
              </CardActions>
            </Card>
          </Item>
        ))}
      </Box>
    </div>
  );
};

export default Home;