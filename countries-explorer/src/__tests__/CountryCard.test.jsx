import React from 'react';
const { render, screen, fireEvent } = require('@testing-library/react');
const CountryCard = require('../components/CountryCard').default;
const { BrowserRouter } = require('react-router-dom');
const { useUser } = require('../context/UserContext');

jest.mock('../context/UserContext');

const mockCountry = {
  cca3: 'LKA',
  flags: {
    png: 'https://flagcdn.com/w320/lk.png',
    svg: 'https://flagcdn.com/lk.svg',
  },
  name: { common: 'Sri Lanka' },
  capital: ['Sri Jayawardenepura Kotte'],
  region: 'Asia',
  population: 21919000,
  languages: { sin: 'Sinhala', tam: 'Tamil' },
};

describe('CountryCard', () => {
  test('renders country information correctly', () => {
    useUser.mockReturnValue({
      user: null,
      getFavorites: () => [],
      toggleFavorite: jest.fn(),
    });

    render(
      <BrowserRouter>
        <CountryCard country={mockCountry} />
      </BrowserRouter>
    );

    expect(screen.getByText(/Sri Lanka/i)).toBeInTheDocument();
    expect(screen.getByText(/Asia/i)).toBeInTheDocument();
    expect(screen.getByText(/Sri Jayawardenepura/i)).toBeInTheDocument();
    expect(screen.getByText(/Sinhala, Tamil/i)).toBeInTheDocument();
  });

  test('toggles favorite when heart icon is clicked', () => {
    const toggleFavoriteMock = jest.fn();
  
    useUser.mockReturnValue({
      user: { username: 'testuser' },
      getFavorites: () => [],
      toggleFavorite: toggleFavoriteMock,
    });
  
    render(
      <BrowserRouter>
        <CountryCard country={mockCountry} />
      </BrowserRouter>
    );
  
    const heartBtn = screen.getByRole('button');
    fireEvent.click(heartBtn);
  
    expect(toggleFavoriteMock).toHaveBeenCalledWith('LKA');
  });
});
