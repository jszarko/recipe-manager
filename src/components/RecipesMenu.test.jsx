import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithClient } from '../utils/test-query-client';
import { getCategories } from '../data/recipe-queries';
import RecipesMenu from './RecipesMenu';

const mockUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockUseNavigate,
}));

const mockCategories = [
	{
		id: 100,
		name: 'Breakfast',
	},
	{
		id: 101,
		name: 'Lunch/Dinner',
	},
	{
		id: 102,
		name: 'Dessert',
	},
];

jest.mock('../data/recipe-queries', () => ({
	__esModule: true,
	// import and retain the original functionalities
	...jest.requireActual('../data/recipe-queries'),
	getCategories: jest.fn().mockImplementation(() => mockCategories),
}));

describe('RecipesMenu', () => {
	it('renders RecipesMenu', () => {
		renderWithClient(<RecipesMenu />);
	});

	it('renders menu list', async () => {
		renderWithClient(<RecipesMenu />);
		expect(getCategories).toHaveBeenCalled();
		expect(await screen.findByText('Breakfast')).toBeInTheDocument();
		expect(screen.getByText('Lunch/Dinner')).toBeInTheDocument();
		expect(screen.getByText('Dessert')).toBeInTheDocument();
	});

	it('redirects to selected menu item page on click', async () => {
		const user = userEvent.setup();
		renderWithClient(<RecipesMenu />);
		const breakfast = await screen.findByText('Breakfast');
		await user.click(breakfast);
		expect(mockUseNavigate).toHaveBeenCalledWith('/recipes/category/100');
	});
});
