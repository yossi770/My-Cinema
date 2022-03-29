import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from "../AppContext";
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import AddCardIcon from '@mui/icons-material/AddCard';

export const Navbar = () => {
    const navigate = useNavigate();
    const { location, setLocation } = useContext(AppContext);

    function disabled(to: string) {
        const location = window.location.href;
        const baseUrl = 'http://localhost:3000/';
        return (location === baseUrl && to === "home") || location.includes(to) ? true : false
    }

    useEffect(() => {
        const location = window.location.href;
        if (location.includes('history') || location.includes('ticket')) {
            location.includes('history') ? setLocation(2) : setLocation(1)
        }
        else {
            setLocation(0)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div style={{ height: '40px' }}>
            <Box sx={{ width: 380, margin: 'auto' }}>
                <BottomNavigation
                    showLabels
                    value={location}
                    onChange={(event, newValue) => {
                        setLocation(newValue);
                    }}
                >
                    <BottomNavigationAction style={{ padding: 0 }} disabled={disabled("home")} onClick={() => navigate('/')} label="רשימת סרטים" icon={<LocalMoviesIcon />} />
                    <BottomNavigationAction disabled={true} label="רכישת כרטיס" icon={<AddCardIcon />} />
                    <BottomNavigationAction disabled={disabled('/history')} onClick={() => navigate('/history')} label="מעודפים והיסטוריה" icon={<FavoriteIcon />} />
                </BottomNavigation>
            </Box>
            <br />
        </div>
    )
}