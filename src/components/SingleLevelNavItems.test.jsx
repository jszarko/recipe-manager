import { render, screen } from '@testing-library/react';
import SingleLevelNavItems from './SingleLevelNavItems';
import userEvent from '@testing-library/user-event';

const mockUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockUseNavigate,
}));

const mockNavItems = {
	name: 'Recipes',
	path: '/recipes',
	subMenu: [],
};

describe('SingleLevelNavItems', () => {
	it('renders SingleLevelNavItems', async () => {
		render(
			<SingleLevelNavItems name={mockNavItems.name} path={mockNavItems.path} />
		);
		expect(mockNavItems).toEqual(
			expect.objectContaining({
				name: 'Recipes',
				path: '/recipes',
				subMenu: [],
			})
		);
	});

	it('renders nav item', async () => {
		render(
			<SingleLevelNavItems name={mockNavItems.name} path={mockNavItems.path} />
		);
		expect(screen.getByRole('button', { name: 'Recipes' })).toBeInTheDocument();
	});

	it('does not render expand icon', async () => {
		render(
			<SingleLevelNavItems name={mockNavItems.name} path={mockNavItems.path} />
		);
		expect(screen.queryByTestId('ExpandMoreIcon')).not.toBeInTheDocument();
	});

	it('redirects to selected nav item page on click', async () => {
		const user = userEvent.setup();
		render(
			<SingleLevelNavItems name={mockNavItems.name} path={mockNavItems.path} />
		);
		await user.click(screen.getByRole('button', { name: 'Recipes' }));
		expect(mockUseNavigate).toHaveBeenCalledWith('/recipes');
	});
});
