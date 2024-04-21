import { getCountry } from "@/app/lib/postgres/countries";

export default async function Country({ params }) {
  const country = await getCountry(params.code);
  console.log(country);
  return <>{country.enName}</>;
}
