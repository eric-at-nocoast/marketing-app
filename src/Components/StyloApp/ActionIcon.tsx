import React from 'react';

import { Tooltip } from '@zendeskgarden/react-tooltips';

import { ActionButton } from './Feedback';

export interface ActionIconProps {
  Icon: React.FC<{ style?: React.CSSProperties }>;
  tooltipContent: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  iconIsPrimary?: boolean;
  iconIsDanger?: boolean;
}

export default function ActionIcon({
  Icon,
  tooltipContent,
  onClick,
  disabled,
  iconIsPrimary,
  iconIsDanger
}: ActionIconProps) {
  return (
    <Tooltip
      style={{ fontSize: '10px', left: '6px' }}
      placement="top-end"
      delayMS={0}
      content={tooltipContent}
    >
      <ActionButton
        iconIsPrimary={iconIsPrimary}
        iconIsDanger={iconIsDanger}
        disabled={disabled}
        onClick={onClick}
      >
        <Icon />
      </ActionButton>
    </Tooltip>
  );
}

ActionIcon.defaultProps = {
  onClick: () => {},
  disabled: false,
  iconIsPrimary: false,
  iconIsDanger: false
};
