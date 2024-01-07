export const fetcher = (url: string) =>
  fetch(url, {
    next: { revalidate: 1 },
  }).then((res) => res.json());
