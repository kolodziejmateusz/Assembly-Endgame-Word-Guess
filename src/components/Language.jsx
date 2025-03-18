export default function Language({ name, backgroundColor, color, className }) {
  return <span className={className} style={{ backgroundColor, color }}>{name}</span>;
}
