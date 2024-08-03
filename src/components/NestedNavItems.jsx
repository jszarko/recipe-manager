import { useState } from 'react';
import { string } from 'prop-types';
import RecipesMenu from './RecipesMenu';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const NestedNavItems = ({ name }) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const openMenu = Boolean(anchorEl);
	const [hoverColor, setHoverColor] = useState(false);

	const handleMenuOpen = e => {
		setHoverColor(true);
		setAnchorEl(e.currentTarget);
	};

	const handleMenuClose = () => {
		// set timeout so that the menu doesn't close before the user has a time to move the mouse over it
		setTimeout(() => {
			setAnchorEl(null);
			setHoverColor(false);
		}, 3000);
	};

	return (
		<>
			<Button
				aria-haspopup="true"
				aria-expanded={openMenu ? 'true' : 'false'}
				onMouseEnter={handleMenuOpen}
				onMouseLeave={handleMenuClose}
				onClick={handleMenuOpen}
				sx={{
					my: 2,
					color: hoverColor ? 'primary.light' : 'primary.dark',
					fontWeight: 'bold',
					textTransform: 'none',
				}}
				endIcon={openMenu ? <ExpandLess /> : <ExpandMore />}
			>
				{name}
			</Button>

			<Menu
				anchorEl={anchorEl}
				keepMounted
				open={openMenu}
				onClose={handleMenuClose}
				slotProps={{ paper: { sx: { width: 150 } } }}
				MenuListProps={{
					onMouseLeave: () => {
						setAnchorEl(null) || setHoverColor(false);
					},
					onClick: () => {
						setAnchorEl(null) || setHoverColor(false);
					},
				}}
			>
				<RecipesMenu />
			</Menu>
		</>
	);
};

NestedNavItems.propTypes = {
	name: string,
};

export default NestedNavItems;