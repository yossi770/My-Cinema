import { AppContext } from "../AppContext";
import { useContext, useState } from 'react';
import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';

const FavoritesChange = ({ Id, Title, buttonMode, favoritespage, fun }: { Id: number, Title: string, buttonMode?: boolean, favoritespage?: boolean, fun?: Function }) => {
  const { Favorites, setFavorites } = useContext(AppContext);
  const [ButtonMode, setButtonMode] = useState(buttonMode);

  const changeFavoritesMode = () => {
    let tampFavorites: Array<any> = [...Favorites];
    const exist = tampFavorites.findIndex((i: any) => i.id === Id);
    if (exist === -1) {
      setButtonMode(true)
      tampFavorites.push({ id: Id, title: Title });
    }
    else {
      setButtonMode(false)
      tampFavorites = tampFavorites.filter((i: any) => i.id !== Id)
    }
    if (fun) {
      fun(Id);
    }
    setFavorites(tampFavorites);
  }

  return (
    <div>
      {ButtonMode || favoritespage ? <FavoriteSharpIcon style={{ cursor: 'pointer', color: 'Salmon', display: 'flex' }} onClick={() => changeFavoritesMode()} /> : < FavoriteBorderSharpIcon style={{ cursor: 'pointer', display: 'flex' }} onClick={() => changeFavoritesMode()} />}
    </div>
  )
}
export default FavoritesChange;