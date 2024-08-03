import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NestedNavItems from './NestedNavItems';
import RecipesMenu from './RecipesMenu';

const mockNavItems = {
	name: 'Recipes By Category',
	subMenu: [
		{
			component: <RecipesMenu />,
		},
	],
};

jest.mock('./RecipesMenu', () => () => <div data-testid="RecipesMenu" />);

describe('NestedNavItems', () => {
	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('renders NestedNavItems', () => {
		render(<NestedNavItems item={mockNavItems} />);
		expect(mockNavItems).toEqual(
			expect.objectContaining({
				name: 'Recipes By Category',
				subMenu: expect.anything(),
			})
		);
	});

	it('renders nav menu option', async () => {
		render(<NestedNavItems item={mockNavItems} />);
		expect(
			screen.getByRole('button', { name: 'Recipes By Category' })
		).toBeInTheDocument();
	});

	it('renders expand icon', async () => {
		render(<NestedNavItems item={mockNavItems} />);
		expect(screen.getByTestId('ExpandMoreIcon')).toBeInTheDocument();
	});

	it('renders menu list on menu option hover over', async () => {
		const user = userEvent.setup();
		render(<NestedNavItems item={mockNavItems} />);
		await user.hover(
			screen.getByRole('button', { name: 'Recipes By Category' })
		);
		expect(screen.getByTestId('ExpandLessIcon')).toBeInTheDocument();
		expect(screen.getByTestId('RecipesMenu')).toBeInTheDocument();
	});

	it('renders menu list on menu option click', async () => {
		const user = userEvent.setup();
		render(<NestedNavItems item={mockNavItems} />);
		await user.click(
			screen.getByRole('button', { name: 'Recipes By Category' })
		);
		expect(screen.getByTestId('ExpandLessIcon')).toBeInTheDocument();
		expect(screen.getByTestId('RecipesMenu')).toBeInTheDocument();
	});
});
