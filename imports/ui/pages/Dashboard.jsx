import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data'; 

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { Header } from '../components/Header';



const useStyles = makeStyles({
  /*bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },*/
});


export function Dashboard(){
	const user = useTracker(() => Meteor.user());
  const classes = useStyles();


	return (
		<div className='app'>   
      { user ? (
        <>
          <Header user={ user } />     	  

          <div className='main dashboard'> 
						<h2>dashboard</h2> 

						<div className='cards'>
							<Card className='card'>		
								<h5> Total de tarefas </h5>
								<h3> 20 </h3>	
							</Card>	

							<Card className='card'>
								<h5> Total de tarefas <br /> a fazer </h5>
								<h3> 20 </h3>									
							</Card>	
						</div>
						
						<div className='cards'>
							<Card className='card'>		
								<h5> Total de tarefas em andamento </h5>
								<h3> 20 </h3>	
							</Card>	

							<Card className='card'>
								<h5> Total de tarefas concluidas </h5>
								<h3> 20 </h3>									
							</Card>	
						</div>    
          </div>
        </>
      ) : (
        <div className='loading'>loading...</div>
      ) }      
    </div>
	)
}