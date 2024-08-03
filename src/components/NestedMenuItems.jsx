import { useState } from 'react';
import { arrayOf, element, func, shape, string } from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';

const NestedMenuItems = ({ item, toggleDrawer }) => {
	const [subMenuOpen, setSubMenuOpen] = useState(false);

	const { subMenu: subItems } = item;

	const handleMenuItemClick = () => {
		setSubMenuOpen(!subMenuOpen);
	};

	return (
		<>
			<ListItem disablePadding sx={{ color: 'primary.dark' }}>
				<ListItemButton onClick={handleMenuItemClick}>
					<ListItemIcon sx={{ color: 'primary.dark' }}>
						{item?.icon}
					</ListItemIcon>
					<ListItemText primary={item?.name} />
					{subMenuOpen ? <ExpandLess /> : <ExpandMore />}
				</ListItemButton>
			</ListItem>
			<Collapse in={subMenuOpen} timeout="auto" unmountOnExit>
				<Divider />
				<List disablePadding>
					{subItems?.map((subItem, index) => (
						<ListItem key={index}>
							<ListItemButton onClick={() => toggleDrawer(false)}>
								<ListItemText primary={subItem?.component} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Collapse>
		</>
	);
};

NestedMenuItems.propTypes = {
	item: shape({
		name: string,
		path: string,
		icon: element,
		subMenu: arrayOf(
			shape({
				component: element,
			})
		),
	}),
	toggleDrawer: func.isRequired,
};

export default NestedMenuItems;
