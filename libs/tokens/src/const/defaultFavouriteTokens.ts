import { SupportedChainId } from 'ccip-sdk'
import { TokensMap } from '../types'
import {
  COW,
  DAI,
  DAI_GOERLI,
  EURE_GNOSIS_CHAIN,
  TokenWithLogo,
  USDC_GNOSIS_CHAIN,
  USDC_GOERLI,
  USDC_MAINNET,
  USDT,
  WBTC,
  WBTC_GNOSIS_CHAIN,
  WETH_GNOSIS_CHAIN,
  WRAPPED_NATIVE_CURRENCY,
  USDC_FUJI,
  WAVAX_FUJI,
  WMATIC_MUMBAI,
  WETH_GOERLI
} from '@cowprotocol/common-const'

const tokensListToMap = (list: TokenWithLogo[]) =>
  list.reduce<TokensMap>((acc, token) => {
    acc[token.address.toLowerCase()] = {
      chainId: token.chainId,
      address: token.address,
      name: token.name || '',
      decimals: token.decimals,
      symbol: token.symbol || '',
      logoURI: token.logoURI,
    }
    return acc
  }, {})

export const DEFAULT_FAVOURITE_TOKENS: Record<SupportedChainId, TokensMap> = {
  [SupportedChainId.MAINNET]: tokensListToMap([
    DAI,
    COW[SupportedChainId.MAINNET],
    USDC_MAINNET,
    USDT,
    WBTC,
    WRAPPED_NATIVE_CURRENCY[SupportedChainId.MAINNET],
  ]),
  [SupportedChainId.GNOSIS_CHAIN]: tokensListToMap([
    USDC_GNOSIS_CHAIN,
    COW[SupportedChainId.GNOSIS_CHAIN],
    EURE_GNOSIS_CHAIN,
    WRAPPED_NATIVE_CURRENCY[SupportedChainId.GNOSIS_CHAIN],
    WETH_GNOSIS_CHAIN,
    WBTC_GNOSIS_CHAIN,
  ]),
  [SupportedChainId.GOERLI]: tokensListToMap([
    WRAPPED_NATIVE_CURRENCY[SupportedChainId.GOERLI],
    COW[SupportedChainId.GOERLI],
    WETH_GOERLI,
    USDC_GOERLI,
  ]),
  [SupportedChainId.FUJI]: tokensListToMap([
    WRAPPED_NATIVE_CURRENCY[SupportedChainId.FUJI],
    COW[SupportedChainId.FUJI],
    WAVAX_FUJI,
    USDC_FUJI,
  ]),
  [SupportedChainId.MUMBAI]: tokensListToMap([
    WRAPPED_NATIVE_CURRENCY[SupportedChainId.MUMBAI],
    COW[SupportedChainId.MUMBAI],
    WETH_GOERLI,
    USDC_GOERLI,
  ]),
  [SupportedChainId.POLYZK_TESTNET]: tokensListToMap([
    WRAPPED_NATIVE_CURRENCY[SupportedChainId.POLYZK_TESTNET],
    COW[SupportedChainId.POLYZK_TESTNET],
    WETH_GOERLI,
    USDC_GOERLI,
  ]),
}
