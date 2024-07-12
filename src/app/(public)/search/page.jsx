import { getRadios } from "../../lib/postgres/radios";
import RadiosList from "@/components/UI/RadiosList";

export default async function Search({ searchParams }) {
  const query = searchParams.q;
  const res = await getRadios({ query: query, limit: 10 });

  return <RadiosList radios={res} listTitle={"Results"} />;
}
