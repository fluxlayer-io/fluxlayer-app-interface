import { ChangeEventHandler, useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { ButtonPrimary, ButtonSecondary } from '@cowprotocol/ui'

import { Trans } from '@lingui/macro'
import { Menu } from '@reach/menu-button'
import { ChevronDown } from 'react-feather'

import {
  calculateMinMax,
  formatDateToLocalTime,
  getInputStartDate,
  getTimeZoneOffset,
  limitDateString,
} from 'modules/limitOrders/pure/TargetNetworkSelector/utils'

import { CowModal as Modal } from 'common/pure/Modal'

import { TargetNetwork, targetNetworks } from './deadlines'
import * as styledEl from './styled'
import { Target } from '@use-gesture/react'

const CUSTOM_DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  year: '2-digit',
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
}

export interface TargetNetworkSelectorProps {
  deadline: TargetNetwork | undefined
  // customDeadline: number | null
  selectDeadline(deadline: TargetNetwork): void
  // selectCustomDeadline(deadline: number | null): void
}

export function TargetNetworkSelector(props: TargetNetworkSelectorProps) {
  const { deadline, selectDeadline } = props

  const currentDeadlineNode = useRef<HTMLButtonElement | null>(null)
  const [[minDate, maxDate], setMinMax] = useState<[Date, Date]>(calculateMinMax)

  const min = limitDateString(minDate)
  const max = limitDateString(maxDate)

  const [error, setError] = useState<string | null>(null)
  const [value, setValue] = useState<string>('')

  // Validate `value` from datetime-local input
  // useEffect(() => {
  //   try {
  //     const newDeadline = new Date(value).getTime()
  //     const { timeZone } = Intl.DateTimeFormat().resolvedOptions()

  //     if (newDeadline < minDate.getTime()) {
  //       setError(`Must be after ${minDate.toLocaleString()} ${timeZone}`)
  //     } else if (newDeadline > maxDate.getTime()) {
  //       setError(`Must be before ${maxDate.toLocaleString()} ${timeZone}`)
  //     } else {
  //       setError(null)
  //     }
  //   } catch (e) {
  //     console.error(`[TargetNetworkSelector] Failed to parse input value to Date`, value, e)
  //     setError(`Failed to parse date and time provided`)
  //   }
  // }, [maxDate, minDate, value])

  const existingDeadline = useMemo(() => targetNetworks.find((item) => item === deadline), [deadline])

  // const customDeadlineTitle = useMemo(() => {
  //   if (!customDeadline) {
  //     return ''
  //   }
  //   return new Date(customDeadline * 1000).toLocaleString(undefined, CUSTOM_DATE_OPTIONS)
  // }, [customDeadline])

  const setDeadline = useCallback(
    (deadline: TargetNetwork) => {
      selectDeadline(deadline)
      // selectCustomDeadline(null) // reset custom deadline
      currentDeadlineNode.current?.click() // Close dropdown
    },
    [selectDeadline]
  )

  // Sets value from input, if it exists
  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
      // Some browsers offer a `clear` button in their date picker
      // That action sets the value to `''`
      // In that case, use the default min value
      setValue(value)
    },
    [minDate]
  )

  const [isOpen, setIsOpen] = useState(false)

  // const openModal = useCallback(() => {
  //   currentDeadlineNode.current?.click() // Close dropdown
  //   setIsOpen(true)
  //   setError(null)

  //   const minMax = calculateMinMax()
  //   setMinMax(minMax) // Update min/max every time modal is open
  //   setValue(formatDateToLocalTime(getInputStartDate(customDeadline, minMax[0]))) // reset input to clear unsaved values
  // }, [customDeadline])

  const onDismiss = useCallback(() => setIsOpen(false), [])

  // const setCustomDeadline = useCallback(() => {
  //   // `value` is a timezone aware string
  //   // thus, we append the timezone offset (if any) when building the date object
  //   const newDeadline = Math.round(new Date(value + getTimeZoneOffset()).getTime() / 1000)

  //   selectCustomDeadline(newDeadline)
  //   onDismiss()
  // }, [onDismiss, selectCustomDeadline, value])

  return (
    <styledEl.Wrapper>
      <styledEl.Label>
        <Trans>Target Network</Trans>
      </styledEl.Label>
      <Menu>
        <styledEl.Current ref={currentDeadlineNode as any} >
          <span>{existingDeadline?.title}</span>
          <ChevronDown size="18" />
        </styledEl.Current>
        <styledEl.ListWrapper>
          {targetNetworks.map((item) => (
            <li key={item.value}>
              <styledEl.ListItem onSelect={() => setDeadline(item)}>
                <Trans>{item.title}</Trans>
              </styledEl.ListItem>
            </li>
          ))}
          {/* <styledEl.ListItem onSelect={openModal}>
            <Trans>Custom</Trans>
          </styledEl.ListItem> */}
        </styledEl.ListWrapper>
      </Menu>

      {/* Custom deadline modal */}
      <Modal isOpen={isOpen} onDismiss={onDismiss}>
        <styledEl.ModalWrapper>
          <styledEl.ModalHeader>
            <h3>
              <Trans>Set custom deadline</Trans>
            </h3>
            <styledEl.CloseIcon onClick={onDismiss} />
          </styledEl.ModalHeader>
          <styledEl.ModalContent>
            <styledEl.CustomLabel htmlFor="custom-deadline">
              <Trans>Choose a custom deadline for your limit order:</Trans>
              <styledEl.CustomInput
                type="datetime-local"
                id="custom-deadline"
                onChange={onChange}
                // For some reason, `min/max` values require the same format as `value`,
                // but they don't need to be in the user's timezone
                min={min}
                max={max}
                value={value}
                // The `pattern` is not used at all in `datetime-local` input, but is in place
                // to enforce it when it isn't support. In that case it's rendered as a regular `text` input
                pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}"
                onFocus={(event: React.FocusEvent<HTMLInputElement>) => {
                  // Bug fix for resetting input with `reset` button iOS
                  // See https://github.com/facebook/react/issues/8938
                  event.target.defaultValue = ''
                }}
              />
            </styledEl.CustomLabel>
            {/* TODO: style me!!! */}
            {error && (
              <div>
                <Trans>{error}</Trans>
              </div>
            )}
          </styledEl.ModalContent>
          {/* <styledEl.ModalFooter>
            <ButtonSecondary onClick={onDismiss}>Cancel</ButtonSecondary>
            <ButtonPrimary onClick={setCustomDeadline} disabled={!!error}>
              <Trans>Set custom date</Trans>
            </ButtonPrimary>
          </styledEl.ModalFooter> */}
        </styledEl.ModalWrapper>
      </Modal>
    </styledEl.Wrapper>
  )
}
