import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from "../AppContext";
import Button from '@mui/material/Button';

const NavigateButton = ({ link, text }: { link: string, text: string }) => {
    const { setLocation } = useContext(AppContext);
    const navigate = useNavigate();
    return (
        <div>
            <Button variant="outlined" onClick={() => { navigate(link); setLocation(1) }}>{text}</Button>
        </div>
    )
}
export default NavigateButton;