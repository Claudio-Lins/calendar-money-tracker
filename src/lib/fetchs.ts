export async function getEntries() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/entries`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
  });
  const entries = await res.json();
  return entries;
}
