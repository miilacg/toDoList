import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Button, Modal } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';



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
	const [open, setOpen] = useState(false);
	const classes = useStyles();

	function deleteUser(_id) {
		Meteor.call('users.remove', _id);
	}

	const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

	const logout = () => {
    history.push('/');
    Meteor.logout();    
  }
	

  return (		
		<header className='app-bar'>
			<div className='app-header'>
				<Link to="/">
					<h1>📝️ To do list { pendingTasksTitle }</h1>
				</Link>

				{ createUser ? ( // Se for a página de login		
					<Link to={ createUser }>Criar conta</Link>
				) : (
					user ? ( // Páginas dentro do to do list		
						<>
							<Button className='user' onClick={ handleOpen }>
								{ user.username } 🚪
							</Button>

							<Modal
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
							</Modal>	
						</>

					) : ( // Se for qualquer outra página
						''					
					)					
				) }    
			</div>
		</header>
	);
}