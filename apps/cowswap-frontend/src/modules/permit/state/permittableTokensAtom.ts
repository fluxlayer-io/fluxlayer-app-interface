import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

import { SupportedChainId } from 'ccip-sdk'

import { AddPermitTokenParams, PermittableTokens } from '../types'

/**
 * Atom that stores the permittable tokens info for each chain on localStorage.
 * It's meant to be shared across different tabs, thus no special storage handling.
 *
 * Contains either the permit info with `type` and `gasLimit` when supported or
 * `false` when not supported
 */
export const permittableTokensAtom = atomWithStorage<PermittableTokens>('permittableTokens:v1', {
  [SupportedChainId.MAINNET]: {},
  [SupportedChainId.GOERLI]: {},
  [SupportedChainId.GNOSIS_CHAIN]: {},
  [SupportedChainId.FUJI]: {},
  [SupportedChainId.MUMBAI]: {},
  [SupportedChainId.POLYZK_TESTNET]: {},
  [SupportedChainId.SEPOLIA]: {},
  [SupportedChainId.OP_TESTNET]: {},
  [SupportedChainId.HOLESKY]: {},
})

/**
 * Helper derived atom to add a permit info for a token for a given chain
 */
export const addPermitInfoForTokenAtom = atom(
  null,
  (get, set, { chainId, tokenAddress, permitInfo }: AddPermitTokenParams) => {
    const permittableTokens = { ...get(permittableTokensAtom) }

    permittableTokens[chainId][tokenAddress.toLowerCase()] = permitInfo

    set(permittableTokensAtom, permittableTokens)
  }
)
