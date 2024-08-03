import { screen } from '@testing-library/react';
import { renderWithClient } from '../utils/test-query-client';
import { getRecipe } from '../data/recipe-queries';
import RecipeDetails from './RecipeDetails';

const mockRecipe = {
	name: 'Olive Oil Grape Cake',
	image:
		'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Bundt_Cake_with_Grapes_001.jpg/640px-Bundt_Cake_with_Grapes_001.jpg',
	description:
		'Grapes, fennel, and olive oil star in this simple but unexpected cake. The batter comes together in one bowl and is dotted with ripe, juicy grapes. The cake is scattered with a mixture of sugar, fennel seeds, and olive oil that bakes into a crispy, fragrant, streusel-like topping.',
	ingredients:
		'<p><strong>For the cake</strong></p><ul><li>1 c <strong>extra-virgin olive oil </strong></li><li>¾ c <strong>granulated sugar</strong></li><li>2 tsp <strong>baking powder </strong></li><li>1 tsp Diamond Crystal <strong>kosher salt </strong></li><li>3 large <strong>eggs </strong></li><li>1 c <strong>sour cream </strong></li><li>2 c <strong>all-purpose flour</strong></li><li>1 tbsp&nbsp;lemon zest (optional)</li><li>1 tsp&nbsp;orange zest (optional)</li><li>1 tsp&nbsp;vanilla extract (optional)</li><li>2 c <strong>grapes</strong>, such as Thomcord - larger varieties should be halved, smaller can be left whole, avoid varieties with a lot of seeds</li></ul><p><strong>For the fennel sugar</strong></p><ul><li>1 tsp dried <strong>fennel seeds </strong></li><li>1½ tsp <strong>extra-virgin olive oil </strong></li><li>⅓ c <strong>granulated sugar </strong></li><li>Pinch of <strong>salt</strong></li></ul>',
	instructions:
		'<ol><li>Heat the oven to 325°F. Prepare a 9-inch springform pan by greasing it and lining with parchment paper.</li><li><strong>Make the fennel sugar topping:</strong> Use a mortar and pestle or spice grinder to grind the fennel down to a coarse powder. In a small mixing bowl, use your hands to rub the ground fennel into the sugar and salt until the mixture is fragrant. Add in the 1½ teaspoons of olive oil and stir with a spoon until the mixture takes on the texture of wet sand. Set aside.</li><li><strong>Make the cake</strong>: Toss half the grapes with 2 teaspoons of flour and set aside. In a large mixing bowl, combine the olive oil, sugar, salt, baking powder, eggs, vanilla, lemon and orange zest and whisk until well combined - the mixture should be thick and glossy. Add the sour cream and whisk until homogenous. Then add the flour and whisk until just combined before gently mixing in the floured grapes. Pour the batter into the prepared pan and place the remaining, un-floured grapes on top. Evenly distribute the fennel sugar over the batter.</li><li>Bake for about 1 hour, or until golden brown and a toothpick inserted into the middle of the cake comes out clean.</li><li>Let cool for 10 to 15 minutes before removing the cake from the pan.</li><li>Serve warm or at room temperature with a scoop of vanilla ice cream.</li><li>Store leftover cake in an airtight container at room temperature for up to 3 days.</li></ol>',
};

jest.mock('../data/recipe-queries', () => ({
	__esModule: true,
	...jest.requireActual('../data/recipe-queries'),
	getRecipe: jest.fn(),
}));

describe('RecipeDetails', () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	it('renders RecipeDetails', () => {
		renderWithClient(<RecipeDetails />);
	});

	it('renders recipe name', async () => {
		getRecipe.mockReturnValue(mockRecipe);
		renderWithClient(<RecipeDetails />);

		expect(
			await screen.findByRole('heading', { name: 'Olive Oil Grape Cake' })
		).toBeInTheDocument();
	});

	it('renders recipe description', async () => {
		getRecipe.mockReturnValue(mockRecipe);
		renderWithClient(<RecipeDetails />);

		expect(
			await screen.findByRole('heading', {
				name: 'Grapes, fennel, and olive oil star in this simple but unexpected cake. The batter comes together in one bowl and is dotted with ripe, juicy grapes. The cake is scattered with a mixture of sugar, fennel seeds, and olive oil that bakes into a crispy, fragrant, streusel-like topping.',
			})
		).toBeInTheDocument();
	});

	it('renders recipe image', async () => {
		getRecipe.mockReturnValue(mockRecipe);
		renderWithClient(<RecipeDetails />);

		expect(
			await screen.findByAltText('Olive Oil Grape Cake')
		).toBeInTheDocument();
	});

	it('renders ingredients HTML', async () => {
		getRecipe.mockReturnValue({
			...mockRecipe,
			ingredients: '<div data-testid="fake-ingredients">mock</div>',
		});
		renderWithClient(<RecipeDetails />);

		expect(await screen.findByTestId('fake-ingredients')).toBeInTheDocument();
	});

	it('renders instructions HTML', async () => {
		getRecipe.mockReturnValue({
			...mockRecipe,
			instructions: '<div data-testid="fake-instructions">mock</div>',
		});
		renderWithClient(<RecipeDetails />);

		expect(await screen.findByTestId('fake-instructions')).toBeInTheDocument();
	});

	it('renders error message when failing to retrieve recipe details', async () => {
		const error = 'Oops... Something went wrong.';
		renderWithClient(<RecipeDetails />);
		getRecipe.mockRejectedValueOnce(new Error(error));
		await expect(getRecipe()).rejects.toThrow(error);
	});

	it('renders loading skeleton before recipe details get loaded', async () => {
		getRecipe.mockReturnValue({ data: mockRecipe, isLoading: true });
		renderWithClient(<RecipeDetails />);

		expect(
			screen.getAllByTestId('recipe-details-skeleton')[0]
		).toBeInTheDocument();
	});
});
