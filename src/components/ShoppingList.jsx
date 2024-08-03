import { useState } from 'react';
import { useTheme } from '@mui/material';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const ShoppingList = () => {
	// state to keep track of the items
	// instead of an empty array as the initial state
	// we use a function which will only be executed on the initial render
	const [items, setItems] = useState(() => {
		// get the list of items from the web storage
		const storedItems = localStorage.getItem('items');
		// if there are items stored
		if (storedItems) {
			// return the parsed JSON object back to a JavaScript object
			return JSON.parse(storedItems);
		} else {
			return [];
		}
	});

	// state to keep track of the value entered in the input box
	const [inputValue, setInputValue] = useState('');

	const theme = useTheme();

	// function to get the value of the input and set the new state
	const handleInputChange = e => {
		// set the new state value to what's currently in the input box
		setInputValue(e.target.value);
	};

	const handleAddItem = () => {
		if (inputValue !== '') {
			// set the new items state (the array)
			const newItems = [
				// copy the current values in state
				...items,
				{
					// set the 'name' and 'id' properties of the object
					name: inputValue,
					id: Date.now(),
				},
			];

			setItems(newItems);
			// clear out the input box
			setInputValue('');
			// store the items in the web storage
			localStorage.setItem('items', JSON.stringify(newItems));
		}
	};

	const handleDeleteItem = id => {
		// filter the array of items - if a delete button is clicked, remove an item from the array list
		// return the rest of the items that don't match the item we are deleting
		const updatedList = items.filter(item => item.id !== id);
		// updatedList returns a new array and we are setting the items to the new array
		setItems(updatedList);
		// update the web storage with the new list
		localStorage.setItem('items', JSON.stringify(updatedList));
	};

	return (
		<>
			<Container sx={{ marginTop: 10 }}>
				<Paper elevation={6}>
					<Typography
						my={4}
						variant="h4"
						color="secondary.dark"
						sx={{
							ml: 2,
							pt: 2,
							[theme.breakpoints.down('md')]: { fontSize: '1.5rem' },
						}}
					>
						Shopping List
					</Typography>
					<TextField
						id="filled-basic"
						label="Type in an item and press Enter"
						variant="filled"
						size="small"
						sx={{ ml: 2, width: 255 }}
						inputRef={input => {
							if (input != null) {
								input.focus();
							}
						}}
						value={inputValue}
						onChange={handleInputChange}
						onKeyDown={e => {
							if (e.key === 'Enter') {
								handleAddItem();
							}
						}}
					/>
					<List sx={{ width: '100%', maxWidth: 360 }}>
						{items.map(item => (
							<ListItem
								key={item.id}
								secondaryAction={
									<IconButton
										aria-label="delete"
										onClick={() => handleDeleteItem(item.id)}
									>
										<DeleteIcon />
									</IconButton>
								}
							>
								<ListItemText primary={`${item.name}`} />
							</ListItem>
						))}
					</List>
				</Paper>
			</Container>
		</>
	);
};

export default ShoppingList;
