import { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { searchRecipes, getCategory } from '../data/recipe-queries';
import RecipeList from './RecipeList';
import RecipeListSkeleton from './RecipeListSkeleton';
import SearchRecipe from './SearchRecipe';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Pagination from '@mui/material/Pagination';
import Box from '@mui/material/Box';

const Recipes = () => {
	const [searchString, setSearchString] = useState('');
	const [pageNumber, setPageNumber] = useState(1);
	const [recordsPerPage] = useState(20);
	// useParams hook to extract categoryId parameter from the URL
	const { categoryId } = useParams();

	const {
		data: searchResults,
		isLoading,
		isError,
	} = useQuery(
		['search', searchString, categoryId, pageNumber, recordsPerPage],
		async () =>
			await searchRecipes(searchString, categoryId, pageNumber, recordsPerPage)
	);

	const { data: category } = useQuery(['category', categoryId], () =>
		getCategory(categoryId)
	);

	const onSearch = searchText => {
		setSearchString(searchText);
	};

	// event param prevents "cyclic object value" exception
	const handlePageChange = (event, value) => {
		setPageNumber(value);
	};

	const renderRecipeResults = results =>
		results && results.length > 0 ? (
			<>
				<RecipeList recipes={searchResults} />
				<Stack spacing={2} sx={{ alignItems: 'center', marginTop: 2 }}>
					<Pagination
						count={results[0].totalPages}
						page={pageNumber}
						onChange={handlePageChange}
						showFirstButton
						showLastButton
					/>
				</Stack>
			</>
		) : (
			<Typography
				variant="h6"
				color="primary"
				align="center"
				sx={{ marginTop: 5 }}
			>
				No results found
			</Typography>
		);

	return (
		<>
			<Container sx={{ marginTop: 12, marginBottom: 6 }}>
				{isError && (
					<Alert severity="error" sx={{ marginBottom: 3 }}>
						Something went wrong. Try reloading the page, else reach out to us
						and let us know about your experience.
					</Alert>
				)}
				<Stack spacing={2}>
					<SearchRecipe onSearchChange={onSearch} />
					{categoryId && (
						<Typography
							variant="h5"
							color="primary.dark"
							textTransform="uppercase"
						>
							{category?.name}
						</Typography>
					)}
					<Box>
						{!isLoading ? (
							renderRecipeResults(searchResults)
						) : (
							<RecipeListSkeleton count={20} />
						)}
					</Box>
				</Stack>
			</Container>
		</>
	);
};

export default Recipes;
