// lib/admin-api.ts

export async function fetchTutorialsFromBackend() {
  const res = await fetch("http://localhost/mch-api/tutorials/");
  if (!res.ok) throw new Error("Failed to fetch tutorials");
  return res.json();
}
