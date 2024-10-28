export async function getQuarters(complexCode: string, selectedYear: string) {
  return await fetch(`/api/${complexCode}/get-year-quarters?year=${selectedYear}`).then((res) => res.json())
}
