import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';
import AccountCircleTwoToneIcon from '@material-ui/icons/AccountCircleTwoTone';



const useStyles = makeStyles({
  list: {
    width: 250,
  }
});

export function DrawerComponent({ setOpen }) {
  const classes = useStyles();

  const drawerClose = () => {
    setOpen(false);
  };


  return (
    <>
      <Drawer anchor={ 'right' } open={ setOpen } onClose={ drawerClose }>
        <div
          className={ classes.list }
          role="presentation"
          onClick={ drawerClose }
          onKeyDown={ drawerClose }
        >
          <List>
            <ListItem>
              <ListItemIcon>
                <HomeTwoToneIcon /> 
              </ListItemIcon>
              <ListItemText primary='Home'/>
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <AccountCircleTwoToneIcon /> 
              </ListItemIcon>
              <ListItemText primary='Perfil'/>
            </ListItem>                
          </List>
        </div>
      </Drawer>
    </>
  );
}