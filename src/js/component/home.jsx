import React, { useEffect, useState } from "react";


const listToDos = [
	{tarea: 'lavarme las manos'},
	{tarea: 'beber chocolate caliente con queso'},
	{tarea: 'comprarle a hans una termomix (mentira)'}
]


const Home = () => {
	const [list, setList] = useState(listToDos)
	const [tarea, setTarea] = useState('');
	const [tareas, setTareas] = useState([]);

	const createUser = async() => {
		const response = await fetch('https://playground.4geeks.com/todo/users/jose_martin', {
			method: 'POST'});
			const data = await response.json();
			return data;
		};

	const getToDos = async () => {
		const response = await fetch('https://playground.4geeks.com/todo/users/jose_martin', {
			method: 'GET',
		});
			const data = await response.json();
			console.log(data)
			setTareas(data.todos);
		} 

	const createToDo = async () => {
	  	setTarea("")
		const response = await fetch('https://playground.4geeks.com/todo/todos/jose_martin', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				label: tarea,
				is_done: false
			  }),
		});
			const data = await response.json();
			if(response.ok){
				getToDos()
			}
			return data;
	};

	const deleteToDos = (id) => {
		fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
			method: 'DELETE'
		})
			.then(response => {
				if(response.ok){
					getToDos()
				} response.json()})
			.then(data => console.log(data))
			.catch(error => console.log(error))
	}
	
	useEffect(() => {
		createUser()
		getToDos()
	},[])

	
	return (
		<div>
			<h1>Dear Santa Claus...</h1>
			<input type="text" value={tarea} onChange={(e) => {
				setTarea(e.target.value)}}/>
			<button onClick={createToDo}>enviar</button>
			<ul>
				{list.map((item, index) => {
				return (<>
					<li>
					{item.tarea}
					</li>
				</>)
				})}
			</ul>
			{tareas.map((item) => (
				<div className="d-flex"><p>{item.label}</p><button onClick={() => deleteToDos(item.id)}>Remove</button></div>
			))}
		</div>
	);
};

export default Home;
