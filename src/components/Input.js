import styled from "styled-components";

const Input = ({ id, type, placeholder, value, onChange }) => (
  <Element
    id={id}
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
);

const Element = styled.input`
  width: 100%;
  margin-top: 4px;
  padding: 12px 14px;
  border: none;
  border-radius: 8px;
  color: ${({ theme }) => theme.neutral["700"]};
  background-color: ${({ theme }) => theme.white};
  :focus {
    outline: ${({ theme }) => `2px solid ${theme.green["500"]}`};
  }
  ::placeholder {
    color: ${({ theme }) => theme.neutral["400"]};
  }
`;

export default Input;
