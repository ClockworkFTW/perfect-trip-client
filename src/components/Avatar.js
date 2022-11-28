import styled from "styled-components";

const Avatar = ({ user }) => {
  const placeholder = `https://ui-avatars.com/api/?background=random&bold=true&name=${user.username}`;

  const avatar = user.avatar ? user.avatar : placeholder;

  return <Image src={avatar} />;
};

const Image = styled.img`
  display: inline-block;
  margin-bottom: -15px;
  margin-right: 12px;
  padding: 0;
  aspect-ratio: 1 / 1;
  width: 40px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.white};
`;

export default Avatar;
