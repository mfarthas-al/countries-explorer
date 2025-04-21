import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CountryList from '../components/CountryList';
import { useUser } from '../context/UserContext';
import * as api from '../api/countries';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../context/UserContext');
jest.mock('../api/countries');

const mockCountries = [
  {
    cca3: 'LKA',
    flags: { svg: 'lk.svg' },
    name: { common: 'Sri Lanka' },
    capital: ['Colombo'],
    region: 'Asia',
    population: 21919000,
    languages: { sin: 'Sinhala', tam: 'Tamil' },
  },
  {
    cca3: 'IND',
    flags: { svg: 'in.svg' },
    name: { common: 'India' },
    capital: ['New Delhi'],
    region: 'Asia',
    population: 1390000000,
    languages: { hin: 'Hindi', eng: 'English' },
  },
];

describe('CountryList Integration', () => {
  beforeEach(() => {
    useUser.mockReturnValue({
      user: { username: 'testuser' },
      getFavorites: () => [],
      toggleFavorite: jest.fn(),
    });

    api.getAllCountries.mockResolvedValue(mockCountries);
    api.getCountryByName.mockImplementation((query) =>
      Promise.resolve(
        mockCountries.filter((c) =>
          c.name.common.toLowerCase().includes(query.toLowerCase())
        )
      )
    );
  });

  test('renders and filters countries by search', async () => {
    render(
      <BrowserRouter>
        <CountryList />
      </BrowserRouter>
    );

    // Wait for initial countries to render
    expect(await screen.findByText('Sri Lanka')).toBeInTheDocument();
    expect(await screen.findByText('India')).toBeInTheDocument();

    // Type "India" in search
    const input = screen.getByPlaceholderText(/search for a country/i);
    fireEvent.change(input, { target: { value: 'India' } });

    // Wait for search to update
    expect(await screen.findByText('India')).toBeInTheDocument();
    await waitFor(() => {
        expect(screen.queryByText('Sri Lanka')).not.toBeInTheDocument();
      });
  });
});
