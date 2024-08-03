import Container from '@mui/material/Container';
import IngredientsConverter from './IngredientsConverter';
import TemperatureConverter from './TemperatureConverter';

const ConversionCalculator = () => {
	return (
		<Container sx={{ marginTop: 12 }}>
			<IngredientsConverter />
			<TemperatureConverter />
		</Container>
	);
};

export default ConversionCalculator;
