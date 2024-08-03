import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { addRecipe, getCategories } from '../data/recipe-queries';
import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { modules, formats } from './quill-configuration';
import { useTheme } from '@mui/material';

const AddRecipe = () => {
	const [recipe, setRecipe] = useState(null);
	const [error, setError] = useState(false);
	const { data: categories } = useQuery('categories', getCategories);
	const navigate = useNavigate();
	const theme = useTheme();

	const queryClient = useQueryClient();
	const { mutate } = useMutation(addRecipe, {
		onSuccess: data => {
			// refetch the updated list when the mutation completes successfully
			queryClient.invalidateQueries('recipes');
			navigate(`/recipes/${data.id}`);
		},
		onError: () => {
			setError(true);
		},
	});

	const handleChange = e => {
		const { name, value } = e.target;
		setRecipe({
			...recipe,
			[name]: value,
		});
	};

	const handleIngredientsEditorChange = value => {
		setRecipe({
			...recipe,
			ingredients: value,
		});
	};

	const handleInstructionsEditorChange = value => {
		setRecipe({
			...recipe,
			instructions: value,
		});
	};

	const handleSubmit = e => {
		e.preventDefault();
		mutate(recipe);
	};

	return (
		<>
			<Container sx={{ marginTop: 12 }}>
				<Typography
					id="title"
					variant="h4"
					color="primary"
					sx={{
						[theme.breakpoints.down('md')]: { fontSize: '1.5rem' },
					}}
				>
					Add a Recipe
				</Typography>
				{error && (
					<Alert severity="error">
						Something went wrong. Try reloading the page, else reach out to us
						and let us know about your experience.
					</Alert>
				)}
				<form onChange={handleChange} onSubmit={handleSubmit}>
					<Stack spacing={2} sx={{ my: 3 }}>
						<FormControl size="small">
							<InputLabel id="category-select-label">Category</InputLabel>
							<Select
								labelId="category-select-label"
								id="category-select"
								label="Category"
								name="category"
								value={recipe?.category || ''}
								onChange={handleChange}
							>
								{categories?.map(category => (
									<MenuItem key={category?.id} value={category?.id}>
										{category?.name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<TextField
							required
							label="Name"
							size="small"
							name="name"
							value={recipe?.name || ''}
							onChange={handleChange}
						/>
						<TextField
							multiline={true}
							label="Short Description"
							name="description"
							value={recipe?.description || ''}
							onChange={handleChange}
						/>
						<Box>
							<ReactQuill
								theme="snow"
								modules={modules}
								formats={formats}
								placeholder="Enter ingredients..."
								name="ingredients"
								data-testid="ingredients-input"
								value={recipe?.ingredients}
								onChange={handleIngredientsEditorChange}
							/>
						</Box>
						<Box>
							<ReactQuill
								theme="snow"
								modules={modules}
								formats={formats}
								placeholder="Enter instructions..."
								name="instructions"
								value={recipe?.instructions}
								onChange={handleInstructionsEditorChange}
							/>
						</Box>
						<TextField
							label="Image Link"
							size="small"
							name="image"
							value={recipe?.image || ''}
							onChange={handleChange}
						/>
					</Stack>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						disableElevation={true}
						sx={{
							textTransform: 'none',
							color: 'text.tietrary',
							fontWeight: 'bold',
						}}
					>
						Submit
					</Button>
				</form>
			</Container>
		</>
	);
};

export default AddRecipe;
