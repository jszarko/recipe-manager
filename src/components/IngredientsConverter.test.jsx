import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import IngredientsConverter from './IngredientsConverter';

describe('IngredientsConverter', () => {
	it('renders IngredientsConverter', () => {
		render(<IngredientsConverter />);
	});

	it('renders all fields', async () => {
		render(<IngredientsConverter />);

		expect(
			screen.getByRole('heading', { name: /baking ingredients converter/i })
		).toBeInTheDocument();

		expect(
			screen.getByText(
				'Use this calculator as a reference for converting between US cups, grams, tablespoons and teaspoons.'
			)
		).toBeInTheDocument();

		expect(screen.getByRole('textbox', { name: /value/i })).toBeInTheDocument();

		expect(
			screen.getByRole('button', { name: /convert from/i })
		).toBeInTheDocument();

		expect(
			screen.getByRole('button', { name: /ingredient/i })
		).toBeInTheDocument();

		expect(
			screen.getByRole('button', { name: /convert to/i })
		).toBeInTheDocument();

		const convertButton = screen.getByRole('button', { name: 'Convert' });
		expect(convertButton).toBeInTheDocument();
		expect(convertButton).toBeEnabled();
	});

	it('renders Convert from field with default option', async () => {
		render(<IngredientsConverter />);

		expect(
			screen.getByRole('button', { name: /convert from/i })
		).toHaveTextContent('cups');
	});

	it('renders Ingredient field with default option', async () => {
		render(<IngredientsConverter />);

		expect(
			screen.getByRole('button', { name: /ingredient/i })
		).toHaveTextContent('butter');
	});

	it('renders Convert to field with default option', async () => {
		render(<IngredientsConverter />);

		expect(
			screen.getByRole('button', { name: /convert to/i })
		).toHaveTextContent('grams');
	});

	it('renders Convert from list of options', async () => {
		const user = userEvent.setup();
		render(<IngredientsConverter />);

		await user.click(
			screen.getByRole('button', {
				name: /convert from/i,
			})
		);
		expect(screen.getAllByRole('option')).toHaveLength(4);
		expect(screen.getByRole('option', { name: 'cups' })).toBeInTheDocument();
		expect(screen.getByRole('option', { name: 'grams' })).toBeInTheDocument();
		expect(
			screen.getByRole('option', { name: 'tablespoons' })
		).toBeInTheDocument();
		expect(
			screen.getByRole('option', { name: 'teaspoons' })
		).toBeInTheDocument();
	});

	it('renders list of ingredients', async () => {
		const user = userEvent.setup();
		render(<IngredientsConverter />);

		await user.click(screen.getByRole('button', { name: /ingredient/i }));
		expect(screen.getAllByRole('option')).toHaveLength(26);
		expect(screen.getByRole('option', { name: 'butter' })).toBeInTheDocument();
		expect(
			screen.getByRole('option', { name: 'flour, all-purpose' })
		).toBeInTheDocument();
		expect(screen.getByRole('option', { name: 'honey' })).toBeInTheDocument();
		expect(
			screen.getByRole('option', { name: 'sugar, granulated white' })
		).toBeInTheDocument();
	});

	it('renders Convert to list of options', async () => {
		const user = userEvent.setup();
		render(<IngredientsConverter />);

		await user.click(screen.getByRole('button', { name: /convert to/i }));
		expect(screen.getAllByRole('option')).toHaveLength(4);
		expect(screen.getByRole('option', { name: 'cups' })).toBeInTheDocument();
		expect(screen.getByRole('option', { name: 'grams' })).toBeInTheDocument();
		expect(
			screen.getByRole('option', { name: 'tablespoons' })
		).toBeInTheDocument();
		expect(
			screen.getByRole('option', { name: 'teaspoons' })
		).toBeInTheDocument();
	});

	it('displays conversion result on entering the input values and pressing convert', async () => {
		const user = userEvent.setup();
		render(<IngredientsConverter />);

		await user.type(screen.getByRole('textbox', { name: /value/i }), '120');
		expect(screen.getByRole('textbox', { name: /value/i })).toHaveValue('120');

		await user.click(screen.getByRole('button', { name: /convert from/i }));
		const grams = await screen.findByRole('option', { name: 'grams' });
		await user.click(grams);
		expect(grams.selected).toBe(true);

		await user.click(screen.getByRole('button', { name: /ingredient/i }));
		const flour = await screen.findByRole('option', {
			name: 'flour, all-purpose',
		});
		await user.click(flour);
		expect(flour.selected).toBe(true);

		await user.click(screen.getByRole('button', { name: /convert to/i }));
		const cups = await screen.findByRole('option', { name: 'cups' });
		await user.click(cups);
		expect(cups.selected).toBe(true);

		await user.click(screen.getByRole('button', { name: 'Convert' }));
		expect(
			screen.getByRole('heading', {
				name: '120 grams of flour, all-purpose = 1 cups',
			})
		).toBeInTheDocument();
	});

	it('hides conversion result on input value change', async () => {
		const user = userEvent.setup();
		render(<IngredientsConverter />);

		const valueInput = screen.getByRole('textbox', { name: /value/i });
		await user.type(valueInput, '1');
		expect(valueInput).toHaveValue('1');

		expect(
			screen.getByRole('button', { name: /convert from/i })
		).toHaveTextContent('cups');

		expect(
			screen.getByRole('button', { name: /ingredient/i })
		).toHaveTextContent('butter');

		expect(
			await screen.findByRole('button', { name: /convert to/i })
		).toHaveTextContent('grams');

		await user.click(screen.getByRole('button', { name: 'Convert' }));
		expect(
			screen.getByRole('heading', {
				name: '1 cups of butter = 227 grams',
			})
		).toBeInTheDocument();

		await user.clear(valueInput);
		await user.type(valueInput, '1.5');
		expect(valueInput).toHaveValue('1.5');
		expect(
			screen.queryByRole('heading', {
				name: '1.5 cups of butter = 340.5 grams',
			})
		).not.toBeInTheDocument();
	});
});
