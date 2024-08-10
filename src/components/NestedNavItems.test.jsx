import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NestedNavItems from './NestedNavItems';

const mockNavItem = 'Recipes By Category';

jest.mock('./RecipesMenu', () => () => <div data-testid="RecipesMenu" />);

describe('NestedNavItems', () => {
	it('renders NestedNavItems', () => {
		render(<NestedNavItems name={mockNavItem} />);
	});

	it('renders nav menu option', async () => {
		render(<NestedNavItems name={mockNavItem} />);
		expect(
			screen.getByRole('button', { name: 'Recipes By Category' })
		).toBeInTheDocument();
	});

	it('renders expand icon', async () => {
		render(<NestedNavItems name={mockNavItem} />);
		expect(screen.getByTestId('ExpandMoreIcon')).toBeInTheDocument();
	});

	it('renders menu list on menu option hover over', async () => {
		const user = userEvent.setup();
		render(<NestedNavItems name={mockNavItem} />);
		await user.hover(
			screen.getByRole('button', { name: 'Recipes By Category' })
		);
		expect(screen.getByTestId('ExpandLessIcon')).toBeInTheDocument();
		expect(screen.getByTestId('RecipesMenu')).toBeInTheDocument();
	});

	it('renders menu list on menu option click', async () => {
		const user = userEvent.setup();
		render(<NestedNavItems name={mockNavItem} />);
		await user.click(
			screen.getByRole('button', { name: 'Recipes By Category' })
		);
		expect(screen.getByTestId('ExpandLessIcon')).toBeInTheDocument();
		expect(screen.getByTestId('RecipesMenu')).toBeInTheDocument();
	});
});
