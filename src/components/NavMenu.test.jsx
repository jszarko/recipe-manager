import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NavMenu from './NavMenu';

jest.mock('./NestedMenuItems', () => ({
	__esModule: true,
	default: jest.fn(() => <div data-testid="NestedMenuItems" />),
}));

jest.mock('./SingleLevelMenuItems', () => ({
	__esModule: true,
	default: jest.fn(() => <div data-testid="SingleLevelMenuItems" />),
}));

describe('NavMenu', () => {
	it('renders NavMenu', () => {
		render(<NavMenu />);
	});

	it('renders menu button', async () => {
		render(<NavMenu />);
		expect(screen.getByRole('button', { name: /menu/i })).toBeInTheDocument();
		expect(screen.getByTestId('MenuIcon')).toBeInTheDocument();
	});

	it('opens sidebar on menu icon click', async () => {
		const user = userEvent.setup();
		render(<NavMenu />);
		await user.click(screen.getByRole('button', { name: /menu/i }));
		expect(screen.getByRole('presentation')).toBeInTheDocument();
	});

	it('renders close button', async () => {
		const user = userEvent.setup();
		render(<NavMenu />);
		await user.click(screen.getByRole('button', { name: /menu/i }));
		expect(screen.getByTestId('CloseIcon')).toBeInTheDocument();
	});

	it('renders divider', async () => {
		const user = userEvent.setup();
		render(<NavMenu />);
		await user.click(screen.getByRole('button', { name: /menu/i }));
		expect(screen.getByRole('separator')).toBeInTheDocument();
	});

	it('renders NestedMenuItems component', async () => {
		const user = userEvent.setup();
		render(<NavMenu />);
		await user.click(screen.getByRole('button', { name: /menu/i }));
		expect(screen.getAllByTestId('NestedMenuItems')[0]).toBeInTheDocument();
		expect(
			screen.queryByRole('button', { name: /recipes/i })
		).not.toBeInTheDocument();
	});

	it('renders SingleLevelMenuItems component', async () => {
		const user = userEvent.setup();
		render(<NavMenu />);
		await user.click(screen.getByRole('button', { name: /menu/i }));
		expect(
			screen.getAllByTestId('SingleLevelMenuItems')[0]
		).toBeInTheDocument();
		expect(
			screen.queryByRole('button', { name: /add recipe/i })
		).not.toBeInTheDocument();
	});

	it('closes sidebar on close button click', async () => {
		const user = userEvent.setup();
		render(<NavMenu />);
		await user.click(screen.getByRole('button', { name: /menu/i }));
		await user.click(screen.getByTestId('CloseIcon'));
		expect(screen.queryByRole('presentation')).not.toBeInTheDocument();
	});
});
