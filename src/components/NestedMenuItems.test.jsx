import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NestedMenuItems from './NestedMenuItems';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import RecipesMenu from './RecipesMenu';

const mockMenuItems = {
	name: 'Recipes By Category',
	icon: <MenuBookIcon />,
	subMenu: [
		{
			component: <RecipesMenu />,
		},
	],
};

jest.mock('./RecipesMenu', () => () => <div data-testid="RecipesMenu" />);

const mockToggleDrawer = jest.fn();
mockToggleDrawer(true);

describe('NestedMenuItems', () => {
	afterEach(() => {
		jest.restoreAllMocks();
	});

	it('renders NestedMenuItems', async () => {
		render(
			<NestedMenuItems item={mockMenuItems} toggleDrawer={mockToggleDrawer} />
		);
		expect(mockMenuItems).toEqual(
			expect.objectContaining({
				name: 'Recipes By Category',
				icon: <MenuBookIcon />,
				subMenu: expect.anything(),
			})
		);
		expect(mockToggleDrawer).toHaveBeenCalledWith(true);
	});

	it('renders menu item icon', async () => {
		render(
			<NestedMenuItems item={mockMenuItems} toggleDrawer={mockToggleDrawer} />
		);
		expect(screen.getByTestId('MenuBookIcon')).toBeInTheDocument();
	});

	it('renders menu item name', async () => {
		render(
			<NestedMenuItems item={mockMenuItems} toggleDrawer={mockToggleDrawer} />
		);
		expect(screen.getByText('Recipes By Category')).toBeInTheDocument();
	});

	it('renders expand icon', async () => {
		render(
			<NestedMenuItems item={mockMenuItems} toggleDrawer={mockToggleDrawer} />
		);
		expect(screen.getByTestId('ExpandMoreIcon')).toBeInTheDocument();
	});

	it('opens submenu on menu item click', async () => {
		const user = userEvent.setup();
		render(
			<NestedMenuItems item={mockMenuItems} toggleDrawer={mockToggleDrawer} />
		);
		await user.click(
			screen.getByRole('button', { name: 'Recipes By Category' })
		);
		expect(screen.getByTestId('ExpandLessIcon')).toBeInTheDocument();
		expect(screen.getByTestId('RecipesMenu')).toBeInTheDocument();
	});
});
