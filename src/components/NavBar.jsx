import { menuItems } from '../utils/menu-items';
import NavMenu from './NavMenu';
import SingleLevelNavItems from './SingleLevelNavItems.jsx';
import NestedNavItems from './NestedNavItems.jsx';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import AnimationIcon from '@mui/icons-material/Animation';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';

const NavBar = () => {
	return (
		<AppBar color="background">
			<Container>
				<Toolbar disableGutters>
					<Box
						sx={{
							flexGrow: 1,
							display: { xs: 'flex', md: 'none' },
						}}
					>
						<NavMenu />
					</Box>
					<AnimationIcon sx={{ mr: 1, color: 'primary.dark' }} />
					<Typography
						variant="h5"
						noWrap
						component="a"
						href="/"
						sx={{
							mr: 6,
							flexGrow: 1,
							display: 'flex',
							fontFamily: 'cursive',
							fontWeight: 'bold',
							color: 'primary.dark',
							textDecoration: 'none',
						}}
					>
						Recipe Manager
					</Typography>
					<Box
						sx={{
							justifyContent: 'right',
							flexGrow: 1,
							display: { xs: 'none', md: 'flex' },
						}}
					>
						{menuItems?.map(item => (
							<List disablePadding key={item?.name}>
								{item?.subMenu && item?.subMenu?.length > 0 ? (
									<NestedNavItems {...item} />
								) : (
									<SingleLevelNavItems {...item} />
								)}
							</List>
						))}
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};
export default NavBar;
