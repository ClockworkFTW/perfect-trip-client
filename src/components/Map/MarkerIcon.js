import { keywords } from "../../config";

import Icon from "../Icon";

const styleParent = {
  position: "relative",
  color: "#22c55e",
  fontSize: "42px",
};

const styleChild = {
  position: "absolute",
  top: "2px",
  left: "50%",
  transform: "translateX(-50%)",
  color: "white",
  fontSize: "30px",
};

const MarkerIcon = ({ experience = { keywords: [] } }) => {
  const icons = [];

  experience.keywords.forEach((keyword) => {
    if (keyword in keywords) {
      icons.push(keywords[keyword].icon);
    }
  });

  return (
    <div style={styleParent}>
      <Icon icon="location-pin" />
      {icons.length === 0 ? null : (
        <div style={styleChild}>
          <Icon icon={icons[0]} />
        </div>
      )}
    </div>
  );
};

export default MarkerIcon;
