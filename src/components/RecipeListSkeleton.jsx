import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import { number } from 'prop-types';

const RecipeListSkeleton = ({ count }) => {
	const skeletonArray = new Array(count).fill('');
	return (
		<Grid container spacing={2} direction="row" alignItems="center">
			{skeletonArray.map((item, index) => (
				<Grid key={index} item xs={6} sm={4} md={3}>
					<Skeleton variant="rounded" height={300} />
				</Grid>
			))}
		</Grid>
	);
};

RecipeListSkeleton.propTypes = {
	count: number.isRequired,
};

export default RecipeListSkeleton;
