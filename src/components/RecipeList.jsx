import { useTheme } from '@mui/material';
import { arrayOf, number, shape, string } from 'prop-types';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const RecipeList = ({ recipes }) => {
	const theme = useTheme();

	return (
		<>
			<Grid container spacing={2} direction="row" alignItems="center">
				{recipes?.map(recipe => (
					<Grid key={recipe?.id} item xs={6} sm={4} md={3}>
						<Card sx={{ height: 300 }}>
							<CardActionArea
								focusRipple
								sx={{ ':hover': { color: 'transparent' } }}
								href={`/recipes/${recipe?.id}`}
							>
								<CardMedia
									component="img"
									height="140"
									image={recipe?.image}
									alt={recipe?.name}
								/>
								<CardContent>
									<Typography
										variant="h6"
										fontWeight="bold"
										color="primary"
										sx={{
											[theme.breakpoints.down('md')]: {
												fontSize: '1rem',
											},
											':hover': { color: 'primary.dark' },
										}}
									>
										{recipe?.name}
									</Typography>

									<Typography
										data-testid="recipe-description"
										variant="body2"
										color="text.primary"
										sx={{
											overflow: 'hidden',
											textOverflow: 'ellipsis',
											display: '-webkit-box',
											[theme.breakpoints.down('md')]: {
												WebkitLineClamp: '4',
											},
											[theme.breakpoints.up('md')]: {
												WebkitLineClamp: '5',
											},
											WebkitBoxOrient: 'vertical',
										}}
									>
										{recipe?.description}
									</Typography>
								</CardContent>
							</CardActionArea>
						</Card>
					</Grid>
				))}
			</Grid>
		</>
	);
};

RecipeList.propTypes = {
	recipes: arrayOf(
		shape({
			id: number,
			name: string,
			description: string,
			image: string,
		})
	),
};

export default RecipeList;
