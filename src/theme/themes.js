import { createTheme } from '@mui/material';
// import { gray, green } from './colors';

// https://www.color-hex.com
// https://visme.co/blog/website-color-schemes
// 11 Lively and Inviting: #E7717D, #C2CAD0, #C2B9B0, #7E685A, #AFD275
// 21 Clean and Energetic: #5680E9, #84CEEB, #5AB9EA, #C1C8E4, #8860D0
// 30 Close to Nature: #687864, #31708E, #5085A5, #8FC1E3, #F7F9FB

export const recipeTheme = createTheme({
	palette: {
		background: {
			main: '#FFFFFF', //'#eb8d97', //'#ced4d9'
		},
		primary: {
			main: '#E7717D', //'#6c9d34', //'#749b33',
			// light: will be calculated from palette.primary.main,
			// dark: will be calculated from palette.primary.main,
			// contrastText: will be calculated to contrast with palette.primary.main
		},
		secondary: {
			main: '#AFD275', //'#3a185e', //'#6668aa',
			// light: will be calculated from palette.primary.main,
			// dark: will be calculated from palette.primary.main,
			// contrastText: will be calculated to contrast with palette.secondary.main
		},

		// tietrary: {main: '#C2CAD0', // '#F5F5F5' //'#6e6e6e',
		// },
		text: {
			primary: '#36393b', //'#404347', //'#757a80',
			secondary: '#404347', //'#8d9399',
			tietrary: '#FFFFFF',
		},
	},
	// typography: {
	// 	fontFamily: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(','),
	// },
});
