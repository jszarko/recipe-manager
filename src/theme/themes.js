import { createTheme } from '@mui/material';

export const recipeTheme = createTheme({
	palette: {
		background: {
			main: '#FFFFFF',
		},
		primary: {
			main: '#E7717D',
			// light: will be calculated from palette.primary.main,
			// dark: will be calculated from palette.primary.main,
			// contrastText: will be calculated to contrast with palette.primary.main
		},
		secondary: {
			main: '#AFD275',
			// light: will be calculated from palette.primary.main,
			// dark: will be calculated from palette.primary.main,
			// contrastText: will be calculated to contrast with palette.secondary.main
		},
		text: {
			primary: '#36393b',
			secondary: '#404347',
			tietrary: '#FFFFFF',
		},
	},
});
