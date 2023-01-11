import "./QuoteCard.css";

interface Props {
  quote: string;
  author: string;
}

export default function QuoteCard(props: Props) {
  const { quote, author } = props;
  return (
    <div className="quote-card">
      <hr />
      <p>{quote}</p>
      <cite>&mdash; {author}</cite>
    </div>
  );
}
