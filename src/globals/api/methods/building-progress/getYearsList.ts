export async function getYearsList(complexCode: string) {
  return await fetch(`/api/${complexCode}/get-years-list`).then((res) => res.json())
}
