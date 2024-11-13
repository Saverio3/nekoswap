
//! import icons
import EtherscanLogoIcon from "../../../assets/icons/etherscan-logo-small.svg";
import DextoolsLogoIcon from "../../../assets/icons/dextools-contract-logo-small.svg";
import ExportedImage from "next-image-export-optimizer";

const AddressInput = ({ value = "" }) => {
  const handleChange = () => {};
  return (
    <div className="relative">
      <input
        type="text"
        className="bg-[#141414] border border-[#2C2C2C] h-[38px] pl-4 outline-none rounded-[8px] text-white text-[14px] w-[100%]"
        value={value}
        onChange={handleChange}
      />
      <div className="absolute top-0 right-0 bg-[#282828] rounded-e-lg h-[38px] w-[92px] flex flex-row items-center justify-center gap-3">
        <ExportedImage src={EtherscanLogoIcon} alt="image" />
        <ExportedImage src={DextoolsLogoIcon} alt="image" />
      </div>
    </div>
  );
};

export default AddressInput;
