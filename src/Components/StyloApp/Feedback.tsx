import React from 'react';
import styled, { CSSObject } from 'styled-components';
import { ReactComponent as ThumbsUpIcon } from '@zendeskgarden/svg-icons/src/12/thumbs-up-stroke.svg';
import { ReactComponent as ThumbsDownIcon } from '@zendeskgarden/svg-icons/src/12/thumbs-down-stroke.svg';
import { IconButton } from '@zendeskgarden/react-buttons';

const FeedbackWrap = styled.span`
`;

export const ActionButton = styled(IconButton)<{
  iconIsPrimary?: boolean;
  iconIsDanger?: boolean;
}>`
`;

const iconStyleCommon: CSSObject = { height: '12px', width: '12px' };

export default function Feedback() {
  return (
    <FeedbackWrap>
      How did we do?
      <ActionButton
        onClick={() => {
          console.log('Static Action: Thumbs Up');
        }}
      >
        <ThumbsUpIcon style={iconStyleCommon} />
      </ActionButton>{' '}
      <ActionButton
        onClick={() => {
          console.log('Static Action: Thumbs Down');
        }}
      >
        <ThumbsDownIcon style={iconStyleCommon} />
      </ActionButton>
    </FeedbackWrap>
  );
}
