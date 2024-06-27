import axios from "axios";
import { Country } from "../types/country";

export const getCountries = async (): Promise<Country[]> => {
  try {
    const response = await axios.get("https://restcountries.com/v3.1/all");
    return response.data;
  } catch (error) {
    console.log("오류가 발생했습니다.", error);
    throw error;
  }
};
