export default function OrderInputArea({
  id, label, inputRequired, type, value, onChange, informationMessage,
}) {
  return (
    <div>
      <label htmlFor={id}>
        {label}
        <span>{inputRequired ? '*' : null}</span>
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event)}
      />
      <p>
        {informationMessage}
      </p>
    </div>
  );
}
