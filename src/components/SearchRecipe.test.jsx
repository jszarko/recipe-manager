import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchRecipe from './SearchRecipe';

describe('SearchRecipe', () => {
	it('renders SearchRecipe', async () => {
		render(<SearchRecipe onSearchChange={jest.fn()} />);

		expect(
			screen.getByRole('textbox', { name: /search/i })
		).toBeInTheDocument();
		expect(screen.getByTestId('SearchIcon')).toBeInTheDocument();
	});

	it('passes search input to onSearchChange', async () => {
		const user = userEvent.setup();
		const mockOnSearchChange = jest.fn();
		render(<SearchRecipe onSearchChange={mockOnSearchChange} />);

		const searchBox = screen.getByRole('textbox', { name: /search/i });
		await user.type(searchBox, 'mock');
		expect(searchBox).toHaveValue('mock');
		expect(mockOnSearchChange).toHaveBeenCalledTimes(4);
		expect(mockOnSearchChange).toHaveBeenCalledWith('mock');
	});
});
