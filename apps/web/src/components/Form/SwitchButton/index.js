//! import icons
import SwitchIcon from "../../../assets/icons/switch.svg";
import SwitchActiveIcon from "../../../assets/icons/switch-active.svg";
import ExportedImage from "next-image-export-optimizer";

const SwitchButton = ({ onClick = "", check = false }) => {
  return (
    <div onClick={() => onClick(!check)} className="cursor-pointer">
      {check ? (
        <ExportedImage src={SwitchActiveIcon} alt="" />
      ) : (
        <ExportedImage src={SwitchIcon} alt="" />
      )}
    </div>
  );
};

export default SwitchButton;
