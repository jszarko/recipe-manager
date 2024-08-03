import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { getCategories } from '../data/recipe-queries';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import ListItemText from '@mui/material/ListItemText';

const RecipesMenu = () => {
	const { data: categories } = useQuery('categories', getCategories);

	const navigate = useNavigate();
	const handleMenuItemClick = route => {
		navigate(route);
	};

	return (
		<MenuList disablePadding>
			<MenuItem onClick={() => handleMenuItemClick(`/recipes`)}>
				<ListItemText primary="All Recipes" />
			</MenuItem>
			{categories?.map(category => (
				<MenuItem
					key={category?.id}
					onClick={() =>
						handleMenuItemClick(`/recipes/category/${category?.id}`)
					}
				>
					{category?.name}
				</MenuItem>
			))}
		</MenuList>
	);
};
export default RecipesMenu;
