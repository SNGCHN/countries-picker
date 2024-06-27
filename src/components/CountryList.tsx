import { useEffect, useState } from "react";
import { Country } from "../types/country";
import { getCountries } from "../api/countryApi";
import CountryCard from "./CountryCard";

const CountryList: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);
  const [originalOrder, setOriginalOrder] = useState<Country[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data: Country[] = await getCountries();
        setCountries(data);
        setOriginalOrder(data);
      } catch (error) {
        alert(error);
      }
    };
    fetchCountries();
  }, []);

  const handleSelectedCountries = (country: Country): void => {
    if (!selectedCountries.find((selectedCountry: Country) => selectedCountry.name.common === country.name.common)) {
      setSelectedCountries([...selectedCountries, country]);
      setCountries(countries.filter((c: Country) => c.name.common !== country.name.common));
    } else {
      setSelectedCountries(selectedCountries.filter((selectedCountry: Country) => selectedCountry.name.common !== country.name.common));
      const newCountries = [...countries, country];
      newCountries.sort(
        (a, b) => originalOrder.findIndex((c) => c.name.common === a.name.common) - originalOrder.findIndex((c) => c.name.common === b.name.common)
      );
      setCountries(newCountries);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">선택된 목록</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {selectedCountries.map((country: Country) => (
          <CountryCard key={country.name.common} country={country} handleSelectedCountries={handleSelectedCountries} />
        ))}
      </div>
      <h1 className="text-2xl font-bold text-center mb-4">나라 목록</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {countries.map((country: Country) => (
          <CountryCard key={country.name.common} country={country} handleSelectedCountries={handleSelectedCountries} />
        ))}
      </div>
    </div>
  );
};

export default CountryList;
