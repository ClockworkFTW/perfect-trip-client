// Config
import { KEYWORDS } from "../../../config";

// Components
import Icon from "../../Icon";

// Theme
import theme from "../../../styles/theme";

const styleParent = {
  position: "relative",
  fontSize: "42px",
};

const styleChild = {
  position: "absolute",
  left: "50%",
  transform: "translateX(-50%)",
  color: "white",
};

const styleIcon = {
  ...styleChild,
  top: "2px",
  fontSize: "30px",
};

const styleNumber = {
  ...styleChild,
  top: "8px",
  fontSize: "22px",
  fontFamily: "Helvetica",
  fontWeight: "700",
};

const MarkerIcon = ({ color, number, experience = { keywords: [] } }) => {
  const icons = [];

  experience.keywords.forEach((keyword) => {
    if (keyword in KEYWORDS) {
      icons.push(KEYWORDS[keyword].icon);
    }
  });

  return (
    <div style={{ ...styleParent, color: theme[color]["500"] }}>
      <Icon icon="location-pin" shadow={true} />
      {number ? (
        <div style={styleNumber}>{number}</div>
      ) : (
        <div style={styleIcon}>
          <Icon icon={icons[0]} />
        </div>
      )}
    </div>
  );
};

export default MarkerIcon;
