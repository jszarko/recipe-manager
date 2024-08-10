import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TemperatureConverter from './TemperatureConverter';
import {
	convertToCelsius,
	convertToFahrenheit,
} from '../utils/unit-conversion';

describe('TemperatureConverter', () => {
	it('renders TemperatureConverter', async () => {
		render(<TemperatureConverter />);

		expect(
			screen.getByRole('heading', { name: /temperature converter/i })
		).toBeInTheDocument();
		expect(screen.getByRole('textbox', { name: /°F/i })).toBeInTheDocument();
		expect(screen.getByRole('textbox', { name: /°C/i })).toBeInTheDocument();
	});

	it('renders default 32°F and 0°C', async () => {
		render(<TemperatureConverter />);

		expect(screen.getByRole('textbox', { name: /°F/i })).toHaveValue('32');
		expect(screen.getByRole('textbox', { name: /°C/i })).toHaveValue('0');
	});

	it('converts °F to °C', async () => {
		const user = userEvent.setup();
		const tempInF = 68;
		const tempInC = convertToCelsius(tempInF);
		render(<TemperatureConverter />);

		await user.clear(screen.getByRole('textbox', { name: /°F/i }));
		await user.type(screen.getByRole('textbox', { name: /°F/i }), `${tempInF}`);
		expect(screen.getByRole('textbox', { name: /°F/i })).toHaveValue(
			`${tempInF}`
		);
		expect(screen.getByRole('textbox', { name: /°C/i })).toHaveValue(
			`${tempInC}`
		);
	});

	it('converts °C to °F', async () => {
		const user = userEvent.setup();
		const tempInC = 30;
		const tempInF = convertToFahrenheit(tempInC);
		render(<TemperatureConverter />);

		await user.clear(screen.getByRole('textbox', { name: /°C/i }));
		await user.type(screen.getByRole('textbox', { name: /°C/i }), `${tempInC}`);
		expect(await screen.findByRole('textbox', { name: /°F/i })).toHaveValue(
			`${tempInF}`
		);
		expect(await screen.findByRole('textbox', { name: /°C/i })).toHaveValue(
			`${tempInC}`
		);
	});
});
