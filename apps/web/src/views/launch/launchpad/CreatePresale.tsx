"use client";

import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { Box, Flex, Heading, Button, Card, Text, Progress, Radio, Checkbox, InputProps, useToast } from '@pancakeswap/uikit';
import { useTranslation } from '@pancakeswap/localization';
import useTheme from 'hooks/useTheme';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { redirect, useRouter } from "next/navigation";
import ReactSelect from 'react-select';
import { ethers } from 'ethers';
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice';
import abi from './components/PresaleAbi';
import {parseEther} from 'viem'

import Warning from "../../../components/Alert/Warning";
import DefaultSelect from "../../../components/Form/DefaultSelect";

// Import icons
import LogoURLIcon from "../../../assets/icons/logoURL-input.svg";
import WebsiteIcon from "../../../assets/icons/website-input.svg";
import TwitterIcon from "../../../assets/icons/twitter-input.svg";
import FacebookIcon from "../../../assets/icons/facebook-input.svg";
import GithubIcon from "../../../assets/icons/github-input.svg";
import TelegramIcon from "../../../assets/icons/telegram-input.svg";
import InstagramIcon from "../../../assets/icons/instagram-input.svg";
import DiscordIcon from "../../../assets/icons/discord-input.svg";
import RedditIcon from "../../../assets/icons/reddit-input.svg";
import YoutubeIcon from "../../../assets/icons/youtube-input.svg";
import WarningIcon from "../../../assets/icons/warning.svg";
import DatePickerIcon from "../../../assets/icons/datepicker.svg";
import { CONTRACT_ADDRESS, RPC_URL, X_API_KEY, PINATA_API_KEY, PINATA_SECRET_KEY } from "./inputs";

const CONTENT_WIDTH = '630px';

const LaunchpadPage = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledCard = styled(Card)`
  background: ${({ theme }) => theme.colors.background};
  border-radius: 24px;
  box-shadow: 0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05);
  padding: 24px;
  margin-top: 24px;
  width: 100%;
  max-width: ${CONTENT_WIDTH};
`;

const StyledWarning = styled(Warning) <{ mb?: string }>`
  margin-bottom: ${({ mb }) => mb || '0'};
`;

const CreateTokenButton = styled(Button)`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
`;

const InputWrapper = styled.div`
  margin-bottom: 24px;
  padding: 0 16px;
  width: 100%;
`;

const InputLabel = styled(Text)`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 8px;
  padding-left: 16px;
`;

const CustomInput = styled.input`
  background-color: rgb(244, 240, 248); // Light purple background
  border: 1px solid ${({ theme }) => theme.colors.inputSecondary};
  border-radius: 16px;
  color: black;
  display: block;
  font-size: 16px;
  height: 48px;
  outline: 0;
  padding: 0 16px;
  width: 100%;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSubtle};
  }

  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.primary};
    box-shadow: none;
  }
`;

// Custom select component
const CustomSelect = styled.select`
  background-color: rgb(244, 240, 248);
  border: 1px solid ${({ theme }) => theme.colors.inputSecondary};
  border-radius: 16px;
  color: ${({ theme }) => theme.colors.text};
  display: block;
  font-size: 16px;
  height: 48px;
  outline: 0;
  padding: 0 16px;
  width: 100%;

  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.primary};
    box-shadow: none;
  }
`;

// const StyledInput = styled(Input)`
//   background-color: rgb(244, 240, 248); // Light purple background to match date picker
//   border: 1px solid ${({ theme }) => theme.colors.inputSecondary};
//   border-radius: 16px;
//   color: ${({ theme }) => theme.colors.text};
//   height: 48px;
//   padding: 0 16px;
//   width: 100%;
  
//   &::placeholder {
//     color: ${({ theme }) => theme.colors.textSubtle};
//   }

//   &:focus {
//     box-shadow: none;
//     border: 1px solid ${({ theme }) => theme.colors.primary};
//   }
// `;

const StyledSelect = styled(DefaultSelect)`
  background-color: rgb(244, 240, 248);
  width: 100%;
  .select-wrapper {
    background-color: rgb(244, 240, 248);
    width: 100%;
  }
  select {
    background-color: rgb(244, 240, 248);
    border: 1px solid ${({ theme }) => theme.colors.inputSecondary};
    border-radius: 16px;
    height: 48px;
    padding: 0 16px;
    width: 100%;
  }
`;

const DatePickerWrapper = styled.div`
  position: relative;
  width: 100%;

  .react-datepicker-wrapper {
    width: 100%;
  }

  .react-datepicker__input-container {
    width: 100%;
  }

  .react-datepicker-popper {
    z-index: 10;
  }

  .react-datepicker {
    font-family: Arial, sans-serif;
    border-radius: 16px;
    border: 1px solid ${({ theme }) => theme.colors.inputSecondary};
    background-color: ${({ theme }) => theme.colors.background};
  }

  .react-datepicker__header {
    background-color: ${({ theme }) => theme.colors.background};
    border-bottom: 1px solid ${({ theme }) => theme.colors.inputSecondary};
  }

  .react-datepicker__time-container {
    border-left: 1px solid ${({ theme }) => theme.colors.inputSecondary};
  }

  .react-datepicker__time-container .react-datepicker__time {
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

const StyledDatePicker = styled(DatePicker)`
  background-color: rgb(244, 240, 248);
  border: 1px solid ${({ theme }) => theme.colors.inputSecondary};
  border-radius: 16px;
  color: black;
  height: 48px;
  padding: 0 16px;
  width: 100%;
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.textSubtle};
  }
`;

const StyledButton = styled(Button)`
  border-radius: 16px;
  height: 48px;
  font-size: 16px;
`;

const StyledFlex = styled(Flex) <{ gap?: string }>`
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection || 'row'};
  gap: ${({ gap }) => gap || '0'};
`;

const ButtonContainer = styled(Flex)`
  justify-content: center;
  gap: 16px;
  width: 100%;
  margin-top: 24px;
`;

const FlexBox = styled(Box) <{ flex?: number }>`
  flex: ${({ flex }) => flex || 'initial'};
`;

const StepHeader = styled(Flex)`
  margin-bottom: 24px;
  flex-direction: column;
  align-items: center;
  padding: 0 16px;
`;

const StepTitle = styled(Text)`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 8px;
`;

const StepDescription = styled(Text)`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textSubtle};
  text-align: center;
`;

const StyledTextArea = styled.textarea`
  background-color: ${({ theme }) => theme.colors.input};
  border: 1px solid ${({ theme }) => theme.colors.inputSecondary};
  border-radius: 16px;
  color: ${({ theme }) => theme.colors.text};
  padding: 16px;
  width: 100%;
  min-height: 120px;
  resize: vertical;
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.textSubtle};
  }
`;

const StepIndicator: React.FC<{ currentStep: number }> = ({ currentStep }) => (
  <Box width="100%" maxWidth={CONTENT_WIDTH} mb="24px">
    <Progress primaryStep={currentStep * 25} scale="sm" />
    <Flex justifyContent="space-between" mt="8px">
      {['Approve Token', 'Presale Info', 'Project Info', 'Submit'].map((label, index) => (
        <Text key={label} color={currentStep > index ? 'primary' : 'textSubtle'} fontSize="14px">
          {label}
        </Text>
      ))}
    </Flex>
  </Box>
);

interface CreatePresaleProps {
  onBack: () => void;
}

const CreatePresale: React.FC<CreatePresaleProps> = ({ onBack }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [step, setStep] = useState<number>(1);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const router = useRouter();


  // State for all inputs
  const [currency, setCurrency] = useState<string>('BNB');
  const [feeOption, setFeeOption] = useState<string>(`3.5% BNB`);
  const [listingOption, setListingOption] = useState<string>('Auto Listing');
  const [affiliateProgram, setAffiliateProgram] = useState<string>('Disable');
  const [whitelist, setWhitelist] = useState<string>('Disable');
  const [tokenAddress, setTokenAddress] = useState<string>('');
  const [presaleRate, setPresaleRate] = useState<string>('');
  const [softCap, setSoftCap] = useState<string>('');
  const [hardCap, setHardCap] = useState<string>('');
  const [minBuy, setMinBuy] = useState<string>('');
  const [maxBuy, setMaxBuy] = useState<string>('');
  const [liquidity, setLiquidity] = useState<string>('');
  const [listingRate, setListingRate] = useState<string>('');
  const [liquidityLockup, setLiquidityLockup] = useState<string>('');
  const [website, setWebsite] = useState<string>('');
  const [logoUrl, setLogoUrl] = useState<string>('');
  const [facebook, setFacebook] = useState<string>('');
  const [twitter, setTwitter] = useState<string>('');
  const [github, setGithub] = useState<string>('');
  const [telegram, setTelegram] = useState<string>('');
  const [instagram, setInstagram] = useState<string>('');
  const [discord, setDiscord] = useState<string>('');
  const [reddit, setReddit] = useState<string>('');
  const [youtube, setYoutube] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  // Update feeOption when currency changes
  useEffect(() => {
    setFeeOption(`3.5% ${currency}`);
  }, [currency]);

  // Add these validation functions near the top of the component
  const validateStep1 = () => {
    return (
      validateTokenAddress(tokenAddress) &&
      currency !== '' &&
      feeOption !== '' &&
      listingOption !== '' &&
      affiliateProgram !== ''
    );
  };

  const validateStep2 = () => {
    const validations = {
      presaleRate: validatePresaleRate(presaleRate),
      whitelist: whitelist !== '',
      softCap: validateSoftCap(softCap),
      hardCap: validateHardCapVsSoftCap(hardCap, softCap),
      minBuy: minBuy.trim() !== '',
      maxBuy: maxBuy.trim() !== '',
      liquidity: validateLiquidity(liquidity),
      listingRate: validateListingRate(listingRate, presaleRate),
      dates: startDate !== null && endDate !== null,
      timeRange: validateTimeRange(startDate, endDate),
      liquidityLockup: validateLockupTime(liquidityLockup),
      refundType: refundType !== '',
      router: dexRouter !== ''
    };

    // Log which validations are failing
    console.log('Validation results:', validations);

    return (
      validations.presaleRate &&
      validations.whitelist &&
      validations.softCap &&
      validations.hardCap &&
      validations.minBuy &&
      validations.maxBuy &&
      validations.liquidity &&
      validations.listingRate &&
      validations.dates &&
      validations.timeRange &&
      validations.liquidityLockup &&
      validations.refundType &&
      validations.router
    );
  };

  const renderStep1 = () => (
    <>
      <StepHeader>
        <StepTitle>{t('Approve Token')}</StepTitle>
        <StepDescription>{t('Enter the token address and approve')}</StepDescription>
      </StepHeader>

      <Flex flexDirection="column" alignItems="center" width="100%">
        <Box width="100%" maxWidth={CONTENT_WIDTH}>
          <Text fontSize="12px" color="warning" mb="16px">(*) {t('is required field.')}</Text>

          <InputWrapper>
            <InputLabel>{t('Token Address*')}</InputLabel>
            <Box position="relative">
              <CustomInput
                placeholder="0x..."
                value={tokenAddress}
                className="token-address-input"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTokenAddress(e.target.value)}
                style={{
                  borderColor: tokenAddress && !validateTokenAddress(tokenAddress) 
                    ? theme.colors.failure 
                    : undefined
                }}
              />
              <CreateTokenButton
                scale="sm"
                onClick={() => router.push("/launch/create-token")}
              >
                {t('Create Token')}
              </CreateTokenButton>
            </Box>
            {tokenAddress && !validateTokenAddress(tokenAddress) && (
              <Text fontSize="12px" color="failure" mt="8px">
                {t('Please enter a valid token address (0x... format)')}
              </Text>
            )}
          </InputWrapper>

          <Text fontSize="14px" color="primary" mb="16px">{t('Pool Creation fee: 1 BNB')}</Text>

          <InputWrapper>
            <InputLabel>{t('Currency*')}</InputLabel>
            <StyledFlex flexDirection="column" gap="8px">
              {['BNB', 'USDT', 'USDC', 'DAI', 'FLOKI'].map((option) => (
                <Flex key={option} alignItems="center">
                  <Radio
                    scale="sm"
                    checked={currency === option}
                    onChange={() => setCurrency(option)}
                  />
                  <Text color="text" ml="8px">{option}</Text>
                </Flex>
              ))}
            </StyledFlex>
            <Text fontSize="12px" color="primary" mt="8px">
              {t(`Users will pay with ${currency} for your token`)}
            </Text>
          </InputWrapper>

          <InputWrapper>
            <InputLabel>{t('Fee options*')}</InputLabel>
            <StyledFlex flexDirection="column" gap="8px">
              <Flex alignItems="center">
                <Radio
                  scale="sm"
                  checked={feeOption === `3.5% ${currency}`}
                  onChange={() => setFeeOption(`3.5% ${currency}`)}
                />
                <Text color="text" ml="8px">
                  3.5% {currency} raised only <Text as="span" color="primary">(Recommended)</Text>
                </Text>
              </Flex>
              <Flex alignItems="center">
                <Radio
                  scale="sm"
                  checked={feeOption === `1.5% ${currency} + 1.5% token`}
                  onChange={() => setFeeOption(`1.5% ${currency} + 1.5% token`)}
                />
                <Text color="text" ml="8px">
                  1.5% {currency} raised + 1.5% token sold
                </Text>
              </Flex>
            </StyledFlex>
          </InputWrapper>

          <InputWrapper>
            <InputLabel>{t('Listing Options*')}</InputLabel>
            <Flex alignItems="center">
              <Radio
                scale="sm"
                checked={listingOption === 'Auto Listing'}
                onChange={() => setListingOption('Auto Listing')}
              />
              <Text color="text" ml="8px">Auto Listing</Text>
            </Flex>
          </InputWrapper>

          <InputWrapper>
            <InputLabel>{t('Affiliate Program*')}</InputLabel>
            <StyledFlex flexDirection="column" gap="8px">
              {['Disable', 'Enable'].map((option) => (
                <Flex key={option} alignItems="center">
                  <Radio
                    scale="sm"
                    checked={affiliateProgram === option}
                    onChange={() => setAffiliateProgram(option)}
                  />
                  <Text color="text" ml="8px">{option} Affiliate</Text>
                </Flex>
              ))}
            </StyledFlex>
          </InputWrapper>

          <StyledWarning mb="24px">
            <Text color="warning">
              {t('Auto listing, after you finalize the pool your token will be auto listed on DEX.')}
            </Text>
          </StyledWarning>

          {renderValidationMessage(1)}
          <ButtonContainer>
            <StyledButton
              onClick={() => setStep(2)}
              disabled={!validateStep1()}
            >
              {t('Next')}
            </StyledButton>
          </ButtonContainer>
        </Box>
      </Flex>
    </>
  );

  const ValidationText = styled(Text) <{ isError: boolean | null }>`
  color: ${({ isError, theme }) => {
      if (isError === null) return theme.colors.textSubtle; // Default color for empty state
      return isError ? theme.colors.failure : theme.colors.textSubtle; // Red for error, normal for valid
    }};
`;

  // Add validation functions
  const validatePresaleRate = (value: string): boolean | null => {
    if (!value || value.trim() === '') return null; // Return null for empty/blank values
    const num = parseFloat(value);
    return !isNaN(num) && num > 0;
  };

  const validateSoftCap = (value: string): boolean | null => {
    if (!value || value.trim() === '') return null; // Return null for empty/blank values
    const num = parseFloat(value);
    return !isNaN(num) && num > 0;
  };

  const validateHardCapVsSoftCap = (hardCapValue: string, softCapValue: string): boolean | null => {
    if (!hardCapValue || hardCapValue.trim() === '') return null;
    if (!softCapValue || softCapValue.trim() === '') return null;

    const hardNum = parseFloat(hardCapValue);
    const softNum = parseFloat(softCapValue);

    if (Number.isNaN(hardNum) || Number.isNaN(softNum)) return false;
    return hardNum >= softNum && hardNum > 0;
  };

  const validateLiquidity = (value: string): boolean => {
    const num = parseFloat(value);
    return !isNaN(num) && num > 50;
  };

  const validateListingRate = (listingRate: string, presaleRate: string): boolean => {
    const listingNum = parseFloat(listingRate);
    const presaleNum = parseFloat(presaleRate);
    return !isNaN(listingNum) && !isNaN(presaleNum) && listingNum < presaleNum;
  };

  const validateTimeRange = (startDate: Date | null, endDate: Date | null): boolean => {
    if (!startDate || !endDate) return true;
    const diffInMinutes = (endDate.getTime() - startDate.getTime()) / (1000 * 60);
    return diffInMinutes > 0 && diffInMinutes <= 14400;
  };

  const validateLockupTime = (value: string): boolean => {
    const num = parseFloat(value);
    return !isNaN(num) && num >= 30;
  };

  // Add these options near the top of your component
  const REFUND_OPTIONS = [
    { label: "Burn", value: "burn" },
    { label: "Refund", value: "refund" }
  ];

  const ROUTER_OPTIONS = [
    { label: "Pancakeswap", value: "pancakeswap" },
    { label: "Uniswap", value: "uniswap" },
    { label: "Sushiswap", value: "sushiswap" }
  ];

  const [refundType, setRefundType] = useState<string>('burn');
  const [dexRouter, setDexRouter] = useState<string>('pancakeswap');

  // Define select styles if needed
  const selectStyles = {
    control: (provided: any) => ({
      ...provided,
      background: 'rgb(244, 240, 248)',
      borderRadius: '16px',
      border: '1px solid rgb(238, 234, 244)',
      minHeight: '48px',
      width: '100%'
    }),
    menu: (provided: any) => ({
      ...provided,
      background: 'rgb(244, 240, 248)',
      borderRadius: '16px',
      border: '1px solid rgb(238, 234, 244)',
    })
  };

  const renderStep2 = () => (
    <>
      <StepHeader>
        <StepTitle>{t('Presale Information')}</StepTitle>
        <StepDescription>{t('Configure your presale parameters')}</StepDescription>
      </StepHeader>

      <Flex flexDirection="column" alignItems="center" width="100%">
        <Box width="100%" maxWidth={CONTENT_WIDTH}>
          <Text fontSize="12px" color="warning" mb="16px">(*) {t('is required field.')}</Text>

          <InputWrapper>
            <InputLabel>{t('Presale rate*')}</InputLabel>
            <CustomInput
              type="number"
              placeholder="0"
              value={presaleRate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPresaleRate(e.target.value)}
            />
            <ValidationText
              fontSize="12px"
              mt="8px"
              isError={!validatePresaleRate(presaleRate)}
            >
              {t(`If I spend 1 ${currency} how many tokens will I receive?`)}
            </ValidationText>
          </InputWrapper>

          <InputWrapper>
            <InputLabel>{t('Whitelist*')}</InputLabel>
            <StyledFlex flexDirection="column" gap="8px">
              {['Disable', 'Enable'].map((option) => (
                <Flex key={option} alignItems="center">
                  <Radio
                    scale="sm"
                    checked={whitelist === option}
                    onChange={() => setWhitelist(option)}
                  />
                  <Text color="text" ml="8px">{option}</Text>
                </Flex>
              ))}
            </StyledFlex>
            <Text fontSize="12px" color="textSubtle" mt="8px">
              {t('You can enable/disable whitelist anytime (If you activate the whitelist our members who use the floki whitelist function can access your whitelist)')}
            </Text>
          </InputWrapper>

          <StyledFlex gap="16px">
            <InputWrapper>
              <InputLabel>{t(`SoftCap (${currency})*`)}</InputLabel>
              <CustomInput
                placeholder="0"
                type="number"
                value={softCap}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSoftCap(e.target.value)}
              />
              <ValidationText
                fontSize="12px"
                mt="8px"
                isError={!validateSoftCap(softCap)}
              >
                {t('Softcap must be a positive number')}
              </ValidationText>
            </InputWrapper>
            <InputWrapper>
              <InputLabel>{t(`HardCap (${currency})*`)}</InputLabel>
              <CustomInput
                placeholder="0"
                type="number"
                value={hardCap}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHardCap(e.target.value)}
              />
              <ValidationText
                fontSize="12px"
                mt="8px"
                isError={!validateHardCapVsSoftCap(hardCap, softCap)}
              >
                {t('Hardcap must be greater than or equal to Softcap')}
              </ValidationText>
            </InputWrapper>
          </StyledFlex>


          <StyledFlex gap="16px">
            <InputWrapper>
              <InputLabel>{t(`Minimum buy (${currency})*`)}</InputLabel>
              <CustomInput
                placeholder="0"
                value={minBuy}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMinBuy(e.target.value)}
              />
              <Text fontSize="12px" color="textSubtle" mt="8px">
                {t('Minimum buy must be positive number')}
              </Text>
            </InputWrapper>
            <InputWrapper>
              <InputLabel>{t(`Maximum buy (${currency})*`)}</InputLabel>
              <CustomInput
                placeholder="0"
                value={maxBuy}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMaxBuy(e.target.value)}
              />
              <Text fontSize="12px" color="textSubtle" mt="8px">
                {t('Maximum buy must be positive number')}
              </Text>
            </InputWrapper>
          </StyledFlex>

          {/* <StyledFlex gap="16px" style={{ width: '100%' }}>
            <InputWrapper style={{ flex: 1 }}>
              <InputLabel>{t('Refund type*')}</InputLabel>
              <ReactSelect
                options={REFUND_OPTIONS}
                value={REFUND_OPTIONS.find(option => option.value === refundType)}
                onChange={(option) => setRefundType(option?.value || '')}
                placeholder={t('Select Refund Type')}
                styles={selectStyles}
                isSearchable={false}
              />
            </InputWrapper>
            <InputWrapper style={{ flex: 1 }}>
              <InputLabel>{t('Router*')}</InputLabel>
              <ReactSelect
                options={ROUTER_OPTIONS}
                value={ROUTER_OPTIONS.find(option => option.value === dexRouter)}
                onChange={(option) => setDexRouter(option?.value || '')}
                placeholder={t('Select Router')}
                styles={selectStyles}
                isSearchable={false}
              />
            </InputWrapper>
          </StyledFlex> */}

          <StyledFlex gap="16px">
            <InputWrapper>
              <InputLabel>{t('Liquidity (%)*')}</InputLabel>
              <CustomInput
                placeholder="0"
                value={liquidity}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLiquidity(e.target.value)}
              />
              <Text fontSize="12px" color="textSubtle" mt="8px">
                {t('Liquidity must be greater than 50%')}
              </Text>
            </InputWrapper>
            <InputWrapper>
              <InputLabel>{t('Listing rate*')}</InputLabel>
              <CustomInput
                placeholder="0"
                value={listingRate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setListingRate(e.target.value)}
              />
              <Text fontSize="12px" color="textSubtle" mt="8px">
                {t(`1 ${currency} = 0 BNB`)}
              </Text>
            </InputWrapper>
          </StyledFlex>

          <InputLabel mt="24px">{t('Select start time & end time (UTC)*')}</InputLabel>
          <StyledFlex gap="16px">
            <InputWrapper>
              <InputLabel>{t('Start time (UTC)')}</InputLabel>
              <DatePickerWrapper>
                <StyledDatePicker
                  selected={startDate}
                  onChange={(date: Date) => setStartDate(date)}
                  showTimeSelect
                  dateFormat="MM/d/yyyy h:mm aa"
                  placeholderText="Select date and time"
                />
              </DatePickerWrapper>
            </InputWrapper>
            <InputWrapper>
              <InputLabel>{t('End time (UTC)')}</InputLabel>
              <DatePickerWrapper>
                <StyledDatePicker
                  selected={endDate}
                  onChange={(date: Date) => setEndDate(date)}
                  showTimeSelect
                  dateFormat="MM/d/yyyy h:mm aa"
                  placeholderText="Select date and time"
                />
              </DatePickerWrapper>
            </InputWrapper>
          </StyledFlex>

          <InputWrapper>
            <Text fontSize="12px" color="textSubtle" mb="24px">
              {t('The duration between start time and end time must be less than 14400 minutes')}
            </Text>
          </InputWrapper>

          <InputWrapper>
            <InputLabel>{t('Liquidity lockup (days)*')}</InputLabel>
            <CustomInput
              placeholder="0"
              value={liquidityLockup}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLiquidityLockup(e.target.value)}
            />
            <Text fontSize="12px" color="textSubtle" mt="8px">
              {t('Liquidity lockup time must be greater than or equal to 30')}
            </Text>
          </InputWrapper>

          <Text fontSize="14px" color="primary" textAlign="right" mb="24px">
            {t('Need 0 FLASH to create presale.')}
          </Text>

          {renderValidationMessage(2)}
          <ButtonContainer>
            <StyledButton 
              variant="secondary" 
              onClick={() => setStep(1)}
            >
              {t('Previous')}
            </StyledButton>
            <StyledButton 
              onClick={() => setStep(3)}
              disabled={!validateStep2()}
            >
              {t('Next')}
            </StyledButton>
            <div style={{ fontSize: '12px', color: 'red' }}>
              {!validateStep2() && 'Please fill all required fields correctly'}
            </div>
          </ButtonContainer>
        </Box>
      </Flex>
    </>
  );
  const renderStep3 = () => (
    <>
      <StepHeader>
        <StepTitle>{t('Project Information')}</StepTitle>
        <StepDescription>{t('Add project details and links')}</StepDescription>
      </StepHeader>
      <Flex flexDirection="column" alignItems="center" width="100%">
        <Box width="100%" maxWidth={CONTENT_WIDTH}>
          <Text fontSize="12px" color="warning" mb="16px">(*) {t('is required field.')}</Text>

          <InputWrapper>
            <InputLabel>{t('Logo URL*')}</InputLabel>
            <CustomInput
              required
              placeholder="Ex: https://..."
              value={logoUrl}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLogoUrl(e.target.value)}
            />
            <Text fontSize="12px" color="textSubtle" mt="8px">
              {t('URL must end with a supported image extension png, jpg, jpeg or gif. You can upload your image at')}
              <br />
              <Text as="span" color="primary">https://upload</Text>
            </Text>
          </InputWrapper>

          <InputWrapper>
            <InputLabel>{t('Website')}</InputLabel>
            <CustomInput
              required
              placeholder="Ex: https://..."
              value={website}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWebsite(e.target.value)}
            />
          </InputWrapper>

          <InputWrapper>
            <InputLabel>{t('Twitter')}</InputLabel>
            <CustomInput
              placeholder="Ex: https://twitter.com/..."
              value={twitter}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTwitter(e.target.value)}
            />
          </InputWrapper>

          <InputWrapper>
            <InputLabel>{t('Telegram')}</InputLabel>
            <CustomInput
              placeholder="Ex: https://t.me/..."
              value={telegram}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTelegram(e.target.value)}
            />
          </InputWrapper>

          <InputWrapper>
            <InputLabel>{t('Discord')}</InputLabel>
            <CustomInput
              placeholder="Ex: https://discord.com/..."
              value={discord}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDiscord(e.target.value)}
            />
          </InputWrapper>

          <InputWrapper>
            <InputLabel>{t('Github')}</InputLabel>
            <CustomInput
              placeholder="Ex: https://github.com/..."
              value={github}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGithub(e.target.value)}
            />
          </InputWrapper>

          <InputWrapper>
            <InputLabel>{t('Facebook')}</InputLabel>
            <CustomInput
              placeholder="Ex: https://facebook.com/..."
              value={facebook}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFacebook(e.target.value)}
            />
          </InputWrapper>

          <InputWrapper>
            <InputLabel>{t('Instagram')}</InputLabel>
            <CustomInput
              placeholder="Ex: https://instagram.com/..."
              value={instagram}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInstagram(e.target.value)}
            />
          </InputWrapper>

          <InputWrapper>
            <InputLabel>{t('Reddit')}</InputLabel>
            <CustomInput
              placeholder="Ex: https://reddit.com/..."
              value={reddit}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setReddit(e.target.value)}
            />
          </InputWrapper>

          <InputWrapper>
            <InputLabel>{t('Youtube Video')}</InputLabel>
            <CustomInput
              placeholder="Ex: https://youtube.com/watch?v="
              value={youtube}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setYoutube(e.target.value)}
            />
            <Text fontSize="12px" color="textSubtle" mt="8px">
              {t('Input your youtube URL, or youtube video ID.')}
            </Text>
          </InputWrapper>

          <InputWrapper>
            <InputLabel>{t('Description*')}</InputLabel>
            <StyledTextArea
              placeholder={t('Ex: This project is...')}
              value={description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
            />
          </InputWrapper>

          <ButtonContainer>
            <StyledButton variant="secondary" onClick={() => setStep(2)}>
              {t('Previous')}
            </StyledButton>
            <StyledButton onClick={() => setStep(4)}>
              {t('Next')}
            </StyledButton>
          </ButtonContainer>
        </Box>
      </Flex>
    </>
  );

  const renderStep4 = () => (
    <>
      <StepHeader>
        <StepTitle>{t('Review')}</StepTitle>
        <StepDescription>{t('Review your presale details')}</StepDescription>
      </StepHeader>
      <Flex flexDirection="column" alignItems="center" width="100%">
        <Box width="100%" maxWidth={CONTENT_WIDTH}>
          <Card background={theme.colors.background} p="16px" mb="24px">
            {[
              { label: 'Token Address', value: tokenAddress },
              { label: 'Currency', value: currency },
              { label: 'Fee Option', value: feeOption },
              { label: 'Listing Option', value: listingOption },
              { label: 'Affiliate Program', value: affiliateProgram },
              { label: 'Presale rate', value: presaleRate },
              { label: 'Sale method', value: whitelist === 'Enable' ? 'Whitelist' : 'Public' },
              { label: 'Softcap', value: `${softCap} ${currency}` },
              { label: 'Hardcap', value: `${hardCap} ${currency}` },
              { label: 'Minimum buy', value: `${minBuy} ${currency}` },
              { label: 'Maximum buy', value: `${maxBuy} ${currency}` },
              { label: 'Liquidity', value: `${liquidity}%` },
              { label: 'Listing rate', value: `1 ${currency} = ${listingRate} FLASH` },
              { label: 'Start time', value: startDate ? startDate.toUTCString() : 'Not set' },
              { label: 'End time', value: endDate ? endDate.toUTCString() : 'Not set' },
              { label: 'Liquidity lockup time', value: `${liquidityLockup} days` },
              { label: 'Logo URL', value: logoUrl },
              { label: 'Website', value: website, highlight: true },
              { label: 'Facebook', value: facebook },
              { label: 'Twitter', value: twitter },
              { label: 'Github', value: github },
              { label: 'Telegram', value: telegram },
              { label: 'Instagram', value: instagram },
              { label: 'Discord', value: discord },
              { label: 'Reddit', value: reddit },
              { label: 'Youtube', value: youtube },
              { label: 'Description', value: description },
            ].map((item, index) => (
              <Flex key={item.label} justifyContent="space-between" alignItems="center" mb="8px">
                <Text fontSize="14px" color="textSubtle">{item.label}</Text>
                <Text fontSize="14px" color={item.highlight ? 'primary' : 'text'} bold={item.highlight}>{item.value}</Text>
              </Flex>
            ))}
          </Card>

          <StyledWarning mb="16px">
            <Flex alignItems="center">
              <img src={WarningIcon} alt="Warning" width="24" height="24" style={{ marginRight: '8px' }} />
              <Text fontSize="14px" color="warning">
                {t('Please exclude Flash Factory address 0x7461B2F388142a7584ac752e637B255Eead9bcPL from fees, rewards, max tx amount to start creating pools')}
              </Text>
            </Flex>
          </StyledWarning>

          <StyledWarning mb="24px">
            <Text fontSize="12px" color="text">
              {t('For tokens with burns, rebase or other special transfers please ensure that you have a way to whitelist multiple addresses or turn off the special transfer events (By setting fees to 0 for example for the duration of the presale)')}
            </Text>
          </StyledWarning>

          <ButtonContainer>
            <StyledButton variant="secondary" onClick={() => setStep(3)}>
              {t('Previous')}
            </StyledButton>
            <StyledButton onClick={handleSubmit}>
              {t('Submit')}
            </StyledButton>
          </ButtonContainer>
        </Box>
      </Flex>
    </>
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {toastError, toastSuccess} = useToast()
  const [isApproving, setIsApproving] = useState(false);

  const handleSubmit = async () => {
    try {
      if (!window.ethereum) {
        toastError('Error', 'Please install MetaMask!');
        return;
      }

      // Input validation
      if (!tokenAddress || !ethers.utils.isAddress(tokenAddress)) {
        toastError('Error', 'Invalid token address');
        return;
      }

      if (parseFloat(softCap) >= parseFloat(hardCap)) {
        toastError('Error', 'Soft cap must be less than hard cap');
        return;
      }

      if (parseFloat(minBuy) >= parseFloat(maxBuy)) {
        toastError('Error', 'Min buy must be less than max buy');
        return;
      }

      if (startDate >= endDate) {
        toastError('Error', 'Start time must be before end time');
        return;
      }

      setIsSubmitting(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum as any);
      const signer = await provider.getSigner();
      console.log('Got signer');

      // Handle token approval first
      try {
        setIsApproving(true);
        console.log('Starting token approval process');

        const tokenContract = new ethers.Contract(
          tokenAddress,
          [
            "function approve(address spender, uint256 amount) external returns (bool)",
            "function allowance(address owner, address spender) external view returns (uint256)",
            "function totalSupply() external view returns (uint256)"
          ],
          signer
        );

        const address = await signer.getAddress();
        const allowance = await tokenContract.allowance(address, CONTRACT_ADDRESS);
        const totalSupply = await tokenContract.totalSupply();
        console.log('Current allowance:', allowance.toString());
        console.log('Total supply:', totalSupply.toString());

        if (allowance.lt(totalSupply)) {
          console.log('Approving tokens...');
          const approveTx = await tokenContract.approve(
            CONTRACT_ADDRESS,
            ethers.constants.MaxUint256,
            { gasLimit: 100000 }
          );
          console.log('Approval transaction hash:', approveTx.hash);

          const approveReceipt = await approveTx.wait();
          console.log('Approval confirmed:', approveReceipt);
          
          if (approveReceipt.status === 0) {
            throw new Error('Approval transaction failed');
          }
          
          toastSuccess('Success', 'Token approval confirmed!');
        } else {
          console.log('Token already approved');
        }
      } catch (approvalError) {
        console.error('Approval error:', approvalError);
        toastError('Error', 'Failed to approve token');
        setIsSubmitting(false);
        setIsApproving(false);
        return;
      }
      setIsApproving(false);

      // Create presale
      console.log('Creating presale contract instance');
      const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

      // Convert values to proper format
      const rates = [
        presaleRate,
        listingRate
      ];

      const raises = [
        parseEther(minBuy),
        parseEther(maxBuy)
      ];

      const softCapWei = parseEther(softCap);
      const hardCapWei = parseEther(hardCap);
      const liquidityPercentage = liquidity;
      const startTimeUnix = Math.floor(startDate.getTime());
      const endTimeUnix = Math.floor(endDate.getTime() );

      const params = {
        tokenAddress,
        baseToken: currency === 'BNB' ? ethers.constants.AddressZero : currency,
        rates: rates,
        raises: raises,
        softCap: softCapWei,
        hardCap: hardCapWei,
        liquidityPercentage,
        startTime: startTimeUnix,
        endTime: endTimeUnix
      };
      console.log('Creating presale with params:', params);

      // Estimate gas
      try {
        const gasEstimate = await contract.estimateGas.create(
          tokenAddress,
          currency === 'BNB' ? ethers.constants.AddressZero : currency,
          rates,
          raises,
          softCapWei,
          hardCapWei,
          liquidityPercentage,
          startTimeUnix,
          endTimeUnix,
          {
            value: parseEther('0.01')
          }
        );
        console.log('Estimated gas:', gasEstimate.toString());

        // Add 20% buffer to gas estimate
        const gasLimit = gasEstimate.mul(120).div(100);

        const tx = await contract.create(
          tokenAddress,
          currency === 'BNB' ? ethers.constants.AddressZero : currency,
          rates,
          raises,
          softCapWei,
          hardCapWei,
          liquidityPercentage,
          startTimeUnix,
          endTimeUnix,
          {
            value: ethers.utils.parseEther('0.01'),
            gasLimit
          }
        );

        console.log('Transaction sent:', tx.hash);
        
        const receipt = await tx.wait();
        console.log('Transaction confirmed:', receipt);

        if (receipt.status === 1) {
          toastSuccess(
            'Success',
            'Your presale has been created successfully!'
          );
          window.location.href = '/launch/launchpad';
        } else {
          throw new Error('Transaction failed');
        }

      } catch (error) {
        console.error('Transaction error:', error);
        toastError(
          'Error',
          error instanceof Error ? error.message : 'Failed to create presale'
        );
      }

    } catch (error) {
      console.error('Full error object:', error);
      toastError(
        'Error',
        error instanceof Error ? error.message : 'Failed to create presale'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      default:
        return null;
    }
  };

  // Optional: Add a helper text to show validation status
  const ValidationHelper = styled(Text)`
    text-align: center;
    margin-top: 8px;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.failure};
  `;

  // Add this before the ButtonContainer in both steps
  const renderValidationMessage = (stepNumber: number) => {
    if (stepNumber === 1 && !validateStep1()) {
      return (
        <ValidationHelper>
          {t('Please fill in all required fields to proceed')}
        </ValidationHelper>
      );
    }
    if (stepNumber === 2 && !validateStep2()) {
      return (
        <ValidationHelper>
          {t('Please ensure all fields are valid and filled correctly')}
        </ValidationHelper>
      );
    }
    return null;
  };

  // Add this validation function near your other validation functions
  const validateTokenAddress = (address: string): boolean => {
    // Check if address starts with 0x
    if (!address.startsWith('0x')) return false;
    
    // Check if address is the correct length (42 characters = 0x + 40 hex chars)
    if (address.length !== 42) return false;
    
    // Check if address contains only valid hex characters after 0x
    const hexRegex = /^0x[0-9a-fA-F]{40}$/;
    if (!hexRegex.test(address)) return false;
    
    return true;
  };

  return (
    <LaunchpadPage>
      <Heading as="h1" scale="xl" mb="24px" color="secondary" textAlign="center">
        {t('Create Presale')}
      </Heading>
      <StepIndicator currentStep={step} />
      <Box width="100%" mb="24px" style={{ display: 'flex', justifyContent: 'center' }}>
        <StyledButton
          onClick={onBack}
          scale="md"
        >
          {t('Back to Presales')}
        </StyledButton>
      </Box>
      <StyledCard>
        {renderStepContent()}
      </StyledCard>
    </LaunchpadPage>
  );
};

export default CreatePresale;