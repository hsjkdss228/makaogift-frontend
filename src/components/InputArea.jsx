/* eslint-disable react/jsx-props-no-spreading */

export default function InputArea({
  register, id, label, type, name, conditions, placeholder, informationMessage,
}) {
  // TODO: SignUpForm, Login에서 사용할 label은 prop으로 구분되어야 함
  //  Login 쪽 label은 화면 상에 나타나지 않아야 함

  return (
    <div>
      <label htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(name, conditions)}
      />
      <p>
        {informationMessage}
      </p>
    </div>
  );
}
