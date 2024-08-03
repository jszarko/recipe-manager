import { useNavigate } from 'react-router-dom';
import { string } from 'prop-types';
import Button from '@mui/material/Button';

const SingleLevelNavItems = ({ name, path }) => {
	const navigate = useNavigate();
	const handleMenuItemClick = route => {
		navigate(route);
	};

	return (
		<Button
			onClick={() => handleMenuItemClick(path)}
			sx={{
				my: 2,
				color: 'primary.dark',
				fontWeight: 'bold',
				textTransform: 'none',
				':hover': {
					color: 'primary.light',
					bgcolor: 'transparent',
				},
			}}
		>
			{name}
		</Button>
	);
};

SingleLevelNavItems.propTypes = {
	name: string,
	path: string,
};

export default SingleLevelNavItems;
