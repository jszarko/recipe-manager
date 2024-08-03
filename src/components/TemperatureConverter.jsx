import { useState } from 'react';
import { useTheme } from '@mui/material';
import {
	convertToCelsius,
	convertToFahrenheit,
} from '../utils/unit-conversion';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

const TemperatureConverter = () => {
	const [fahrenheit, setFahrenheit] = useState(32);
	const [celsius, setCelsius] = useState(0);

	const theme = useTheme();

	const handleFahrenheitChange = e => {
		setFahrenheit(e.target.value);
		if (e.target.value !== '-') {
			setCelsius(convertToCelsius(e.target.value));
		}
	};

	const handleCelsiusChange = e => {
		setCelsius(e.target.value);
		if (e.target.value !== '-') {
			setFahrenheit(convertToFahrenheit(e.target.value));
		}
	};

	return (
		<>
			<Typography
				variant="h4"
				color="primary"
				sx={{ [theme.breakpoints.down('md')]: { fontSize: '1.5rem' } }}
			>
				Temperature Converter
			</Typography>
			<Stack direction="row" spacing={2} sx={{ my: 2 }}>
				<TextField
					id="fahrenheit"
					variant="filled"
					label="°F"
					sx={{ maxWidth: 180 }}
					value={fahrenheit}
					onChange={handleFahrenheitChange}
				/>

				<TextField
					id="celsius"
					variant="filled"
					label="°C"
					sx={{ maxWidth: 180 }}
					value={celsius}
					onChange={handleCelsiusChange}
				/>
			</Stack>
		</>
	);
};

export default TemperatureConverter;
