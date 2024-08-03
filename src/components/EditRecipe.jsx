import { useState } from 'react';
import { getCategories, updateRecipe } from '../data/recipe-queries';
import { useQuery, useMutation } from 'react-query';
import { func, number, shape, string } from 'prop-types';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { modules, formats } from './quill-configuration';

const EditRecipe = ({ recipe, onSave }) => {
	const [open, setOpen] = useState(false);
	const [values, setValues] = useState({ ...recipe });
	const [error, setError] = useState(false);
	const [requiredNameError, setRequiredNameError] = useState(false);

	const { data: categories } = useQuery('categories', getCategories);

	const { mutate } = useMutation(updateRecipe, {
		onSuccess: () => {
			onSave(recipe);
			setOpen(false);
		},
		onError: () => {
			setError(true);
		},
	});

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSave = () => {
		if (!requiredNameError) {
			mutate(values);
		}
	};

	const handleChange = e => {
		const { name, value } = e.target;
		setValues({
			...values,
			[name]: value,
		});

		if (e.target.name === 'name') {
			if (e.target.validity.valid) {
				setRequiredNameError(false);
			} else {
				setRequiredNameError(true);
			}
		}
	};

	const handleIngredientsEditorChange = value => {
		setValues({
			...values,
			ingredients: value,
		});
	};

	const handleInstructionsEditorChange = value => {
		setValues({
			...values,
			instructions: value,
		});
	};

	return (
		<>
			<Button
				variant="contained"
				color="primary"
				sx={{
					textTransform: 'none',
					color: 'text.tietrary',
					fontWeight: 'bold',
				}}
				disableElevation={true}
				onClick={handleClickOpen}
			>
				Edit
			</Button>
			<Dialog
				fullWidth={true}
				maxWidth="lg"
				open={open}
				aria-labelledby="dialog-title"
			>
				<DialogTitle id="dialog-title" color="primary" fontSize="34px">
					Update the {values?.name} recipe
				</DialogTitle>
				<DialogContent>
					{error && (
						<Alert severity="error">
							Something went wrong. Try reloading the page, else reach out to us
							and let us know about your experience.
						</Alert>
					)}
					<form>
						<Stack spacing={2} sx={{ my: 2 }}>
							<FormControl size="small">
								<InputLabel id="category-select-label">Category</InputLabel>
								<Select
									labelId="category-select-label"
									id="category-select"
									label="Category"
									name="category"
									value={values?.category || ''}
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
								value={values?.name}
								onChange={handleChange}
								error={requiredNameError}
								helperText={
									requiredNameError ? 'Please enter recipe name.' : ''
								}
							/>
							<TextField
								label="Short Description"
								multiline={true}
								name="description"
								value={values?.description || ''}
								onChange={handleChange}
							/>
							<Box>
								<InputLabel>Ingredients</InputLabel>
								<ReactQuill
									data-testid="ingredients"
									theme="snow"
									modules={modules}
									formats={formats}
									placeholder="Enter ingredients..."
									name="ingredients"
									defaultValue={values?.ingredients}
									onChange={handleIngredientsEditorChange}
								/>
							</Box>
							<Box>
								<InputLabel>Instructions</InputLabel>
								<ReactQuill
									theme="snow"
									modules={modules}
									formats={formats}
									placeholder="Enter instructions..."
									name="instructions"
									defaultValue={values?.instructions}
									onChange={handleInstructionsEditorChange}
								/>
							</Box>
							<TextField
								label="Image Link"
								size="small"
								name="image"
								value={values?.image || ''}
								onChange={handleChange}
							/>
						</Stack>
					</form>
				</DialogContent>
				<DialogActions>
					<Button
						variant="contained"
						color="secondary"
						disableElevation={true}
						sx={{
							textTransform: 'none',
							color: 'text.tietrary',
							fontWeight: 'bold',
						}}
						onClick={handleClose}
					>
						Cancel
					</Button>
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
						onClick={handleSave}
					>
						Save changes
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

EditRecipe.propTypes = {
	recipe: shape({
		category: number,
		name: string,
		description: string,
		ingredients: string,
		instructions: string,
		image: string,
	}),
	onSave: func,
};

export default EditRecipe;
