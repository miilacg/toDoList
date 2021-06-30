import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';

import { 
	Button,
	FormControl,
	InputLabel,
	TextField,
	Select,
	MenuItem	
} from '@material-ui/core';

import Alert from '@material-ui/lab/Alert';

import { useCurrentDate } from '../../hooks/useCurrentDate';

import { Menu } from '../components/Menu';

import '../../../client/styles/forms.scss';
import '../../../client/styles/user.scss';



export const EditUser = () => {
	const history = useHistory();
	const { userId } = useParams();

	Meteor.subscribe('users');
	
	const { user } = useTracker(() => {
		const noDataAvailable = { user: [] };		
		const user = Meteor.user();
		
		if(!user) {
      return { ...noDataAvailable };
    }

		if(user._id != userId) {
			history.push('/'); 
			alert('Você não tem permissão para essa ação.');
		}

		return { user };
  }); 


	const { tempDate, year, month, day, hour, minute } = useCurrentDate(user.date);	
	const currentDate = year + '-' + month + '-' + day + 'T' + hour + ':' + minute;

	const [username, setUsername] = useState(user.username);
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState(user.email);
	const [date, setDate] = useState(currentDate);
	const [gender, setGender] = useState(user.gender);
	const [company, setCompany] = useState(user.company);
	const [photo, setPhoto] = useState('');


	// Editando o usuario
	const handleSubmit = e => {
		e.preventDefault();

		if(!username || !password) return;

		const tempCurrentDate = new Date(date);
		if(tempCurrentDate.getTime() > tempDate) {
				const errorMessage = document.getElementById('error');
				errorMessage.setAttribute("style", "display: flex");
				document.getElementsByClassName("MuiAlert-message")[0].innerHTML = 'Escolha uma data inferior a data atual';
			return;
		}


		Meteor.call('users.edit', username, password, email, date, gender, company, function (error) {
			if(error && error.error === 'Usuário já existe') {				
				const errorMessage = document.getElementById('error');
				errorMessage.setAttribute("style", "display: flex");
				document.getElementsByClassName("MuiAlert-message")[0].innerHTML = error.error;
			} else {
				const errorUsuario = document.getElementById('errorUsuario');
				errorUsuario.setAttribute("style", "display: none");
			}
		})
	

		setUsername('');
		setPassword('');
		setEmail('');
		setDate(currentDate);
		setGender('');
		setCompany('');
		setPhoto('');
	};


	return (
		<div className='app'>
			<Menu user={ user }/> 

			<div className='main'>	
				<h2>editar usuário</h2>

				<form onSubmit={ handleSubmit } className='editUser'>
					<div className='container'>
						<TextField			
							className='col-6'			
							value={ username }
							label="Nome"
							type="text"
							onChange={ (e) => setUsername(e.target.value) }
							required
						/>

						<TextField
							className='col-6'	
							value={ email }
							label="E-mail"
							type="email"
							onChange={ (e) => setEmail(e.target.value) }
						/>
					</div>

					<div className='container'>
						<TextField
							className='col-4'	
							value={ password }
							label="Password"
							type="password"
							autoComplete="current-password"
							onChange={ (e) => setPassword(e.target.value) }
							required
						/>				

						<TextField
							className='col-4'
							value={ date }
							label="Data de nascimento"
							type="datetime-local"
							onChange={ (e) => setDate(e.target.value) } 
							InputLabelProps={{
								shrink: true,
							}}
						/>	

						<FormControl className='col-4'>
							<InputLabel id="demo-simple-select-label">Sexo</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								value={ gender }
								onChange={ (e) => setGender(e.target.value) }
							>
								<MenuItem value={ 'Feminino' }>Feminino</MenuItem>
								<MenuItem value={ 'Masculino' }>Masculino</MenuItem>
								<MenuItem value={ 'Prefiro não informar' }>Prefiro não informar</MenuItem>
							</Select>
						</FormControl>
					</div>

					<TextField
						className='col-5'
						value={ company }
						label="Empresa"
						type="text"
						onChange={ (e) => setCompany(e.target.value) }
					/>

					<Alert id='error' className='error' style={{ display:'none' }} severity="error">	</Alert>

					<div className='buttons'>	
						<Button variant="contained"><Link to='/dashboard'>Voltar</Link></Button>
						<Button type='submit' variant="contained">Salvar alterações</Button>
					</div>
				</form> 				
			</div>
		</div>
	);
};