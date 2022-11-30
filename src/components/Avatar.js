import styled from "styled-components";

const Avatar = ({ user }) => {
  const placeholder = `https://ui-avatars.com/api/?background=random&bold=true&name=${user.username}`;

  const avatar = user.avatar ? user.avatar : placeholder;

  return <Image src={avatar} />;
};

const Image = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 12px;
  border-radius: 8px;
`;

export default Avatar;
