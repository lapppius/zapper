import { getCountries } from "../../lib/postgres/countries";
import List from "../../../components/UI/List";

export default async function Countries() {
  const countries = await getCountries();

  return <List data={countries} />;
}
