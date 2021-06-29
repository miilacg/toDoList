import React, { useState } from "react";
import { Link, useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

import { DrawerComponent } from './Drawer';



const useStyles = makeStyles((theme) => ({
	paper: {
    position: 'absolute',
    width: 'auto',
		top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: theme.palette.background.paper,
    border: 'none',
		borderRadius: '1rem',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(0, 1.5),
  },
}));

export function Header({ createUser, pendingTasksTitle, user }) {
	const history = useHistory();
	const [open, setOpen] = useState(false);

	const classes = useStyles();

	const drawerOpen = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
		console.log('oi')

    setOpen(true);
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
						
									<Button className='user' onClick={ drawerOpen }> 
										{ user.username } 🚪 
									</Button>
		
									{/*<Modal
										open={ open }
										onClose={ handleClose }
										>
										<div className={ classes.paper }>    
											<div className="modal-header">
												<h4 className="modal-title">Escolha uma opção</h4>
												<button type="button" className="close" onClick={ handleClose } label="Fechar">
													<span>&times;</span>
												</button>
											</div>
		
											<div className="modal-body">
												<h5>
													<Link to={ `/editUser/${ user._id }` }>Editar usuário</Link>
												</h5>
												<h5 label="Excluir usuário" onClick={ () => deleteUser(user._id) }>Excluir usuário</h5>
												<h5 label="Sair" onClick={ logout }>Sair</h5>                    
											</div>
										</div>
									</Modal>	*/}
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
				<DrawerComponent setOpen={ setOpen }/> 
			) }
		</>

		
	);
}