import { useTheme } from '@mui/material';
import { menuItems } from '../utils/menu-items';
import NavMenu from './NavMenu';
import SingleLevelNavItems from './SingleLevelNavItems';
import NestedNavItems from './NestedNavItems';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';

const NavBar = () => {
	const theme = useTheme();
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
					<a href="/">
						<img src={process.env.PUBLIC_URL + '/logo.png'} alt="Logo" />
					</a>
					<Typography
						variant="h5"
						noWrap
						component="a"
						href="/"
						sx={{
							ml: 1,
							mr: 6,
							flexGrow: 1,
							display: 'flex',
							fontFamily: 'cursive',
							fontWeight: 'bold',
							color: 'primary.dark',
							textDecoration: 'none',
							[theme.breakpoints.down('sm')]: {
								fontSize: '1.3rem',
							},
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
