import { useState } from 'react';
import { menuItems } from '../utils/menu-items';
import SingleLevelMenuItems from './SingleLevelMenuItems';
import NestedMenuItems from './NestedMenuItems';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';

const NavMenu = () => {
	const [drawerOpen, setDrawerOpen] = useState(false);

	const toggleDrawer = newOpen => () => {
		setDrawerOpen(newOpen);
	};

	return (
		<>
			<IconButton
				size="large"
				aria-label="menu"
				sx={{ color: 'primary.dark' }}
				onClick={toggleDrawer(true)}
			>
				<MenuIcon />
			</IconButton>
			<Drawer open={drawerOpen} onClose={toggleDrawer(false)}>
				<Box sx={{ width: 250 }}>
					<List>
						<ListItemIcon
							sx={{ m: 1.5, color: 'primary.dark' }}
							onClick={toggleDrawer(false)}
						>
							<CloseIcon />
						</ListItemIcon>
						<Divider />
						{menuItems.map(item => (
							<List disablePadding key={item?.name}>
								{item?.subMenu && item?.subMenu?.length > 0 ? (
									<NestedMenuItems
										item={item}
										toggleDrawer={toggleDrawer(false)}
									/>
								) : (
									<SingleLevelMenuItems
										{...item}
										toggleDrawer={toggleDrawer(false)}
									/>
								)}
							</List>
						))}
					</List>
				</Box>
			</Drawer>
		</>
	);
};
export default NavMenu;
