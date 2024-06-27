import { Country } from "../types/country";

interface CountryCardProps {
  country: Country;
  handleSelectedCountries: (country: Country) => void;
}

const CountryCard: React.FC<CountryCardProps> = ({ country, handleSelectedCountries }) => {
  return (
    <div
      className="bg-white shadow-md rounded p-4 m-2 cursor-pointer hover:shadow-lg transition-shadow flex flex-col items-center"
      onClick={() => handleSelectedCountries(country)}
    >
      <img className="w-20 h-20 mb-2" src={country.flags.svg} alt={`Flag of ${country.name.common}`} />
      <h3 className="text-lg font-bold">{country.name.common}</h3>
      <p className="text-sm">{country.capital && country.capital.length > 0 ? country.capital[0] : "No Capital"}</p>
    </div>
  );
};

export default CountryCard;
