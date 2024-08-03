import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithClient } from '../utils/test-query-client';
import ReactQuill from 'react-quill';
import { addRecipe, getCategories } from '../data/recipe-queries';
import AddRecipe from './AddRecipe';

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
	getCategories: jest.fn(),
	addRecipe: jest.fn(),
}));

const mockUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockUseNavigate,
}));

jest.mock('react-quill', () => ({
	__esModule: true,
	...jest.requireActual('react-quill'),
	ReactQuill: jest.fn(),
	default: jest.fn(),
}));

describe('AddRecipe', () => {
	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('renders a form with fields', async () => {
		const mockIngredients = 'test ingredients';
		const mockInstructions = 'test instructions';
		ReactQuill.mockReturnValueOnce(mockIngredients);
		ReactQuill.mockReturnValueOnce(mockInstructions);
		renderWithClient(<AddRecipe />);

		expect(
			await screen.findByRole('heading', { name: /add a recipe/i })
		).toBeInTheDocument();

		expect(
			screen.getByRole('button', { name: /category/i })
		).toBeInTheDocument();

		expect(screen.getByRole('textbox', { name: /name/i })).toBeInTheDocument();

		expect(
			screen.getByRole('textbox', { name: /short description/i })
		).toBeInTheDocument();

		expect(screen.getByText(mockIngredients)).toBeInTheDocument();

		expect(screen.getByText(mockInstructions)).toBeInTheDocument();

		expect(
			screen.getByRole('textbox', { name: /image link/i })
		).toBeInTheDocument();

		const submitButton = screen.getByRole('button', { name: /submit/i });
		expect(submitButton).toBeInTheDocument();
		expect(submitButton).toBeEnabled();
	});

	it('renders categories list', async () => {
		const user = userEvent.setup();
		getCategories.mockReturnValue(mockCategories);
		renderWithClient(<AddRecipe />);

		expect(getCategories).toHaveBeenCalled();
		const categoriesDDL = screen.getByRole('button', { name: /category/i });
		await user.click(categoriesDDL);
		expect(screen.getAllByRole('option')).toHaveLength(3);
		expect(
			await screen.findByRole('option', { name: 'Breakfast' })
		).toBeInTheDocument();
		expect(
			screen.getByRole('option', { name: 'Lunch/Dinner' })
		).toBeInTheDocument();
		expect(screen.getByRole('option', { name: 'Dessert' })).toBeInTheDocument();
		expect(screen.queryByRole('option', { name: 'Fake Category' })).toBeNull();
	});

	it('shows * on the label of the required recipe name field', async () => {
		renderWithClient(<AddRecipe />);

		expect(await screen.findByLabelText(/name/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/\*/i)).not.toBeNull();
	});

	it('does not submit the form when required recipe name is not provided', async () => {
		const user = userEvent.setup();
		renderWithClient(<AddRecipe />);

		expect(screen.getByRole('textbox', { name: /name/i })).toBeRequired();
		await user.click(screen.getByRole('button', { name: /submit/i }));
		expect(addRecipe).not.toHaveBeenCalled();
		expect(mockUseNavigate).not.toHaveBeenCalled();
	});

	it('updates form input values', async () => {
		const user = userEvent.setup();
		getCategories.mockReturnValue(mockCategories);
		renderWithClient(<AddRecipe />);

		const categoriesDDL = screen.getByRole('button', { name: /category/i });
		await user.click(categoriesDDL);
		const breakfast = await screen.findByRole('option', { name: 'Breakfast' });
		await user.click(breakfast);
		expect(breakfast.selected).toBe(true);
		await user.click(categoriesDDL);
		const dessert = screen.getByRole('option', { name: 'Dessert' });
		await user.click(dessert);
		expect(dessert.selected).toBe(true);

		const nameInput = screen.getByRole('textbox', { name: /name/i });
		await user.type(nameInput, 'Test Recipe Name');
		expect(nameInput).toHaveValue('Test Recipe Name');
		await user.clear(nameInput);
		await user.type(nameInput, 'Recipe Name One More Test');
		expect(nameInput).toHaveValue('Recipe Name One More Test');

		const descriptionInput = screen.getByRole('textbox', {
			name: /short description/i,
		});
		await user.type(
			descriptionInput,
			"This is recipe's test short description."
		);
		expect(descriptionInput).toHaveValue(
			"This is recipe's test short description."
		);
		await user.clear(descriptionInput);
		await user.type(
			descriptionInput,
			"Recipe's short description one more test. This delicious and super healthy drink will keep you satisfied for hours."
		);
		expect(descriptionInput).toHaveValue(
			"Recipe's short description one more test. This delicious and super healthy drink will keep you satisfied for hours."
		);

		const imageLinkInput = screen.getByRole('textbox', { name: /image link/i });
		await user.type(
			imageLinkInput,
			'https://cdn.pixabay.com/photo/2021/07/22/01/03/cobbler-6484216_1280.png'
		);
		expect(imageLinkInput).toHaveValue(
			'https://cdn.pixabay.com/photo/2021/07/22/01/03/cobbler-6484216_1280.png'
		);
		await user.clear(imageLinkInput);
		expect(imageLinkInput).not.toHaveValue();
	}, 10000);

	it('creates recipe when only recipe name is provided on submit', async () => {
		const user = userEvent.setup();
		renderWithClient(<AddRecipe />);

		const nameInput = screen.getByRole('textbox', { name: /name/i });
		await user.type(nameInput, 'Recipe Name Placeholder');
		await user.click(screen.getByRole('button', { name: /submit/i }));
		expect(addRecipe).toHaveBeenCalledWith({
			name: 'Recipe Name Placeholder',
		});
	});

	it('creates recipe from the provided recipe category, name, description, and image on submit', async () => {
		const user = userEvent.setup();
		getCategories.mockReturnValue(mockCategories);
		renderWithClient(<AddRecipe />);

		await user.click(screen.getByRole('button', { name: /category/i }));
		const breakfast = await screen.findByRole('option', { name: 'Breakfast' });
		await user.click(breakfast);
		expect(breakfast.selected).toBe(true);

		await user.type(
			screen.getByRole('textbox', { name: /name/i }),
			'Avocado, Banana, and Cocoa Smoothie'
		);

		await user.type(
			screen.getByRole('textbox', { name: /short description/i }),
			"Step aside, avocado toast! This fruity smoothie is just as easy to make and is much more convenient to take on the road. What this recipe's name doesn't tell you is it also has a dose of frozen mango and a coconut milk base, giving you a tropical vibe on your way out the door."
		);

		await user.type(
			screen.getByRole('textbox', { name: /image link/i }),
			'https://cdn.pixabay.com/photo/2021/07/22/01/03/cobbler-6484216_1280.png'
		);

		await user.click(screen.getByRole('button', { name: /submit/i }));

		expect(addRecipe).toHaveBeenLastCalledWith({
			category: 100,
			name: 'Avocado, Banana, and Cocoa Smoothie',
			description:
				"Step aside, avocado toast! This fruity smoothie is just as easy to make and is much more convenient to take on the road. What this recipe's name doesn't tell you is it also has a dose of frozen mango and a coconut milk base, giving you a tropical vibe on your way out the door.",
			image:
				'https://cdn.pixabay.com/photo/2021/07/22/01/03/cobbler-6484216_1280.png',
		});
	}, 10000);

	it('renders error message when failing to add a recipe', async () => {
		const error = 'Oops... Something went wrong.';
		renderWithClient(<AddRecipe />);
		addRecipe.mockRejectedValueOnce(new Error(error));
		await expect(addRecipe()).rejects.toThrow(error);
	});
});
