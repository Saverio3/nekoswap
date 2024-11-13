"use client";

import React, { useState } from "react";

import IconBtn from "../../Button/IconBtn";

import Home from "../../../assets/icons/home.svg";
import Docs from "../../../assets/icons/docs.svg";
import Alert from "../../../assets/icons/alerts.svg";
import FlashClub from "../../../assets/icons/logo.svg";
import Floki from "../../../assets/icons/floki.svg";
import Wallet from "../../../assets/icons/wallet.svg";
import Add from "../../../assets/icons/add.svg";
import BNBIcon from "../../../assets/icons/bnb-logo.svg";
import CloseIcon from "../../../assets/icons/close.svg";

import EtherNetIcon from "../../../assets/icons/ether-net.svg";
import BNBNetIcon from "../../../assets/icons/bnb-net.svg";
import OpBNBNetIcon from "../../../assets/icons/opbnb-net.svg";
import PolygonNetIcon from "../../../assets/icons/polygon-net.svg";

import UKIcon from "../../../assets/icons/uk.svg";
import UpIcon from "../../../assets/icons/up.svg";
import DownIcon from "../../../assets/icons/down.svg";

import MenuIcon from "../../../assets/icons/menu.svg";
import FlashIcon from "../../../assets/icons/flash.svg";

import { useRouter } from "next/navigation";
import ExportedImage from "next-image-export-optimizer";
import Link from "next/link";

const Header = ({ show, setShow }) => {
  const mainnet = [
    { name: "Ethereum", icon: EtherNetIcon, index: 1 },
    { name: "BNB Smart Chain", icon: BNBNetIcon, index: 2 },
    { name: "OpBNB Mainnet", icon: OpBNBNetIcon, index: 3 },
    { name: "Polygon", icon: PolygonNetIcon, index: 4 },
  ];

  const testnet = [
    { name: "Goerli", icon: EtherNetIcon, index: 5 },
    { name: "BNB Smart Chain", icon: BNBNetIcon, index: 6 },
    { name: "OpBNB", icon: OpBNBNetIcon, index: 7 },
    { name: "Polygon (mumbai)", icon: PolygonNetIcon, index: 8 },
  ];

  const lanList = [
    {
      name: "UK",
      img: UKIcon,
    },
  ];

  const [netShow, setNetShow] = useState(false);
  const [lanShow, setLanShow] = useState(false);
  const [createShow, setCreateShow] = useState(false);

  const router = useRouter();

  return (
    <>
      <div className="relative w-[calc(100vw-286px)] h-20 px-10 bg-[#1b1b1b]/[.99] ml-[-1px] flex items-center justify-between max-sm:hidden">
        <div className="flex gap-2">
          <IconBtn
            text="Home"
            icon={Home}
            heigh="h-[37px]"
            onClick={() => {
              router.push("/");
            }}
          />
          <Link
            href={"https://flash-technologies.gitbook.io/flash-launchpad/"}
            target="_blank"
          >
            <IconBtn text="Docs" icon={Docs} heigh="h-[37px]" />
          </Link>
          <Link href={"https://t.me/flashlaunchalert"} target="_blank">
            <IconBtn text="presale alerts" icon={Alert} heigh="h-[37px]" />
          </Link>
          <Link href={"https://rarible.com/flashtechno/sale"} target="_blank">
            <IconBtn
              text="Join Taiko Club"
              icon={FlashClub}
              heigh="h-[37px]"
              iconHeight={25}
            />
          </Link>
          <div className="ml-[33px]">
            <IconBtn
              text="Burn Floki For get Whitelist"
              icon={Floki}
              BgClass="bg-[#C03F4A]"
              TxClass="color-[#000]"
              heigh="h-[37px]"
              onClick={() => {
                router.push("/burn");
              }}
            />
          </div>
        </div>

        <div className="flex gap-x-[15.05px]">
          <div
            onClick={() => setLanShow(!lanShow)}
            className="border border-[#2C2C2C] rounded-[33px] py-[5px] px-[15px] w-[110px] h-[34px] flex flex-row gap-[10px] items-center cursor-pointer"
          >
            <ExportedImage src={UKIcon} alt="icon" />
            <p className="text-white text-sm">UK</p>
            <div className="flex flex-row justify-center items-center w-[24px] h-[24px]">
              <ExportedImage src={UpIcon} alt="icon" />
            </div>
          </div>
          <IconBtn
            text="Create"
            icon={Add}
            BgClass="bg-[#1b1b1b]"
            TxClass="text-[#C03F4A]"
            TxSize="text-[14px]"
            rounded="rounded-[30px]"
            heigh="h-[35px]"
            px="px-[18px]"
            py="py-[5px]"
            borderColor="border-[#C03F4A]"
            onClick={() => setCreateShow(!createShow)}
          />
          <IconBtn
            text="BNB Smart Chain"
            icon={BNBIcon}
            BgClass="bg-[#282828]"
            TxClass="text-white"
            TxSize="text-[16px]"
            heigh="h-[35px]"
            px="px-[18px]"
            py="py-[5px]"
            onClick={() => setNetShow(!netShow)}
          />
          <IconBtn
            text="Connect"
            icon={Wallet}
            BgClass="bg-[#C03F4A]"
            TxClass="text-[#16171B]"
            TxSize="text-[16px]"
            rounded="rounded-[30px]"
            heigh="h-[35px]"
            px="px-[18px]"
            py="py-[5px]"
          />
        </div>
        {lanShow && (
          <div className="bg-[#1B1B1B] flex flex-col rounded-lg absolute top-[60px] right-[590px] z-50 pb-2">
            {lanList.map((item, index) => (
              <div
                key={index}
                className="flex flex-row py-3 px-5 border-b border-white gap-3 cursor-pointer"
                onClick={() => setLanShow(false)}
              >
                <ExportedImage src={item.img} alt="image" />
                <p className="text-white">{item.name}</p>
              </div>
            ))}
          </div>
        )}

        {netShow && (
          <div className="fixed flex top-0 left-0 w-screen h-screen z-50 justify-center items-center bg-[#000] bg-opacity-50">
            <div className="bg-[#1B1B1B] rounded-lg w-[370px] pt-6 pb-4 border-solid border-2 border-[#2C2C2C]">
              <div className="flex flex-row px-[20px] pb-[16px] justify-between">
                <p className="text-white text-[20px]">Switch Network</p>
                <ExportedImage
                  src={CloseIcon}
                  alt="icon"
                  className="cursor-pointer"
                  onClick={() => setNetShow(false)}
                />
              </div>
              <div className="text-sm text-[#C03F4A] py-[13px] text-center">
                Mainnet
              </div>
              {mainnet.map((item, index) => (
                <div
                  key={index}
                  className="py-3 px-5 flex flex-row gap-3 items-center border-b border-[#2C2C2C] cursor-pointer"
                  onClick={() => setNetShow(false)}
                >
                  <ExportedImage src={item.icon} alt="icon" />
                  <p className="text-white text-sm">{item.name}</p>
                </div>
              ))}

              <div className="text-sm text-[#C03F4A] py-[13px] text-center">
                Testnet
              </div>

              {testnet.map((item, index) => (
                <div
                  key={index}
                  className="py-3 px-5 flex flex-row gap-3 items-center border-b border-[#2C2C2C] cursor-pointer"
                  onClick={() => setNetShow(false)}
                >
                  <ExportedImage src={item.icon} alt="icon" />
                  <p className="text-white text-sm">{item.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {createShow && (
          <>
            <div
              className="fixed bg-transparent top-0 left-0 w-screen h-screen z-10"
              onClick={() => {
                setCreateShow(false);
              }}
            ></div>
            <div className="bg-[#1B1B1B] rounded-[8px] shadow-[0_8px_55px_0_rgba(0, 0, 0, 0.20)] py-6 absolute top-[90px] right-[300px] z-50 w-[400px] z-20">
              <p className="text-center text-[#C03F4A] text-[25.6px]">Create</p>
              <div className="flex flex-row px-[28.5px] py-[25px]">
                <div className="flex flex-col gap-5 border-r-2 border-[#2C2C2C] pr-[39px] py-[15px]">
                  <button
                    onClick={() => {
                      setCreateShow(false);
                      router.push("/launch/create-token");
                    }}
                    className="outline-none border-2 border-[#C03F4A] rounded-[23px] flex flex-row items-center justify-center w-[131px] h-[41px] text-white text-[13px]"
                  >
                    Token
                  </button>
                  <button
                    onClick={() => {
                      setCreateShow(false);
                      router.push("/launch/launchpad");
                    }}
                    className="outline-none border-2 border-[#C03F4A] rounded-[23px] flex flex-row items-center justify-center w-[131px] h-[41px] text-white text-[13px]"
                  >
                    Launchpad
                  </button>
                  <button
                    onClick={() => {
                      setCreateShow(false);
                      router.push("/launch/fair-launch");
                    }}
                    className="outline-none border-2 border-[#C03F4A] rounded-[23px] flex flex-row items-center justify-center w-[131px] h-[41px] text-white text-[13px]"
                  >
                    Fair Launch
                  </button>
                </div>
                <div className="flex flex-col gap-5 pl-[39px] py-[15px]">
                  <button
                    onClick={() => {
                      setCreateShow(false);
                      router.push("/launch/create-staking");
                    }}
                    className="outline-none border-2 border-[#C03F4A] rounded-[23px] flex flex-row items-center justify-center w-[131px] h-[41px] text-white text-[13px]"
                  >
                    Staking Pool
                  </button>
                  <button
                    onClick={() => {
                      setCreateShow(false);
                      router.push("/launch/create-lock");
                    }}
                    className="outline-none border-2 border-[#C03F4A] rounded-[23px] flex flex-row items-center justify-center w-[131px] h-[41px] text-white text-[13px]"
                  >
                    Lock
                  </button>
                  <button
                    onClick={() => {
                      setCreateShow(false);
                      router.push("/airdrop");
                    }}
                    className="outline-none border-2 border-[#C03F4A] rounded-[23px] flex flex-row items-center justify-center w-[131px] h-[41px] text-white text-[13px]"
                  >
                    Airdrop
                  </button>
                </div>
              </div>
              <p className="text-sm text-[#C03F4A] text-center">
                Apply For Flash Incubation
              </p>
            </div>
          </>
        )}
      </div>
      <div className="sm:hidden flex flex-row p-5 justify-between">
        <div className="flex flex-row items-center gap-1">
          <ExportedImage src={FlashIcon} alt="flash" />
          <p className="text-white text-sm">TaikoPad</p>
        </div>
        <div className="flex flex-row items-center gap-1">
          <IconBtn
            text="Connect"
            icon={null}
            BgClass="bg-[#C03F4A]"
            TxClass="text-[#16171B]"
            TxSize="text-[16px]"
            rounded="rounded-[30px]"
            heigh="h-[35px]"
            px="px-[18px]"
            py="py-[5px]"
          />
          <ExportedImage
            src={MenuIcon}
            alt="menu"
            className="cursor-pointer"
            onClick={() => {
              setShow(!show);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Header;
