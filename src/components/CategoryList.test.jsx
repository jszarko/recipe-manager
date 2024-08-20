import { screen } from '@testing-library/react';
import { renderWithClient } from '../utils/test-query-client';
import * as ReactQuery from 'react-query';
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

const useQuerySpy = jest.spyOn(ReactQuery, 'useQuery');

jest.mock('./RecipeListSkeleton');

describe('CategoryList', () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	it('renders CategoryList', async () => {
		useQuerySpy.mockReturnValue({ data: mockCategories, isLoading: false });
		renderWithClient(<CategoryList />);

		expect(screen.getByText('Breakfast')).toBeInTheDocument();
		expect(screen.getByText('Lunch/Dinner')).toBeInTheDocument();
		expect(screen.getByText('Dessert')).toBeInTheDocument();
	});

	it('renders category image', async () => {
		useQuerySpy.mockReturnValue({ data: mockCategories, isLoading: false });
		renderWithClient(<CategoryList />);

		const backgrounds = screen.getAllByTestId('category-image');
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
		useQuerySpy.mockReturnValue({ data: mockCategories, isLoading: false });
		renderWithClient(<CategoryList />);

		expect(screen.getByRole('link', { name: 'Breakfast' })).toHaveAttribute(
			'href',
			'/recipes/category/100'
		);
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
		useQuerySpy.mockReturnValue({ isLoading: true });
		renderWithClient(<CategoryList />);

		expect(RecipeListSkeleton).toHaveBeenCalled();
		expect(RecipeListSkeleton).toHaveReturnedWith(8);
	});
});
