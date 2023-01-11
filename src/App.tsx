import { FormEventHandler, useEffect, useState } from "react";
import QuoteCard from "./components/QuoteCard";
import { getRandomQuote, Quote, searchQuotes } from "./quote";

import "./App.css";

function App() {
  const [randomQuote, setRandomQuote] = useState<Quote | null>(null);
  const [search, setSearch] = useState("");
  const [quotes, setQuotes] = useState<Quote[] | null>(null);

  useEffect(() => {
    getRandomQuote().then(setRandomQuote);
  }, []);

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();
    if (search) {
      const searchResult = await searchQuotes({
        query: search,
        fields: "author",
      });
      setQuotes(searchResult.results);
    }
  };

  return (
    <div className="app">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="input-wrapper">
          <label htmlFor="search">Quotes Search</label>
          <input
            type="text"
            placeholder="Albert Einsetein"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            id="search"
          />
          <span className="input-error">
            {quotes?.length == 0 && "Nothing matched the search query"}
          </span>
        </div>
      </form>
      <div className="quotes-container">
        {randomQuote && !quotes?.length && (
          <div className="random-quote">
            <p>{randomQuote.content}</p>
            <cite>&mdash; {randomQuote.author}</cite>
          </div>
        )}
        {quotes &&
          quotes.map((quote) => (
            <QuoteCard
              key={quote._id}
              quote={quote.content}
              author={quote.author}
            />
          ))}
      </div>
    </div>
  );
}

export default App;
