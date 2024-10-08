import { screen } from '@testing-library/react';
import { renderWithClient } from '../utils/test-query-client';
import * as ReactQuery from 'react-query';
import Recipes from './Recipes';
import RecipeListSkeleton from './RecipeListSkeleton';

const mockSearchResults = [
	{
		id: 3,
		category: 14,
		name: 'Cranberry Orange Nut Bread',
		image:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Cranberry_orange_nut_bread_%2829307632738%29.jpg/640px-Cranberry_orange_nut_bread_%2829307632738%29.jpg',
		description:
			'Sweet, orange scented and full of cranberries and walnuts, this bread is perfect for the holidays.',
	},
	{
		id: 4,
		category: 18,
		name: 'Orange Chicken',
		image:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Orange_chicken_%284363046795%29.jpg/640px-Orange_chicken_%284363046795%29.jpg',
		description:
			"Made with delicious crispy chicken pieces tossed in an incredible sweet and sticky orange sauce that everyone loves. This recipe is super easy to prepare, so give it a go when you don't feel like getting takeout.",
	},
	{
		id: 5,
		category: 20,
		name: 'Olive Oil Grape Cake',
		image:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Bundt_Cake_with_Grapes_001.jpg/640px-Bundt_Cake_with_Grapes_001.jpg',
		description:
			'Grapes, fennel, and olive oil star in this simple but unexpected cake. The batter comes together in one bowl and is dotted with ripe, juicy grapes. The cake is scattered with a mixture of sugar, fennel seeds, and olive oil that bakes into a crispy, fragrant, streusel-like topping.',
	},
];

const mockCategories = [
	{
		id: 14,
		name: 'Breakfast',
	},
	{
		id: 18,
		name: 'Lunch/Dinner',
	},
	{
		id: 20,
		name: 'Dessert',
	},
];

const useQuerySpy = jest.spyOn(ReactQuery, 'useQuery');

jest.mock('./RecipeListSkeleton');

describe('Recipes', () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	it('renders Recipes', async () => {
		renderWithClient(<Recipes />);
	});

	it('displays the results matching the search string', async () => {
		useQuerySpy.mockImplementation(argument => {
			// This argument is the one passed to the function you are mocking
			if (argument[0] === 'search') {
				return { data: mockSearchResults, isLoading: false, isError: false };
			} else if (argument[0] === 'category') {
				return { data: mockCategories };
			}
		});
		renderWithClient(<Recipes />);
		expect(screen.getAllByRole('img')).toHaveLength(3);
	});

	it('renders pagination', async () => {
		useQuerySpy.mockImplementation(argument => {
			if (argument[0] === 'search') {
				return { data: mockSearchResults, isLoading: false, isError: false };
			} else if (argument[0] === 'category') {
				return { data: mockCategories };
			}
		});
		renderWithClient(<Recipes />);
		expect(
			screen.getByRole('navigation', { name: 'pagination navigation' })
		).toBeInTheDocument();
	});

	it('renders Go To First Page button on the pagination', async () => {
		useQuerySpy.mockImplementation(argument => {
			if (argument[0] === 'search') {
				return { data: mockSearchResults, isLoading: false, isError: false };
			} else if (argument[0] === 'category') {
				return { data: mockCategories };
			}
		});
		renderWithClient(<Recipes />);
		expect(
			screen.getByRole('button', { name: 'Go to first page' })
		).toBeInTheDocument();
	});

	it('renders Go To Previous Page button on the pagination', async () => {
		useQuerySpy.mockImplementation(argument => {
			if (argument[0] === 'search') {
				return { data: mockSearchResults, isLoading: false, isError: false };
			} else if (argument[0] === 'category') {
				return { data: mockCategories };
			}
		});
		renderWithClient(<Recipes />);
		expect(
			screen.getByRole('button', { name: 'Go to previous page' })
		).toBeInTheDocument();
	});

	it('renders page number on the pagination', async () => {
		useQuerySpy.mockImplementation(argument => {
			if (argument[0] === 'search') {
				return { data: mockSearchResults, isLoading: false, isError: false };
			} else if (argument[0] === 'category') {
				return { data: mockCategories };
			}
		});
		renderWithClient(<Recipes />);
		expect(screen.getByRole('button', { name: 'page 1' })).toBeInTheDocument();
	});

	it('renders Go To Next Page button on the pagination', async () => {
		useQuerySpy.mockImplementation(argument => {
			if (argument[0] === 'search') {
				return { data: mockSearchResults, isLoading: false, isError: false };
			} else if (argument[0] === 'category') {
				return { data: mockCategories };
			}
		});
		renderWithClient(<Recipes />);
		expect(
			screen.getByRole('button', { name: 'Go to next page' })
		).toBeInTheDocument();
	});

	it('renders Go To Last Page button on the pagination', async () => {
		useQuerySpy.mockImplementation(argument => {
			if (argument[0] === 'search') {
				return { data: mockSearchResults, isLoading: false, isError: false };
			} else if (argument[0] === 'category') {
				return { data: mockCategories };
			}
		});
		renderWithClient(<Recipes />);
		expect(
			screen.getByRole('button', { name: 'Go to last page' })
		).toBeInTheDocument();
	});

	it('displays a message when there are no results matching the search string', async () => {
		useQuerySpy.mockReturnValue({ data: undefined });
		renderWithClient(<Recipes />);
		expect(
			screen.getByRole('heading', { name: 'No results found' })
		).toBeInTheDocument();
	});

	it('does not display pagination when there are no results matching the search string', async () => {
		useQuerySpy.mockReturnValue({ data: undefined });
		renderWithClient(<Recipes />);
		expect(
			screen.queryByRole('navigation', { name: 'pagination navigation' })
		).not.toBeInTheDocument();
	});

	it('renders error message when failing to get search results', async () => {
		useQuerySpy.mockReturnValue({ isError: true });
		renderWithClient(<Recipes />);
		expect(
			screen.getByText(
				'Something went wrong. Try reloading the page, else reach out to us and let us know about your experience.'
			)
		).toBeInTheDocument();
	});

	it('renders loading skeleton before the search results get loaded', async () => {
		RecipeListSkeleton.mockReturnValue(5);
		useQuerySpy.mockReturnValue({ isLoading: true });
		renderWithClient(<Recipes />);
		expect(RecipeListSkeleton).toHaveReturnedWith(5);
	});
});
