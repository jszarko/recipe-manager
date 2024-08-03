import { screen } from '@testing-library/react';
import { renderWithClient } from '../utils/test-query-client';
import { getCategories } from '../data/recipe-queries';
import CategoryList from './CategoryList';
import RecipeListSkeleton from './RecipeListSkeleton';

const mockCategories = [
	{
		id: 100,
		name: 'Breakfast',
		image:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Souffe_pancakes_%2876651%29.jpg/640px-Souffe_pancakes_%2876651%29.jpg',
	},
	{
		id: 101,
		name: 'Lunch/Dinner',
		image:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Pad_See_Ew.jpg/640px-Pad_See_Ew.jpg',
	},
	{
		id: 102,
		name: 'Dessert',
		image:
			'https://cdn.pixabay.com/photo/2015/11/13/04/19/tea-1041449_1280.jpg',
	},
];

jest.mock('../data/recipe-queries', () => ({
	__esModule: true,
	...jest.requireActual('../data/recipe-queries'),
	getCategories: jest.fn(),
}));

jest.mock('./RecipeListSkeleton');

describe('CategoryList', () => {
	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('renders CategoryList', async () => {
		getCategories.mockReturnValue(mockCategories);
		renderWithClient(<CategoryList />);

		expect(await screen.findByText('Breakfast')).toBeInTheDocument();
		expect(screen.getByText('Lunch/Dinner')).toBeInTheDocument();
		expect(screen.getByText('Dessert')).toBeInTheDocument();
	});

	it('renders category image', async () => {
		getCategories.mockReturnValue(mockCategories);
		renderWithClient(<CategoryList />);

		const backgrounds = await screen.findAllByTestId('category-image');
		expect(backgrounds).toHaveLength(3);
		expect(backgrounds[0]).toHaveStyle(
			`backgroundImage: url(${mockCategories[0].image})`
		);
		expect(backgrounds[1]).toHaveStyle(
			`backgroundImage: url(${mockCategories[1].image})`
		);
		expect(backgrounds[2]).toHaveStyle(
			`backgroundImage: url(${mockCategories[2].image})`
		);
	});

	it('redirects to a page with recipes of the selected category on click', async () => {
		getCategories.mockReturnValue(mockCategories);
		renderWithClient(<CategoryList />);

		expect(
			await screen.findByRole('link', { name: 'Breakfast' })
		).toHaveAttribute('href', '/recipes/category/100');
		expect(screen.getByRole('link', { name: 'Lunch/Dinner' })).toHaveAttribute(
			'href',
			'/recipes/category/101'
		);
		expect(screen.getByRole('link', { name: 'Dessert' })).toHaveAttribute(
			'href',
			'/recipes/category/102'
		);
	});

	it('renders loading skeleton before categories get loaded', async () => {
		RecipeListSkeleton.mockReturnValue(8);
		renderWithClient(<CategoryList />);

		expect(RecipeListSkeleton).toHaveBeenCalled();
		expect(RecipeListSkeleton).toHaveReturnedWith(8);
	});
});
