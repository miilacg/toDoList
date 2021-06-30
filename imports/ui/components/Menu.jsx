import React, { useState } from "react";
import { Link, useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';



export function Menu({ createUser, pendingTasksTitle, user }) {
	const history = useHistory();
	const [open, setOpen] = useState(false);

	const handleDrawer = (open) => (e) => {
    if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
      return;
    }

    setOpen(open);
  };

	const logout = () => {
    history.push('/');
    Meteor.logout();    
  }

	async function deleteUser(_id) {		 
		if(window.confirm('Tem certeza que você deseja excluir o usuário?')) {
			await Meteor.call('users.remove', _id);
			history.push('/');
		}
	}


  return (		
		<>
			{ !open ? (
				<header className='app-bar'>
					<div className='app-header'>
						{ createUser ? ( // Se for a página de login	
							<>
								<h1>📝️ To do list </h1>
								<Link to={ createUser }>Criar conta</Link>
							</>	
						) : (
							user ? ( // Páginas dentro do to do list		
								<>
									<Link to="/dashboard">
										<h1>📝️ To do list { pendingTasksTitle }</h1>
									</Link>
						
									<Button className='user' onClick={ handleDrawer(true) }> 
										{ user.username } 🚪 
									</Button>
								</>
							) : ( // Se for qualquer outra página
								<Link to="/">
									<h1>📝️ To do list { pendingTasksTitle }</h1>
								</Link>					
							)					
						) }    
					</div>
				</header>
			) : (
				<Drawer anchor='right' open={ open } onClose={ handleDrawer(false) }>
					<div
						className='drawer'
						role="presentation"
						onClick={ handleDrawer(false) }
						onKeyDown={ handleDrawer(false) }
					>
						<h1>📝️ To do list </h1>

						<List>
							<ListItem>
								<ListItemIcon>
									<HomeRoundedIcon /> 
								</ListItemIcon>
								<ListItemText primary='Home'/>
							</ListItem>

							<ListItem>
								<ListItemIcon>
									<AccountCircleRoundedIcon /> 
								</ListItemIcon>
								<ListItemText primary='Perfil'/>
							</ListItem>   
						</List>
					</div>
				</Drawer>
			) }
		</>		
	);
}