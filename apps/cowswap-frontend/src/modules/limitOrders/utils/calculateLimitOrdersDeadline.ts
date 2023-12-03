import { calculateValidTo } from '@cowprotocol/common-utils'

import { Timestamp } from 'types'

import { LimitOrdersSettingsState } from 'modules/limitOrders/state/limitOrdersSettingsAtom'

export function calculateLimitOrdersDeadline(settingsState: LimitOrdersSettingsState): Timestamp {
  return settingsState.customDeadlineTimestamp
    ? settingsState.customDeadlineTimestamp
    : calculateValidTo(settingsState.deadlineMilliseconds / 1000)
}

export function getTargetNetworkNumber(settingsState: LimitOrdersSettingsState): number {
  return Number(settingsState.targetNetworkNumber)
}
