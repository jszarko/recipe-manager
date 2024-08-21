import { useTheme } from '@mui/material';
import { string } from 'prop-types';
import Typography from '@mui/material/Typography';

const FormattedRecipeSection = ({ title, bodyHtml }) => {
	const theme = useTheme();

	return (
		<>
			<Typography
				variant="h6"
				color="primary"
				fontWeight="bold"
				sx={{
					[theme.breakpoints.down('md')]: { fontSize: '1rem' },
				}}
			>
				{title}
			</Typography>
			<Typography
				sx={{
					[theme.breakpoints.down('md')]: { fontSize: '.875rem' },
				}}
			>
				<span dangerouslySetInnerHTML={{ __html: bodyHtml }} />
			</Typography>
		</>
	);
};

FormattedRecipeSection.propTypes = {
	title: string,
	bodyHtml: string,
};

export default FormattedRecipeSection;
