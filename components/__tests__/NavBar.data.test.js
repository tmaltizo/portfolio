import navLinks from '../navLinks';

test('navLinks exports an array of objects with label and href', () => {
  expect(Array.isArray(navLinks)).toBe(true);
  navLinks.forEach(link => {
    expect(link).toHaveProperty('label');
    expect(link).toHaveProperty('href');
  });
});
