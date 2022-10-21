import styled from "styled-components";

const TextArea = ({ id, type, placeholder, value, onChange }) => (
  <Element
    id={id}
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
);

const Element = styled.textarea`
  width: 100%;
  padding: 12px 14px;
  border: none;
  border-radius: 8px;
  color: ${({ theme }) => theme.neutral["700"]};
  background-color: ${({ theme }) => theme.white};
  :focus {
    outline: ${({ theme }) => `3px solid ${theme.green["500"]}`};
  }
  ::placeholder {
    color: ${({ theme }) => theme.neutral["400"]};
  }
`;

export default TextArea;
