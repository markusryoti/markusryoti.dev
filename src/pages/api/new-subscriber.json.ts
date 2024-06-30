export async function POST({ request }: { request: Request }) {
  if (request.headers.get("Content-Type") !== "application/json") {
    return new Response(null, { status: 400 });
  }

  const body = await request.json();

  console.log(body);

  return new Response(
    JSON.stringify({
      message: "Got request ",
    }),
    {
      status: 200,
    }
  );
}
