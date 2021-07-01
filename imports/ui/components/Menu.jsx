import React, { useState } from "react";
import { Link, useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListAltRoundedIcon from '@material-ui/icons/ListAltRounded';

import '../../../client/styles/menu.scss';



export function Menu({ createUser, user }) {
	const history = useHistory();

	const [openDrawer, setOpenDrawer] = useState(false);
	const [open, setOpen] = useState(false);

	const handleDrawer = (openDrawer) => (e) => {
    if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
      return;
    }

    setOpenDrawer(openDrawer);
  };

	const handleClick = () => {
    setOpen(!open);
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
			{ !openDrawer ? (
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
										<h1>📝️ To do list</h1>
									</Link>
						
									<Button className='user' onClick={ handleDrawer(true) }> 
										{ user.username } 🚪 
									</Button>
								</>
		
							) : ( // Se for qualquer outra página
								<Link to="/">
									<h1>📝️ To do list</h1>
								</Link>					
							)					
						) }    
					</div>
				</header>
			) : (
				<Drawer anchor='right' open={ openDrawer } onClose={ handleDrawer(false) }>
					<div
						className='drawer'
						role="presentation"						
						onKeyDown={ handleDrawer(false) }
					>
						<h1>📝️ To do list </h1>

						<List>
							<ListItem button onClick={ handleClick }>
								<AccountCircleRoundedIcon /> 
								<ListItemText primary='Perfil'/>
								{ open ? <ExpandLess className='arrow' /> : <ExpandMore className='arrow'/> }
							</ListItem>   
							<Collapse in={ open } timeout="auto" unmountOnExit>
								<List component="div" disablePadding>
									<Link to={ `/editUser/${ user._id }` }>
										<ListItem label='Editar usuário' className='nested'>
											<EditRoundedIcon />
											<ListItemText primary="Editar usuário" />
										</ListItem>
									</Link>

									<ListItem label='Excluir usuário' onClick={ () => deleteUser(user._id) } className='nested'>
										<DeleteOutlineRoundedIcon />
										<ListItemText primary="Excluir usuário" />
									</ListItem>

									<ListItem label='Sair' onClick={ logout } className='nested'>
										<ExitToAppRoundedIcon />
										<ListItemText primary="Sair" />
									</ListItem>
								</List>
							</Collapse>

							<Link to='/dashboard'>
								<ListItem>
									<DashboardRoundedIcon /> 
									<ListItemText primary='Dashboard'/>
								</ListItem>
							</Link>

							<Link to={ `/toDoList/${ user._id }` }>
								<ListItem>
									<ListAltRoundedIcon /> 
									<ListItemText primary='Lista de tarefas'/>
								</ListItem>
							</Link>
						</List>
					</div>
				</Drawer>
			) }
		</>		
	);
}