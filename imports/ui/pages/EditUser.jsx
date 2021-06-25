import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import { 
	Button,
	FormControl,
	InputLabel,
	TextField,
	Select,
	MenuItem	
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { Header } from '../components/Header';

import '../../../client/styles/forms.scss';
import '../../../client/styles/user.scss';



export const EditUser = () => {
	let currentDate = new Date();
	const tempCurrentDate = currentDate.getTime();
	const day = String(currentDate.getDate()).padStart(2, '0');
	const month = String(currentDate.getMonth() + 1).padStart(2, '0');
	const year = currentDate.getFullYear();
	const hour = currentDate.getHours();
	const minute = String(currentDate.getMinutes()).padStart(2, '0');
	currentDate = year + '-' + month + '-' + day + 'T' + hour + ':' + minute;

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [date, setDate] = useState(currentDate);
	const [gender, setGender] = useState('');
	const [company, setCompany] = useState('');
	const [photo, setPhoto] = useState('');

	// Editando o usuario
	const handleSubmit = e => {
		e.preventDefault();

		if(!username || !password) return;

		const tempDate = new Date(date);
		if(tempDate.getTime() > tempCurrentDate) {
			const error = document.getElementById('error');
			error.setAttribute("style", "display: flex");
			return;
		}


		Meteor.call('users.edit', username, password, email, date, gender, company, function (error) {
			if(error) {
				const errorUsuario = document.getElementById('errorUsuario');
				errorUsuario.setAttribute("style", "display: flex");
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
			<Header /> 

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

					<Alert id='error' className='error' style={{ display:'none' }} severity="error">
						Escolha uma data inferior a data atual
					</Alert>

					<Alert id='errorUsuario' className='error' style={{ display:'none' }} severity="error">
						Usuário já existe
					</Alert>

					<div className='buttons'>	
						<Button variant="contained"><Link to='/toDoList'>Voltar</Link></Button>
						<Button type='submit' variant="contained">Salvar alterações</Button>
					</div>
				</form> 				
			</div>
		</div>
	);
};