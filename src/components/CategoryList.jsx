import { useQuery } from 'react-query';
import { useTheme } from '@mui/material';
import { getCategories } from '../data/recipe-queries';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import RecipeListSkeleton from './RecipeListSkeleton';

const CategoryList = () => {
	const { data: categories, isLoading } = useQuery('categories', getCategories);
	const theme = useTheme();

	return (
		<>
			{!isLoading ? (
				<Grid container spacing={2} direction="row" alignItems="center">
					{categories?.map(category => (
						<Grid key={category?.id} item xs={6} sm={4} md={3}>
							<Card sx={{ height: 300 }}>
								<CardActionArea
									focusRipple
									href={`/recipes/category/${category?.id}`}
								>
									<CardContent
										data-testid="category-image"
										sx={{
											backgroundImage: `url(${category?.image})`,
											backgroundSize: 'cover',
											backgroundPosition: 'center',
											height: 300,
											display: 'flex',
											alignItems: 'center',
											justifyContent: 'center',
											color: theme.palette.common.white,
											':hover': {
												'.MuiTypography-root': {
													border: '4px solid currentColor',
												},
											},
										}}
									>
										<Typography
											variant="h5"
											color="inherit"
											sx={{
												background: 'rgb(21, 22, 23, .35)',
												position: 'relative',
												p: 4,
												pt: 2,
												pb: theme => `calc(${theme.spacing(1)} + 6px)`,
												textDecoration: 'none',
												[theme.breakpoints.down('md')]: {
													fontSize: '1.25rem',
												},
											}}
										>
											{category?.name}
										</Typography>
									</CardContent>
								</CardActionArea>
							</Card>
						</Grid>
					))}
				</Grid>
			) : (
				<RecipeListSkeleton count={8} />
			)}
		</>
	);
};

export default CategoryList;
