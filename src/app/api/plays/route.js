// export async function GET(req) {
//   const ip = req.headers.get("x-forwarded-host");

//   return new Response(ip, { status: ip ? 200 : 404 });
// }
export async function GET(req) {
  const { searchParmas } = new URL(req.url);
  const res = await fetch(searchParmas.get("url"));
  const json = res.json();
  return new Response(json, { status: 200 });
}
