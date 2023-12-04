import { SupportedChainId } from 'ccip-sdk'
import { TokensMap } from '../types'
import {
  COW,
  DAI,
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
  LINK_FUJI,
  WETH_GOERLI,
  LINK_GOERLI,
  USDC_MUMBAI,
  LINK_MUMBAI,
  LINK_POLYZK_TESTNET
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
    USDC_GOERLI,
    LINK_GOERLI
  ]),
  [SupportedChainId.FUJI]: tokensListToMap([
    WRAPPED_NATIVE_CURRENCY[SupportedChainId.FUJI],
    COW[SupportedChainId.FUJI],
    USDC_FUJI,
    LINK_FUJI
  ]),
  [SupportedChainId.MUMBAI]: tokensListToMap([
    WRAPPED_NATIVE_CURRENCY[SupportedChainId.MUMBAI],
    COW[SupportedChainId.MUMBAI],
    LINK_MUMBAI,
    USDC_MUMBAI,
  ]),
  [SupportedChainId.POLYZK_TESTNET]: tokensListToMap([
    WRAPPED_NATIVE_CURRENCY[SupportedChainId.POLYZK_TESTNET],
    COW[SupportedChainId.POLYZK_TESTNET],
    LINK_POLYZK_TESTNET,
  ]),
}
