import { render, screen } from '@testing-library/react';
import App from './App';

const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockedUseNavigate,
}));

describe('App', () => {
	it('renders App', () => {
		render(<App />);
		expect(true).toBe(true);
	});
});
