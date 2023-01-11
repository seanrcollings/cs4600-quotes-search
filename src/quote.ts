export interface Quote {
  _id: string;
  author: string;
  authorSlug: string;
  content: string;
  dateAdded: string;
  dateModified: string;
  length: number;
  tags: string[];
}

export async function getRandomQuote(): Promise<Quote> {
  const res = await fetch("https://api.quotable.io/random");
  return await res.json();
}

interface QuotesQueryParams extends Record<string, string> {
  query: string;
  fields: keyof Quote;
}

interface SearchResult<T> {
  count: number;
  lastItemIndex: number;
  page: number;
  results: T;
  totalCount: number;
  totalPages: number;
}

export async function searchQuotes(
  params: QuotesQueryParams
): Promise<SearchResult<Quote[]>> {
  const urlParams = new URLSearchParams(params);
  const result = await fetch(
    `https://api.quotable.io/search/quotes?${urlParams}`
  );
  return await result.json();
}
