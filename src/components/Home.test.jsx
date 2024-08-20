import { screen } from '@testing-library/react';
import { renderWithClient } from '../utils/test-query-client';
import * as ReactQuery from 'react-query';
import Home from './Home';
import RecipeListSkeleton from './RecipeListSkeleton';

const mockLatestRecipes = [
	{
		name: 'Pavlova',
		image:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Pavlova_cake_with_summer_fruits%2C_Brisbane%2C_Queensland.jpg/640px-Pavlova_cake_with_summer_fruits%2C_Brisbane%2C_Queensland.jpg',
		description:
			'A cloud-like dessert featuring a crisp on the edges, marshmallow soft and creamy in the center meringue topped with rich whipped cream and vibrant berries.',
	},
	{
		name: 'Steamed Buns',
		image:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Pork_Belly_Bun.jpg/640px-Pork_Belly_Bun.jpg',
		description:
			'These Steamed Lotus Leaf Buns are fluffy and slightly chewy - just how they should be.',
	},
	{
		name: 'Apple Cake',
		image:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Apfelkuchen_mit_ganzen_%C3%84pfeln_-_Einzelst%C3%BCck.jpg/640px-Apfelkuchen_mit_ganzen_%C3%84pfeln_-_Einzelst%C3%BCck.jpg',
		description:
			'With chunks of sweet apples nestled in a tender and buttery cake, this apple cake is the essence of simplicity.',
	},
	{
		name: 'Orange Chicken',
		image:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Orange_chicken_%284363046795%29.jpg/640px-Orange_chicken_%284363046795%29.jpg',
		description:
			"Made with delicious crispy chicken pieces tossed in an incredible sweet and sticky orange sauce that everyone loves. This recipe is super easy to prepare, so give it a go when you don't feel like getting takeout.",
	},
];

const useQuerySpy = jest.spyOn(ReactQuery, 'useQuery');

jest.mock('./RecipeListSkeleton');

jest.mock('./CategoryList', () => () => <div data-testid="CategoryList" />);

describe('Home', () => {
	afterEach(() => {
		useQuerySpy.mockReset();
	});

	it('renders Home', () => {
		renderWithClient(<Home />);
	});

	it('renders latest recipes', async () => {
		useQuerySpy.mockReturnValue({
			data: mockLatestRecipes,
			isLoading: false,
			isError: false,
		});
		renderWithClient(<Home />);

		expect(screen.getByText('Pavlova')).toBeInTheDocument();
		expect(screen.getByText('Steamed Buns')).toBeInTheDocument();
		expect(screen.getByText('Apple Cake')).toBeInTheDocument();
		expect(screen.getByText('Orange Chicken')).toBeInTheDocument();
	});

	it('renders headline', async () => {
		const text =
			"Between your grandma's famous apple pie, the first meal you cooked, and your favorite indulgence, your family's most cherished recipes hold meaning. Keep all of your precious recipes and the ones you have yet to try within reach. With your favorite recipes neatly organized on your phone, sharing that apple pie recipe only takes a couple clicks.";
		useQuerySpy.mockReturnValue({ data: mockLatestRecipes });
		renderWithClient(<Home />);

		expect(
			screen.getByRole('heading', { name: /organize your recipes/i })
		).toBeInTheDocument();
		expect(screen.getByRole('heading', { name: text })).toBeInTheDocument();
	});

	it('renders error message when failing to get latest recipes', async () => {
		useQuerySpy.mockReturnValue({ isError: true });
		renderWithClient(<Home />);

		expect(
			screen.getByText(
				'Something went wrong. Try reloading the page, else reach out to us and let us know about your experience.'
			)
		).toBeInTheDocument();
	});

	it('renders loading skeleton before latest recipes get loaded', async () => {
		RecipeListSkeleton.mockReturnValue(4);
		useQuerySpy.mockReturnValue({ isLoading: true });
		renderWithClient(<Home />);

		expect(RecipeListSkeleton).toHaveBeenCalled();
		expect(RecipeListSkeleton).toHaveReturnedWith(4);
	});

	it('renders CategoryList component', async () => {
		useQuerySpy.mockReturnValue({
			data: mockLatestRecipes,
			isLoading: false,
			isError: false,
		});
		renderWithClient(<Home />);

		expect(screen.getByTestId('CategoryList')).toBeInTheDocument();
	});
});
