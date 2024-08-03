import { render, screen } from '@testing-library/react';
import RecipeList from './RecipeList';

const mockRecipes = [
	{
		id: 1001,
		name: 'Classic Cheesecake',
		description:
			'A classic for a reason, this cheesecake is silky smooth and luxurious. Paired with a buttery graham cracker crust, no one can deny its simple decadence.',
		image:
			'https://cdn.pixabay.com/photo/2019/07/30/01/58/cheesecake-4371777_1280.jpg',
	},
];

describe('RecipeList', () => {
	it('renders RecipeList', async () => {
		render(<RecipeList recipes={mockRecipes} />);
		expect(mockRecipes).toHaveLength(1);
	});

	it('renders recipe card with a link to selected recipe details page', async () => {
		render(<RecipeList recipes={mockRecipes} />);
		expect(
			screen.getByRole('link', { name: /classic cheesecake/i })
		).toHaveAttribute('href', '/recipes/1001');
	});

	it('renders recipe image with an accessible name', async () => {
		render(<RecipeList recipes={mockRecipes} />);
		expect(screen.getByRole('img')).toHaveAccessibleName('Classic Cheesecake');
	});

	it('renders recipe name', async () => {
		render(<RecipeList recipes={mockRecipes} />);
		expect(screen.getByRole('heading')).toHaveTextContent('Classic Cheesecake');
	});

	it('renders recipe short description', async () => {
		render(<RecipeList recipes={mockRecipes} />);
		expect(screen.getByTestId('recipe-description')).toHaveTextContent(
			/A classic for a reason, this cheesecake is silky smooth and luxurious. Paired with a buttery graham cracker crust, no one can deny its simple decadence./i
		);
	});
});
