import RadiosList from "@/components/UI/RadiosList";
import { getRadios } from "@/app/lib/postgres/radios";

export default async function Home() {
  const latestRadios = await getRadios({ orderBy: "desc", limit: 8 });
  const allRadios = await getRadios({ limit: 8 });

  return (
    <>
      <RadiosList radios={latestRadios} listTitle={"Latest Radios"} />
      <RadiosList radios={allRadios} listTitle={"All Radios"} />
      {/* <PaginationControls radios={JSON.parse(JSON.stringify(radiosList))} /> */}
    </>
  );
}
