import MenuBookIcon from '@mui/icons-material/MenuBook';
import SetMealIcon from '@mui/icons-material/SetMeal';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import RecipesMenu from '../components/RecipesMenu';

export const menuItems = [
	{
		name: 'Recipes',
		path: '/recipes',
		icon: <MenuBookIcon />,
		subMenu: [
			{
				component: <RecipesMenu />,
			},
		],
	},
	{
		name: 'Add Recipe',
		path: '/recipes/add',
		icon: <SetMealIcon />,
		subMenu: [],
	},
	{
		name: 'Shopping List',
		path: '/shoppinglist',
		icon: <ReceiptLongIcon />,
		subMenu: [],
	},
	{
		name: 'Conversion Calculator',
		path: '/convert',
		icon: <ChangeCircleIcon />,
		subMenu: [],
	},
];
