import { useState } from 'react';
import { ingredientsInGrams } from '../utils/unit-conversion';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material';

const ingredients = [
	'baking powder',
	'baking soda',
	'butter',
	'buttermilk/yogurt',
	'cornmeal',
	'flour, all-purpose',
	'flour, almond',
	'flour, bread',
	'flour, cake',
	'flour, corn (Masa Harina)',
	'flour, semolina',
	'flour, whole-wheat',
	'honey',
	'maple syrup',
	'milk/water',
	'oil, olive',
	'oil, vegetable',
	'salt (Kosher, Diamond Crystal)',
	"salt (Kosher, Morton's)",
	'salt (table)',
	'sugar, confectioners',
	'sugar, brown (packed)',
	'sugar, granulated white',
	'sugar, Turbinado (raw)',
	'vanilla extract',
	'yeast (instant)',
];

const convertsFrom = ['cups', 'grams', 'tablespoons', 'teaspoons'];

const convertsTo = ['cups', 'grams', 'tablespoons', 'teaspoons'];

const IngredientsConverter = () => {
	const [value, setValue] = useState('');
	const [convertFrom, setConvertFrom] = useState('cups');
	const [ingredient, setIngredient] = useState(2);
	const [convertTo, setConvertTo] = useState('grams');
	const [result, setResult] = useState('');
	const theme = useTheme();

	const handleValueChange = e => {
		if (e.target.value.match(/[^0-9.]/)) {
			return e.preventDefault();
		}
		setValue(e.target.value);
		setResult();
	};

	const handleConvertFromChange = e => {
		setConvertFrom(e.target.value);
		setResult();
	};

	const handleIngredientChange = e => {
		setIngredient(e.target.value);
		setResult();
	};

	const handleConvertToChange = e => {
		setConvertTo(e.target.value);
		setResult();
	};

	const calculateResult = () => {
		if (convertFrom === 'cups' && convertTo === 'grams') {
			setResult(value * ingredientsInGrams[ingredient]);
		} else if (convertFrom === 'grams' && convertTo === 'cups') {
			setResult(value / ingredientsInGrams[ingredient]);
		} else if (convertFrom === 'tablespoons' && convertTo === 'grams') {
			setResult(value * ingredientsInGrams[ingredient] * 0.0625);
		} else if (convertFrom === 'grams' && convertTo === 'tablespoons') {
			setResult(value / ingredientsInGrams[ingredient] / 0.0625);
		} else if (convertFrom === 'tablespoons' && convertTo === 'cups') {
			setResult(value * 0.0625);
		} else if (convertFrom === 'cups' && convertTo === 'tablespoons') {
			setResult(value / 0.0625);
		} else if (convertFrom === 'teaspoons' && convertTo === 'grams') {
			setResult(value * ingredientsInGrams[ingredient] * 0.0208);
		} else if (convertFrom === 'grams' && convertTo === 'teaspoons') {
			setResult(value / ingredientsInGrams[ingredient] / 0.0208);
		} else if (convertFrom === 'tablespoons' && convertTo === 'teaspoons') {
			setResult(value * 3);
		} else if (convertFrom === 'teaspoons' && convertTo === 'tablespoons') {
			setResult(value / 3);
		} else if (convertFrom === 'cups' && convertTo === 'teaspoons') {
			setResult(value * 48);
		} else if (convertFrom === 'teaspoons' && convertTo === 'cups') {
			setResult(value / 48);
		} else if (convertFrom === convertTo) {
			setResult(value);
		}
	};

	return (
		<>
			<Typography
				variant="h4"
				color="primary"
				sx={{ [theme.breakpoints.down('md')]: { fontSize: '1.5rem' } }}
			>
				Baking Ingredients Converter
			</Typography>
			<Typography sx={{ marginTop: 2 }} color="primary.dark">
				Use this calculator as a reference for converting between US cups,
				grams, tablespoons and teaspoons.
			</Typography>
			<Stack spacing={2} sx={{ my: 2 }}>
				<FormControl variant="filled" sx={{ m: 1, maxWidth: 180 }} size="small">
					<TextField
						id="value"
						label="Value"
						variant="filled"
						inputProps={{ inputMode: 'numeric' }}
						sx={{ maxWidth: 180 }}
						value={value}
						onChange={handleValueChange}
					/>
				</FormControl>
				<FormControl variant="filled" sx={{ m: 1, maxWidth: 180 }} size="small">
					<InputLabel id="convertFrom-select-label">Convert from</InputLabel>
					<Select
						labelId="convertFrom-select-label"
						id="convertFrom-select"
						value={convertFrom}
						onChange={handleConvertFromChange}
						autoWidth
						label="Convert from"
					>
						{convertsFrom.map(value => (
							<MenuItem key={value} value={value}>
								{value}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<FormControl variant="filled" sx={{ m: 1, maxWidth: 180 }} size="small">
					<InputLabel id="ingredient-select-label">Ingredient</InputLabel>
					<Select
						labelId="ingredient-select-label"
						id="ingredient-select"
						value={ingredient}
						onChange={handleIngredientChange}
						autoWidth
						label="Ingredient"
					>
						{ingredients.map((value, index) => (
							<MenuItem key={value} value={index}>
								{value}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<FormControl variant="filled" sx={{ m: 1, maxWidth: 180 }} size="small">
					<InputLabel id="convertTo-select-label">Convert to</InputLabel>
					<Select
						labelId="convertTo-select-label"
						id="convertTo-select"
						value={convertTo}
						onChange={handleConvertToChange}
						autoWidth
						label="Convert to"
					>
						{convertsTo.map(value => (
							<MenuItem key={value} value={value}>
								{value}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<Button
					type="submit"
					variant="contained"
					color="secondary"
					disableElevation={true}
					sx={{
						maxWidth: 100,
						textTransform: 'none',
						color: 'text.tietrary',
						fontWeight: 'bold',
					}}
					onClick={calculateResult}
				>
					Convert
				</Button>
				{result ? (
					<Typography
						variant="h6"
						color="secondary.dark"
						fontWeight="bold"
						sx={{
							[theme.breakpoints.down('md')]: { fontSize: '1rem' },
						}}
					>
						{`${value} ${convertFrom} of ${ingredients[ingredient]} = ${result} ${convertTo}`}
					</Typography>
				) : null}
			</Stack>
		</>
	);
};
export default IngredientsConverter;
