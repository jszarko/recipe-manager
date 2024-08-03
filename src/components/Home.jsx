import { useQuery } from 'react-query';
import { useTheme } from '@mui/material';
import { getLatestRecipes } from '../data/recipe-queries';
import RecipeList from './RecipeList';
import CategoryList from './CategoryList';
import RecipeListSkeleton from './RecipeListSkeleton';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CircleIcon from '@mui/icons-material/Circle';

const Home = () => {
	const count = 4;
	const {
		data: latestRecipes,
		isError,
		isLoading,
	} = useQuery(['latestRecipes'], async () => await getLatestRecipes(count));

	const theme = useTheme();

	return (
		<>
			<Container sx={{ marginTop: 12 }}>
				{isError && (
					<Alert severity="error" sx={{ marginBottom: 3 }}>
						Something went wrong. Try reloading the page, else reach out to us
						and let us know about your experience.
					</Alert>
				)}
				{!isLoading ? (
					<RecipeList recipes={latestRecipes} />
				) : (
					<RecipeListSkeleton count={4} />
				)}
			</Container>

			<Box
				sx={{
					marginTop: 3,
					bgcolor: 'primary.light',
					color: 'text.tietrary',
					minHeight: 300,
				}}
			>
				<Container>
					<Typography
						variant="h4"
						color="inherit"
						fontFamily="cursive"
						sx={{
							py: 2,
							[theme.breakpoints.down('md')]: {
								fontSize: '1.5rem',
							},
						}}
					>
						Organize Your Recipes
					</Typography>

					<Typography
						variant="h6"
						color="inherit"
						sx={{
							[theme.breakpoints.down('md')]: {
								fontSize: '1rem',
							},
						}}
					>
						Between your grandma's famous apple pie, the first meal you cooked,
						and your favorite indulgence, your family's most cherished recipes
						hold meaning. Keep all of your precious recipes and the ones you
						have yet to try within reach. With your favorite recipes neatly
						organized on your phone, sharing that apple pie recipe only takes a
						couple clicks.
					</Typography>

					<CircleIcon
						sx={{
							color: 'primary.dark',
							fontSize: '100px',
							display: { xs: 'none', sm: 'flex' },
							mt: -2,
							position: 'absolute',
							right: '2px',
						}}
					/>
					<CircleIcon
						sx={{
							color: 'inherit',
							fontSize: '100px',
							display: { xs: 'none', sm: 'flex' },
							mt: 4.5,
							position: 'absolute',
							right: '64px',
						}}
					/>
					<CircleIcon
						sx={{
							color: 'secondary.light',
							[theme.breakpoints.up('sm')]: {
								fontSize: '100px',
							},
							[theme.breakpoints.down('sm')]: {
								fontSize: '50px',
							},
							mt: 4.5,
							position: 'absolute',
							right: '1.5px',
						}}
					/>
				</Container>
			</Box>

			<Container sx={{ marginTop: 3 }}>
				<CategoryList />
			</Container>
		</>
	);
};

export default Home;
