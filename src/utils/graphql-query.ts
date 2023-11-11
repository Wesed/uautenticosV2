export const fetchGraphQuery = async (query: string) => {
  const res = await fetch(process.env.NEXT_PUBLIC_HYGRAPH_API!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_HYGRAPH_TOKEN}`
    },
    body: JSON.stringify({query}),
    next: {
      revalidate: 60 * 60 * 24 // 24 hours
    }
  })

  const { data } = await res.json()
  
  return data
}