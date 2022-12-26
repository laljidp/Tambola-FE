import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import SettingsIcon from '@mui/icons-material/Settings';

interface DrawerMenuI {
  show: boolean
  onClose: () => void
}

interface MENUSI { title: string, Icon: any, key: string }

const MENUS: MENUSI[] = [
  { title: 'Contests', Icon: AutoStoriesIcon, key: 'contests' },
  { title: 'Settings', Icon: SettingsIcon, key: 'settings' }
]

const DrawerMenu: React.FC<DrawerMenuI> = ({ show, onClose }): React.ReactElement => {

   const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
    >
      <List>
        {MENUS.map((menu, index) => (
          <ListItem key={menu.key} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {<menu.Icon />}
              </ListItemIcon>
              <ListItemText primary={menu.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Settings'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <SwipeableDrawer
          anchor={'left'}
          open={show}
          onClose={onClose}
          onOpen={onClose}
        >
          {list()}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}

export default DrawerMenu