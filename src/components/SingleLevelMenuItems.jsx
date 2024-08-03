import { useNavigate } from 'react-router-dom';
import { element, func, shape, string } from 'prop-types';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const SingleLevelMenuItems = ({ name, path, icon, toggleDrawer }) => {
	const navigate = useNavigate();
	const handleMenuItemClick = route => {
		navigate(route);
	};

	return (
		<ListItem key={name} disablePadding sx={{ color: 'primary.dark' }}>
			<ListItemButton
				onClick={() => {
					handleMenuItemClick(path) || toggleDrawer(false);
				}}
			>
				<ListItemIcon sx={{ color: 'primary.dark' }}>{icon}</ListItemIcon>
				<ListItemText primary={name} />
			</ListItemButton>
		</ListItem>
	);
};

SingleLevelMenuItems.propTypes = {
	name: string,
	path: string,
	icon: element,
	toggleDrawer: func.isRequired,
};

export default SingleLevelMenuItems;
