import React from 'react'
import fluxlayerLogo from 'assets/logo/fluxlayer-icon.svg'
import { isInjectedWidget } from '@cowprotocol/common-utils'

import * as styledEl from './styled'

export interface CurrencyArrowSeparatorProps {
  isLoading: boolean
  withRecipient: boolean
  hasSeparatorLine?: boolean
  isCollapsed?: boolean
  onSwitchTokens(): void
  border?: boolean
}

export function CurrencyArrowSeparator(props: CurrencyArrowSeparatorProps) {
  const { isLoading, onSwitchTokens, withRecipient, isCollapsed = true, hasSeparatorLine, border } = props
  const isInjectedWidgetMode = isInjectedWidget()

  return (
    <styledEl.Box withRecipient={withRecipient} isCollapsed={isCollapsed} hasSeparatorLine={hasSeparatorLine}>
      <styledEl.LoadingWrapper isLoading={isLoading} border={border}>
        {!isInjectedWidgetMode && isLoading ? (
          <styledEl.CowImg src={fluxlayerLogo} alt="loading" />
        ) : (
          <styledEl.ArrowDownIcon onClick={onSwitchTokens} />
        )}
      </styledEl.LoadingWrapper>
    </styledEl.Box>
  )
}
