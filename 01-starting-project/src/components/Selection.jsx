export default function Selection({ title, children, ...props }) {
  return (
    <section {...props}>
      <h1>{title}</h1>
      {children}
    </section>
  );
}
