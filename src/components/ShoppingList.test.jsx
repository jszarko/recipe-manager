import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ShoppingList from './ShoppingList';

describe('ShoppingList', () => {
	it('renders Shopping List page', async () => {
		render(<ShoppingList />);

		expect(
			screen.getByRole('heading', { name: /shopping list/i })
		).toBeInTheDocument();
		expect(
			screen.getByRole('textbox', { name: /type in an item and press Enter/i })
		).toBeInTheDocument();
	});

	it('adds an item to the list', async () => {
		const user = userEvent.setup();
		render(<ShoppingList />);

		const input = screen.getByRole('textbox', {
			name: /type in an item and press Enter/i,
		});
		await user.type(input, 'apples');
		expect(input).toHaveValue('apples');
		await user.keyboard('[Enter]');
		expect(input).not.toHaveValue();
		expect(screen.getByText('apples')).toBeInTheDocument();

		await user.type(input, 'milk');
		expect(input).toHaveValue('milk');
		await user.keyboard('[Enter]');
		expect(input).not.toHaveValue();
		expect(screen.getByText('milk')).toBeInTheDocument();
	});

	it('deletes an item from the list', async () => {
		const user = userEvent.setup();
		render(<ShoppingList />);

		await user.click(screen.getAllByRole('button', { name: 'delete' })[0]);
		expect(screen.queryByText('apples')).not.toBeInTheDocument();
		expect(screen.getByText('milk')).toBeInTheDocument();
	});
});
