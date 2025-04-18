// src/api/countries.js

const BASE_URL = "https://restcountries.com/v3.1";

export const getAllCountries = async () => {
  const res = await fetch(`${BASE_URL}/all`);
  if (!res.ok) throw new Error("Failed to fetch countries");
  return res.json();
};
