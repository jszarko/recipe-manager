import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TemperatureConverter from './TemperatureConverter';

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
		render(<TemperatureConverter />);

		await user.clear(screen.getByRole('textbox', { name: /°F/i }));
		await user.type(screen.getByRole('textbox', { name: /°F/i }), '78');
		expect(screen.getByRole('textbox', { name: /°F/i })).toHaveValue('78');
		expect(screen.getByRole('textbox', { name: /°C/i })).toHaveValue('25.6');
	});

	it('converts °C to °F', async () => {
		const user = userEvent.setup();
		render(<TemperatureConverter />);

		await user.clear(screen.getByRole('textbox', { name: /°C/i }));
		await user.type(screen.getByRole('textbox', { name: /°C/i }), '30');
		expect(await screen.findByRole('textbox', { name: /°F/i })).toHaveValue(
			'86'
		);
		expect(await screen.findByRole('textbox', { name: /°C/i })).toHaveValue(
			'30'
		);
	});
});
