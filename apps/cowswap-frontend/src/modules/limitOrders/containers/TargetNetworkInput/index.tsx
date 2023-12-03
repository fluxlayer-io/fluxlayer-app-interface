import { useSetAtom } from 'jotai'
import { useAtomValue } from 'jotai'
import { useCallback, useMemo, useRef } from 'react'

import { TargetNetworkSelector } from 'modules/limitOrders/pure/TargetNetworkSelector'
import { TargetNetwork, targetNetworks } from 'modules/limitOrders/pure/TargetNetworkSelector/deadlines'
import {
  limitOrdersSettingsAtom,
  updateLimitOrdersSettingsAtom,
} from 'modules/limitOrders/state/limitOrdersSettingsAtom'

export function TargetNetworkInput() {
  const { targetNetworkNumber } = useAtomValue(limitOrdersSettingsAtom)
  const updateSettingsState = useSetAtom(updateLimitOrdersSettingsAtom)
  const currentDeadlineNode = useRef<HTMLButtonElement>()
  const existingDeadline = useMemo(() => {
    return targetNetworks.find((item) => item.value === targetNetworkNumber)
  }, [targetNetworkNumber])

  const selectDeadline = useCallback(
    (deadline: TargetNetwork) => {
      updateSettingsState({ targetNetworkNumber: deadline.value})
      currentDeadlineNode.current?.click() // Close dropdown
    },
    [updateSettingsState]
  )

  // const selectCustomDeadline = useCallback(
  //   (customDeadline: number | null) => {
  //     updateSettingsState({ customDeadlineTimestamp: customDeadline })
  //   },
  //   [updateSettingsState]
  // )

  return (
    <TargetNetworkSelector
      deadline={existingDeadline}
      // customDeadline={customDeadlineTimestamp}
      selectDeadline={selectDeadline}
      // selectCustomDeadline={selectCustomDeadline}
    />
  )
}
