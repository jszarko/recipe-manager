import { useState } from 'react';
import { func } from 'prop-types';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

// input element will manage its own value in this component
// by passing a callback function as a prop that will run inside the handler function
// and will take the input value as its argument
const SearchRecipe = ({ onSearchChange }) => {
	// state to handle the input value
	const [input, setInput] = useState('');

	// handler function that will update the state when the input changes
	const handleInputChange = e => {
		const searchValue = e.target.value;
		setInput(searchValue);
		// if the component receives a callback,
		// call it and pass the input value as an argument
		onSearchChange && onSearchChange(searchValue);
	};

	return (
		<Paper
			sx={{
				padding: 'absolute',
				display: 'flex',
				alignItems: 'center',
				width: '100%',
			}}
		>
			<InputBase
				sx={{ ml: 1, flex: 1 }}
				placeholder="Search..."
				inputProps={{ 'aria-label': 'search' }}
				value={input}
				onChange={handleInputChange}
			/>
			<IconButton sx={{ p: '10px' }} aria-label="search">
				<SearchIcon />
			</IconButton>
		</Paper>
	);
};

SearchRecipe.propTypes = {
	onSearchChange: func.isRequired,
};

export default SearchRecipe;
