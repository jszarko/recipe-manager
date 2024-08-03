import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SingleLevelMenuItems from './SingleLevelMenuItems';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const mockMenuItems = {
	name: 'List Recipes',
	path: '/recipes',
	icon: <MenuBookIcon />,
	subMenu: [],
};

const mockToggleDrawer = jest.fn();
mockToggleDrawer(true);

const mockUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockUseNavigate,
}));

describe('SingleLevelMenuItems', () => {
	it('renders SingleLevelMenuItems', async () => {
		render(
			<SingleLevelMenuItems
				item={mockMenuItems}
				toggleDrawer={mockToggleDrawer}
			/>
		);

		expect(mockMenuItems).toEqual(
			expect.objectContaining({
				name: 'List Recipes',
				path: '/recipes',
				icon: <MenuBookIcon />,
				subMenu: [],
			})
		);
		expect(mockToggleDrawer).toHaveBeenCalledWith(true);
	});

	it('renders menu item icon', async () => {
		render(
			<SingleLevelMenuItems
				item={mockMenuItems}
				toggleDrawer={mockToggleDrawer}
			/>
		);
		expect(screen.getByTestId('MenuBookIcon')).toBeInTheDocument();
	});

	it('renders menu item name', async () => {
		render(
			<SingleLevelMenuItems
				item={mockMenuItems}
				toggleDrawer={mockToggleDrawer}
			/>
		);
		expect(screen.getByText('List Recipes')).toBeInTheDocument();
	});

	it('does not render expand icon', async () => {
		render(
			<SingleLevelMenuItems
				item={mockMenuItems}
				toggleDrawer={mockToggleDrawer}
			/>
		);
		expect(screen.queryByTestId('ExpandMoreIcon')).not.toBeInTheDocument();
	});

	it('redirects to selected menu item page on menu item click', async () => {
		const user = userEvent.setup();
		render(
			<SingleLevelMenuItems
				item={mockMenuItems}
				toggleDrawer={mockToggleDrawer}
			/>
		);
		await user.click(screen.getByRole('button', { name: 'List Recipes' }));
		expect(mockUseNavigate).toHaveBeenCalledWith('/recipes');
	});
});
