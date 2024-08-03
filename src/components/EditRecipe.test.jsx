import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithClient } from '../utils/test-query-client';
import { getCategories, updateRecipe } from '../data/recipe-queries';
import EditRecipe from './EditRecipe';

const mockRecipe = {
	id: 22,
	category: 2020,
	name: 'Olive Oil Grape Cake',
	image:
		'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Bundt_Cake_with_Grapes_001.jpg/640px-Bundt_Cake_with_Grapes_001.jpg',
	description:
		'Grapes, fennel, and olive oil star in this simple but unexpected cake. The batter comes together in one bowl and is dotted with ripe, juicy grapes. The cake is scattered with a mixture of sugar, fennel seeds, and olive oil that bakes into a crispy, fragrant, streusel-like topping.',
	ingredients:
		'<p><strong>For the cake</strong></p><ul><li>1 c <strong>extra-virgin olive oil </strong></li><li>¾ c <strong>granulated sugar</strong></li><li>2 tsp <strong>baking powder </strong></li><li>1 tsp Diamond Crystal <strong>kosher salt </strong></li><li>3 large <strong>eggs </strong></li><li>1 c <strong>sour cream </strong></li><li>2 c <strong>all-purpose flour</strong></li><li>1 tbsp&nbsp;lemon zest (optional)</li><li>1 tsp&nbsp;orange zest (optional)</li><li>1 tsp&nbsp;vanilla extract (optional)</li><li>2 c <strong>grapes</strong>, such as Thomcord - larger varieties should be halved, smaller can be left whole, avoid varieties with a lot of seeds</li></ul><p><strong>For the fennel sugar</strong></p><ul><li>1 tsp dried <strong>fennel seeds </strong></li><li>1½ tsp <strong>extra-virgin olive oil </strong></li><li>⅓ c <strong>granulated sugar </strong></li><li>Pinch of <strong>salt</strong></li></ul>',
	instructions:
		'<ol><li>Heat the oven to 325°F. Prepare a 9-inch springform pan by greasing it and lining with parchment paper.</li><li><strong>Make the fennel sugar topping:</strong> Use a mortar and pestle or spice grinder to grind the fennel down to a coarse powder. In a small mixing bowl, use your hands to rub the ground fennel into the sugar and salt until the mixture is fragrant. Add in the 1½ teaspoons of olive oil and stir with a spoon until the mixture takes on the texture of wet sand. Set aside.</li><li><strong>Make the cake</strong>: Toss half the grapes with 2 teaspoons of flour and set aside. In a large mixing bowl, combine the olive oil, sugar, salt, baking powder, eggs, vanilla, lemon and orange zest and whisk until well combined - the mixture should be thick and glossy. Add the sour cream and whisk until homogenous. Then add the flour and whisk until just combined before gently mixing in the floured grapes. Pour the batter into the prepared pan and place the remaining, un-floured grapes on top. Evenly distribute the fennel sugar over the batter.</li><li>Bake for about 1 hour, or until golden brown and a toothpick inserted into the middle of the cake comes out clean.</li><li>Let cool for 10 to 15 minutes before removing the cake from the pan.</li><li>Serve warm or at room temperature with a scoop of vanilla ice cream.</li><li>Store leftover cake in an airtight container at room temperature for up to 3 days.</li></ol>',
	addDate: '2024-01-05T00:00:00',
	changeDate: null,
};

const mockCategories = [
	{
		id: 2000,
		name: 'Something to wake up an appetite',
	},
	{
		id: 2010,
		name: 'Something to satiate a hunger',
	},
	{
		id: 2020,
		name: 'Something to satisfy a sweet tooth',
	},
];

jest.mock('../data/recipe-queries', () => ({
	__esModule: true,
	...jest.requireActual('../data/recipe-queries'),
	getCategories: jest.fn(),
	updateRecipe: jest.fn(),
}));

describe('EditRecipe', () => {
	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('renders Edit button', async () => {
		renderWithClient(<EditRecipe onSave={jest.fn()} />);
		const editButton = await screen.findByRole('button', { name: /edit/i });
		expect(editButton).toBeInTheDocument();
		expect(editButton).toBeEnabled();
	});

	it('renders a form with fields populated', async () => {
		const user = userEvent.setup();
		getCategories.mockReturnValue(mockCategories);
		renderWithClient(<EditRecipe recipe={mockRecipe} onSave={jest.fn()} />);
		await user.click(screen.getByRole('button', { name: /edit/i }));

		expect(
			await screen.findByRole('heading', {
				name: 'Update the Olive Oil Grape Cake recipe',
			})
		).toHaveTextContent('Update the Olive Oil Grape Cake recipe');

		expect(screen.getByRole('button', { name: /category/i })).toHaveTextContent(
			'Something to satisfy a sweet tooth'
		);

		expect(screen.getByRole('textbox', { name: /name/i })).toHaveValue(
			'Olive Oil Grape Cake'
		);

		expect(
			screen.getByRole('textbox', { name: /short description/i })
		).toHaveValue(
			'Grapes, fennel, and olive oil star in this simple but unexpected cake. The batter comes together in one bowl and is dotted with ripe, juicy grapes. The cake is scattered with a mixture of sugar, fennel seeds, and olive oil that bakes into a crispy, fragrant, streusel-like topping.'
		);

		expect(screen.getByRole('textbox', { name: /image link/i })).toHaveValue(
			'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Bundt_Cake_with_Grapes_001.jpg/640px-Bundt_Cake_with_Grapes_001.jpg'
		);

		const cancelButton = screen.getByRole('button', { name: /cancel/i });
		expect(cancelButton).toBeInTheDocument();
		expect(cancelButton).toBeEnabled();

		const saveButton = screen.getByRole('button', { name: /save changes/i });
		expect(saveButton).toBeInTheDocument();
		expect(saveButton).toBeEnabled();
	});

	it('renders categories list', async () => {
		const user = userEvent.setup();
		getCategories.mockReturnValue(mockCategories);
		renderWithClient(<EditRecipe recipe={mockRecipe} onSave={jest.fn()} />);
		await user.click(screen.getByRole('button', { name: /edit/i }));

		expect(getCategories).toHaveBeenCalled();
		const categoriesDDL = screen.getByRole('button', { name: /category/i });
		await user.click(categoriesDDL);
		expect(screen.getAllByRole('option')).toHaveLength(3);
		expect(
			await screen.findByRole('option', {
				name: 'Something to wake up an appetite',
			})
		).toBeInTheDocument();
		expect(
			screen.getByRole('option', { name: 'Something to satiate a hunger' })
		).toBeInTheDocument();
		expect(
			screen.getByRole('option', { name: 'Something to satisfy a sweet tooth' })
		).toBeInTheDocument();
		expect(
			screen.queryByRole('option', { name: 'Fake Category' })
		).not.toBeInTheDocument();
	});

	it('shows * on the label of the required recipe name field', async () => {
		const user = userEvent.setup();
		renderWithClient(<EditRecipe recipe={mockRecipe} onSave={jest.fn()} />);
		await user.click(screen.getByRole('button', { name: /edit/i }));

		expect(await screen.findByLabelText(/name/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/\*/i)).not.toBeNull();
	});

	it('does not update the recipe when required recipe name is not provided', async () => {
		const user = userEvent.setup();
		renderWithClient(<EditRecipe recipe={mockRecipe} onSave={jest.fn()} />);
		await user.click(screen.getByRole('button', { name: /edit/i }));

		const recipeName = screen.getByRole('textbox', { name: /name/i });
		expect(recipeName).toBeRequired();
		await user.clear(recipeName);
		expect(recipeName).not.toHaveValue();
		await user.click(screen.getByRole('button', { name: /save changes/i }));
		expect(updateRecipe).not.toHaveBeenCalled();
	});

	it('closes the form without saving the changes on cancel', async () => {
		const user = userEvent.setup();
		renderWithClient(<EditRecipe recipe={mockRecipe} onSave={jest.fn()} />);
		await user.click(screen.getByRole('button', { name: /edit/i }));

		const nameInput = screen.getByRole('textbox', { name: /name/i });
		await user.clear(nameInput);
		await user.type(nameInput, 'Olive Oil Grape Cake with Fennel Sugar');
		expect(nameInput).toHaveValue('Olive Oil Grape Cake with Fennel Sugar');
		await user.click(screen.getByRole('button', { name: /cancel/i }));
		expect(updateRecipe).not.toHaveBeenCalled();
	});

	it('updates recipe category, name, description, and image on save', async () => {
		const user = userEvent.setup();
		getCategories.mockReturnValue(mockCategories);
		renderWithClient(<EditRecipe recipe={mockRecipe} onSave={jest.fn()} />);
		await user.click(screen.getByRole('button', { name: /edit/i }));

		const categoriesDDL = screen.getByRole('button', { name: /category/i });
		await user.click(categoriesDDL);
		const breakfast = await screen.findByText(`${mockCategories[0].name}`);
		await user.click(breakfast);
		expect(breakfast.selected).toBe(true);
		expect(categoriesDDL).toHaveTextContent('Something to wake up an appetite');

		const nameInput = screen.getByRole('textbox', { name: /name/i });
		await user.clear(nameInput);
		await user.type(nameInput, `${mockRecipe.name}-updated`);

		const descriptionInput = screen.getByRole('textbox', {
			name: /short description/i,
		});
		await user.clear(descriptionInput);
		await user.type(descriptionInput, `${mockRecipe.description}-updated`);

		const imageLinkInput = screen.getByRole('textbox', { name: /image link/i });
		await user.clear(imageLinkInput);
		await user.type(
			imageLinkInput,
			'https://cdn.pixabay.com/photo/2021/07/22/01/03/cobbler-6484216_1280.png'
		);

		await user.click(screen.getByRole('button', { name: /save changes/i }));

		expect(updateRecipe).toHaveBeenCalledWith({
			category: 2000,
			name: `${mockRecipe.name}-updated`,
			description: `${mockRecipe.description}-updated`,
			ingredients: `${mockRecipe.ingredients}`,
			instructions: `${mockRecipe.instructions}`,
			image:
				'https://cdn.pixabay.com/photo/2021/07/22/01/03/cobbler-6484216_1280.png',
			id: 22,
			addDate: `${mockRecipe.addDate}`,
			changeDate: null,
		});
	}, 20000);

	it('calls onSave after changes have been saved', async () => {
		const user = userEvent.setup();
		const mockOnSave = jest.fn();
		renderWithClient(<EditRecipe recipe={mockRecipe} onSave={mockOnSave} />);
		await user.click(screen.getByRole('button', { name: /edit/i }));

		await user.click(screen.getByRole('button', { name: /save changes/i }));
		expect(mockOnSave).toHaveBeenCalled();
	});

	it('renders error message when failing to edit a recipe', async () => {
		const error = 'Oops... Something went wrong.';
		renderWithClient(<EditRecipe recipe={mockRecipe} onSave={jest.fn()} />);
		updateRecipe.mockRejectedValueOnce(new Error(error));
		await expect(updateRecipe()).rejects.toThrow(error);
	});
});
