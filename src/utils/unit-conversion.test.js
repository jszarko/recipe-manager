import { convertToCelsius, convertToFahrenheit } from './unit-conversion';

describe('unit-conversions', () => {
	it('converts 25 C to 77 F', () => {
		const F = convertToFahrenheit(25);
		expect(F).toBe(77);
	});
	it('converts -5 C to 23 F', () => {
		const F = convertToFahrenheit(-5);
		expect(F).toBe(23);
	});
	it('converts 0 C to 32 F', () => {
		const F = convertToFahrenheit(0);
		expect(F).toBe(32);
	});
	it('converts 77 F to 25 C', () => {
		const C = convertToCelsius(77);
		expect(C).toBe(25);
	});
	it('converts 23 F to -5 C', () => {
		const C = convertToCelsius(23);
		expect(C).toBe(-5);
	});
	it('converts 32 F to 0 C', () => {
		const C = convertToCelsius(32);
		expect(C).toBe(0);
	});
});
