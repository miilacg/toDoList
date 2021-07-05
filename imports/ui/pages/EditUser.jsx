import React, { useEffect, useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import CameraEnhanceOutlinedIcon from '@material-ui/icons/CameraEnhanceOutlined';

import Alert from '@material-ui/lab/Alert';

import { useCurrentDate } from '../../hooks/useCurrentDate';

import { Menu } from '../components/Menu';

import '../../../client/styles/forms.scss';
import '../../../client/styles/user.scss';



export const EditUser = () => {
	const history = useHistory();
	const { userId } = useParams();

	const [state, setState] = useState(true); // true é para visualização

	const { user, birthday, isLoading } = useTracker(() => {
		Meteor.subscribe('users');
		const noDataAvailable = { user: [] };		
		const user = Meteor.user();
		let birthday;

		if(!user) {
      return { ...noDataAvailable, isLoading: true };
    }

		if(user._id != userId) {
			history.push('/'); 
			alert('Você não tem permissão para essa ação.');
		}

		if(!user.username) { // A comparação ta sendo feita com o username porque ele é obrigatorio e a data não
			return { ...noDataAvailable, isLoading: true };
    }

		if(user.date) {
			birthday = user.date[8] + user.date[9] + '/' + user.date[5] + user.date[6] + '/' + user.date[0] + user.date[1] + user.date[2] + user.date[3];
		} else {
			birthday = '';
		}

		return { user, birthday };
  });
	
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [date, setDate] = useState('');
	const [gender, setGender] = useState('');
	const [company, setCompany] = useState('');
	const [photo, setPhoto] = useState('');

	useEffect(() => {
		setUsername(user.username);

		if(user.email != undefined) {
			setEmail(user.email);
		} 

		if(user.date != undefined) {
			setDate(user.date);
		} 

		if(user.gender != undefined) {
			setGender(user.gender);
		} 

		if(user.company != undefined) {
			setCompany(user.company);
		}
		
		if(user.photo != undefined) {
			setPhoto(user.photo);
		} 
	}, [state]);


	function uploadProfileImage(){
		$('#img-input').click();
	}

	function previewImg (e) {
    var reader = new FileReader();

    reader.onload = function (e) {
			setPhoto(e.target.result);
			$("#preview").attr("src", e.target.result);			
    };

    reader.readAsDataURL(e.target.files[0]);
	};


	// Editando o usuario
	async function handleSubmit(e) {
		e.preventDefault();

		if(!username || !password) return;		

		const dateBirthday = new Date(date);
		dateBirthday.setDate(dateBirthday.getDate());

		const { tempDate } = useCurrentDate();	

		if(dateBirthday.getTime() > tempDate) {
			const errorMessage = document.getElementById('error');
			errorMessage.setAttribute("style", "display: flex");
			document.getElementsByClassName("MuiAlert-message")[0].innerHTML = 'Escolha uma data inferior a data atual';
			return;
		}


		await Meteor.call('users.edit', username, password, email, date, gender, company, photo, function (error) {
			if(error && error.error === 'Usuário já existe') {				
				const errorMessage = document.getElementById('error');
				errorMessage.setAttribute("style", "display: flex");
				document.getElementsByClassName("MuiAlert-message")[0].innerHTML = error.error;
			} else {
				Meteor.loginWithPassword(username, password, function (error) {
					if(!error){
						setUsername(username);
						setPassword('');
						setEmail(email);
						setDate(date);
						setGender(gender);
						setCompany(company);
						setPhoto(photo);

						setState(true);
					}
					else {
						const errorMessage = document.getElementById('error');
						errorMessage.setAttribute("style", "display: flex");
						document.getElementsByClassName("MuiAlert-message")[0].innerHTML = 'Algo deu errado';

						setState(false);
					}
				});
			}
		});
	};


	return (
		<div className='app'>
			<Menu user={ user }/> 

			<div className='main'>
				{ state ? (
					isLoading ? (
						<div className='loading'>loading...</div> 
					) : (
						<>						
							<div className='title edit'>
								<div className='photoProfile'>									
									{ user.photo ? (
										<img id="preview" src={ user.photo } className="img-fluid" />
									) : (
										<AccountCircleRoundedIcon />
									) }
								</div>
							
								<h2>{ user.username }</h2>	
							</div>	


							<div className="information">
								<h5><span>Email: </span>{ user.email }</h5>
								<h5><span>Data de nascimento: </span>{ birthday }</h5>
								<h5><span>Genêro: </span>{ user.gender }</h5>
								<h5><span>Empresa: </span>{ user.company }</h5>

								<div className='buttons'>
									<Button variant="contained"><Link to='/dashboard'>Voltar</Link></Button>
									<Button type='button' variant="contained" onClick={ () => setState(!state) }>Editar usuário</Button>
								</div>																
							</div>							
						</>
					)
				) : (
					isLoading ? (
						<div className='loading'>loading...</div> 
					) : (
						<>
							<div className='title'>
								<div className='addPhoto'>		
									<CameraEnhanceOutlinedIcon className='camera' titleAccess='Alterar foto de perfil' onClick={ uploadProfileImage } />		
																	
									<div className='photoProfile'>										
										{ photo ? (
											<img id="preview" src={ user.photo } className="img-fluid" />
										) : (
											<AccountCircleRoundedIcon />
										) }
									</div>
								</div>	
							
								<div>
									<h2>editar usuário</h2>	
									<h2>{ user.username }</h2>
								</div>
							</div>

							<form onSubmit={ handleSubmit } className='editUser'>	
								<input id="img-input" className='d-none' onChange={ previewImg } type="file" name="imagem" />				

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
										type="date"
										onChange={ (e) => setDate(e.target.value) } 
										InputLabelProps={{
											shrink: true,
										}}
									/>	

									<FormControl className='col-4'>
										<InputLabel id="demo-simple-select-label">Genêro</InputLabel>
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
									<Button variant="contained" onClick={ () => setState(!state) }>Voltar</Button>
									<Button type='submit' variant="contained">Salvar alterações</Button>
								</div>
							</form> 	
						</>
					)
				) }							
			</div>
		</div>
	);
};