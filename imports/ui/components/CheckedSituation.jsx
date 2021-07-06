import React, { useState } from 'react';

import { Meteor } from 'meteor/meteor';

import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import '../../../client/styles/task';



export function CheckedSituation({ taskId, situation, onChange }) {

	function handleSituation(checkedSituation) {
		Meteor.call('tasks.setSituation', taskId, checkedSituation)
	};
	

	return (
		<FormControl className='radio'>
			<RadioGroup row aria-label="Situação" name="situation" value={ situation } onChange={ onChange }>
				<FormControlLabel 
					className='registered' 
					id='controlRegistered' 
					value="Cadastrada" 
					control={<Radio id='registered' />} 
					label="Cadastrada"	
					onClick={ taskId && (() => handleSituation('Cadastrada')) }		
				/>

				<FormControlLabel 
					className='inProgress' 
					value="Em andamento" 
					control={<Radio id='inProgress' />} 
					label="Em andamento"
					disabled={ situation === 'Concluida' ? true : false } 
					onClick={ taskId && (() => handleSituation('Em andamento')) }	
				/>
				
				<FormControlLabel 
					className='completed' 
					value="Concluida" 
					control={<Radio id='completed' />} 
					label="Concluida" 
					disabled={ situation === 'Cadastrada' ? true : false } 
					onClick={ taskId && (() => handleSituation('Concluida')) }	
				/>
			</RadioGroup>
		</FormControl>
	)
}