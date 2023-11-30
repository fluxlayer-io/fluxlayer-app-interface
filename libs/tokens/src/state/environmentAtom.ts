import { atom } from 'jotai'
import { SupportedChainId } from 'ccip-sdk'
import { getCurrentChainIdFromUrl } from '@cowprotocol/common-utils'

export const environmentAtom = atom<{ chainId: SupportedChainId }>({
  chainId: getCurrentChainIdFromUrl(),
})
