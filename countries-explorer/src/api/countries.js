// src/api/countries.js

const BASE_URL = "https://restcountries.com/v3.1";

export const getAllCountries = async () => {
  const res = await fetch(`${BASE_URL}/all`);
  if (!res.ok) throw new Error("Failed to fetch countries");
  return res.json();
};

export const getCountryByName = async (name) => {
    const res = await fetch(`${BASE_URL}/name/${name}`);
    if (!res.ok) throw new Error("Country not found");
    return res.json();
};

export const getCountriesByRegion = async (region) => {
    const res = await fetch(`${BASE_URL}/region/${region}`);
    if (!res.ok) throw new Error("Failed to fetch countries by region");
    return res.json();
};