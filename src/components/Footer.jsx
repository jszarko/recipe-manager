import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Footer = () => {
	return (
		<Box
			sx={{
				marginTop: 5,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				minHeight: 100,
			}}
		>
			<Typography variant="body2" color="text.secondary">
				{'© '} {new Date().getFullYear()} Recipe Manager
			</Typography>
		</Box>
	);
};

export default Footer;
