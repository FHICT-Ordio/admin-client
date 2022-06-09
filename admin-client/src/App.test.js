import { render, screen } from '@testing-library/react';
import App from './App';

/*
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
*/

test('renders login button', () => {
    render(<App />);

    const loginButton = screen.getByText("Log In");
    expect(loginButton).toBeInTheDocument();
});

test('renders development navbar link', () => {
    render(<App />);

    const developmentDropdown = screen.getByText("Development")
    expect(developmentDropdown).toBeInTheDocument();
});

test('renders development dropdown menu', () => {
    render(<App />);

    const developmentDropdown = screen.getByText("Development")
    developmentDropdown.click();

    const dropdownItem = screen.getAllByText("Home")
    expect(dropdownItem).toHaveLength(2);
});

test('nav to development page should have /development href', () => {
    render(<App />);

    screen.getByText("Development").click();
    const navLink = screen.getAllByText("Home")[1];
    
    expect(navLink).toHaveAttribute('href', '/development')
})