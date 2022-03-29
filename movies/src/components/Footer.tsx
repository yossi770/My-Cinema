import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';

export const Footer = () => {
    return (
        <div style={{ position: 'fixed', bottom: 0, backgroundColor: 'brown', width: '100%' }}>
            <List sx={{ width: '100%', backgroundColor: 'peru', bgcolor: 'background.paper', flexWrap: 'wrap', display: 'flex', justifyContent: 'center', padding: 0 }}>
                <ListItem style={{ maxWidth: '210px', padding: 0 }}>
                    <ListItemAvatar>
                        <Avatar>
                            <FmdGoodIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="כתובת" secondary="השושנה 12 תל אביב" />
                </ListItem>
                <ListItem style={{ maxWidth: '210px', padding: 0 }}>
                    <ListItemAvatar>
                        <Avatar>
                            <CallIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="טלפון" secondary="08-5478961" />
                </ListItem>
                <ListItem style={{ maxWidth: '210px', padding: 0 }}>
                    <ListItemAvatar>
                        <Avatar>
                            <EmailIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="אימייל" secondary="cinema@gmail.com" />
                </ListItem>
            </List>
        </div >
    )
}