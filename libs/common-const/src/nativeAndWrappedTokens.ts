import { SupportedChainId, SupportedChainId as ChainId } from 'ccip-sdk'
import { TokenWithLogo } from './types'
import { WETH9 } from '@uniswap/sdk-core'
import { cowprotocolTokenLogoUrl } from './cowprotocolTokenLogoUrl'

// See https://github.com/cowprotocol/contracts/commit/821b5a8da213297b0f7f1d8b17c893c5627020af#diff-12bbbe13cd5cf42d639e34a39d8795021ba40d3ee1e1a8282df652eb161a11d6R13
export const NATIVE_CURRENCY_BUY_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'

// MAINNET
const weth9Mainnet = WETH9[SupportedChainId.MAINNET]
export const WETH_MAINNET = new TokenWithLogo(
  cowprotocolTokenLogoUrl(weth9Mainnet.address.toLowerCase(), SupportedChainId.MAINNET),
  weth9Mainnet.chainId,
  weth9Mainnet.address,
  weth9Mainnet.decimals,
  weth9Mainnet.symbol,
  weth9Mainnet.name
)
// xDAI tokens
export const WXDAI = new TokenWithLogo(
  undefined,
  ChainId.GNOSIS_CHAIN,
  '0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d',
  18,
  'WXDAI',
  'Wrapped XDAI'
)
export const WETH_GOERLI = new TokenWithLogo(
  WETH_MAINNET.logoURI,
  ChainId.GOERLI,
  '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
  18,
  'WETH',
  'Wrapped Görli Ether'
)
export const WAVAX_FUJI = new TokenWithLogo(
  undefined,
  ChainId.FUJI,
  '0xd00ae08403B9bbb9124bB305C09058E32C39A48c',
  18,
  'WAVAX',
  'Wrapped Avalanche'
)
export const WMATIC_MUMBAI = new TokenWithLogo(
  undefined,
  ChainId.MUMBAI,
  '0xd00ae08403B9bbb9124bB305C09058E32C39A48c',
  18,
  'WMATIC',
  'Wrapped Matic'
)
export const WETH_POLYZKTESTNET = new TokenWithLogo(
  WETH_MAINNET.logoURI,
  ChainId.POLYZK_TESTNET,
  '0x2ad78787CCaf7FA8FAe8953FD78ab9163f81DcC8',
  18,
  'WETH',
  'Wrapped Ether'
)
export const WETH_SEPOLIA = new TokenWithLogo(
  WETH_MAINNET.logoURI,
  ChainId.SEPOLIA,
  '0xb16F35c0Ae2912430DAc15764477E179D9B9EbEa',
  18,
  'WETH',
  'Wrapped Ether'
)
export const WETH_OP_TESTNET = new TokenWithLogo(
  WETH_MAINNET.logoURI,
  ChainId.OP_TESTNET,
  '0x74A4A85C611679B73F402B36c0F84A7D2CcdFDa3',
  18,
  'WETH',
  'Wrapped Ether'
)
export const WETH_HOLESKY = new TokenWithLogo(
  WETH_MAINNET.logoURI,
  ChainId.HOLESKY,
  '0xC36E19B16c276D10BE40c7b9D3c026E8f482f2aD',
  18,
  'WETH',
  'Wrapped Ether'
)
export const WRAPPED_NATIVE_CURRENCY: Record<SupportedChainId, TokenWithLogo> = {
  [SupportedChainId.MAINNET]: WETH_MAINNET,
  [SupportedChainId.GNOSIS_CHAIN]: WXDAI,
  [SupportedChainId.GOERLI]: WETH_GOERLI,
  [SupportedChainId.FUJI]: WAVAX_FUJI,
  [SupportedChainId.MUMBAI]: WMATIC_MUMBAI,
  [SupportedChainId.POLYZK_TESTNET]: WETH_POLYZKTESTNET,
  [SupportedChainId.SEPOLIA]: WETH_SEPOLIA,
  [SupportedChainId.OP_TESTNET]: WETH_OP_TESTNET,
  [SupportedChainId.HOLESKY]: WETH_HOLESKY,
}

export const NATIVE_CURRENCY_BUY_TOKEN: { [chainId in ChainId]: TokenWithLogo } = {
  [ChainId.MAINNET]: new TokenWithLogo(undefined, ChainId.MAINNET, NATIVE_CURRENCY_BUY_ADDRESS, 18, 'ETH', 'Ether'),
  [ChainId.GOERLI]: new TokenWithLogo(undefined, ChainId.GOERLI, NATIVE_CURRENCY_BUY_ADDRESS, 18, 'ETH', 'Ether'),
  [ChainId.GNOSIS_CHAIN]: new TokenWithLogo(
    undefined,
    ChainId.GNOSIS_CHAIN,
    NATIVE_CURRENCY_BUY_ADDRESS,
    18,
    'xDAI',
    'xDAI'
  ),
  [ChainId.MUMBAI]: WMATIC_MUMBAI,
  [ChainId.FUJI]: WAVAX_FUJI,
  [ChainId.POLYZK_TESTNET]: WETH_POLYZKTESTNET,
  [ChainId.SEPOLIA]: WETH_SEPOLIA,
  [ChainId.OP_TESTNET]: WETH_OP_TESTNET,
  [ChainId.HOLESKY]: WETH_HOLESKY,
}
