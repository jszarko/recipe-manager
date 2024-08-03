import { useParams } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';
import { useTheme } from '@mui/material';
import { getRecipe } from '../data/recipe-queries';
import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import EditRecipe from './EditRecipe';
import FormattedRecipeSection from './FormattedRecipeSection';

const RecipeDetails = () => {
	// useParams hook to extract id parameter from the URL; this is typically used in routes like /recipes/:id
	const { id } = useParams();
	const theme = useTheme();

	const {
		data: recipe,
		isError,
		isLoading,
	} = useQuery(['recipe', id], () => getRecipe(id));

	const queryClient = useQueryClient();
	// callback function that is executed by the child component
	const onEditCompleted = recipe => {
		queryClient.invalidateQueries(getRecipe);
	};

	return (
		<Container sx={{ marginTop: 10 }}>
			{isError && (
				<Alert severity="error" sx={{ marginBottom: 1 }}>
					Something went wrong. Try reloading the page, else reach out to us and
					let us know about your experience.
				</Alert>
			)}
			{!isLoading ? (
				recipe && (
					<>
						<EditRecipe recipe={recipe} onSave={onEditCompleted} />
						<Paper elevation={6}>
							<Card
								sx={{
									marginTop: 1,
									display: 'flex',
									bgcolor: 'secondary.light',
								}}
							>
								<Box
									sx={{
										display: 'flex',
										flexDirection: 'column',
									}}
								>
									<CardContent>
										<Typography
											variant="h5"
											color="primary"
											fontWeight="bold"
											gutterBottom={true}
											sx={{
												[theme.breakpoints.down('md')]: { fontSize: '1.25rem' },
											}}
										>
											{recipe?.name}
										</Typography>
										<Typography
											variant="subtitle1"
											color="text.secondary"
											sx={{
												[theme.breakpoints.down('md')]: {
													fontSize: '0.875rem',
												},
											}}
										>
											{recipe?.description}
										</Typography>
									</CardContent>
								</Box>
								<Avatar
									src={recipe?.image}
									alt={recipe?.name}
									sx={{
										width: 140,
										height: 140,
									}}
								/>
							</Card>
							<Divider
								aria-hidden="true"
								sx={{
									opacity: 0.6,
									bgcolor: 'primary.light',
								}}
							/>
							<Card>
								<CardContent>
									<FormattedRecipeSection
										{...recipe}
										title="Ingredients"
										bodyHtml={recipe?.ingredients}
									/>
									<FormattedRecipeSection
										{...recipe}
										title="Instructions"
										bodyHtml={recipe?.instructions}
									/>
								</CardContent>
							</Card>
						</Paper>
					</>
				)
			) : (
				<Stack spacing={1} sx={{ marginTop: 4 }}>
					<Skeleton
						data-testid="recipe-details-skeleton"
						variant="rounded"
						width={75}
						height={45}
					/>
					<Skeleton
						data-testid="recipe-details-skeleton"
						variant="rounded"
						width={1150}
						height={1250}
					/>
				</Stack>
			)}
		</Container>
	);
};

export default RecipeDetails;
