import { render, screen } from '@testing-library/react';
import ConversionCalculator from './ConversionCalculator';

jest.mock('./IngredientsConverter', () => {
	const IngredientsConverter = () => <div data-testid="IngredientsConverter" />;
	return IngredientsConverter;
});

jest.mock('./TemperatureConverter', () => {
	const TemperatureConverter = () => <div data-testid="TemperatureConverter" />;
	return TemperatureConverter;
});

describe('ConversionCalculator', () => {
	it('renders ConversionCalculator', async () => {
		render(<ConversionCalculator />);

		expect(screen.getByTestId('IngredientsConverter')).toBeInTheDocument();
		expect(screen.getByTestId('TemperatureConverter')).toBeInTheDocument();
	});
});
