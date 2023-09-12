import React from 'react';
import styled from 'styled-components';

import ThumbsUpIcon from '@zendeskgarden/svg-icons/src/12/thumbs-up-stroke.svg';
import ThumbsDownIcon from '@zendeskgarden/svg-icons/src/12/thumbs-down-stroke.svg';
import ThumbsUpSelected from '@zendeskgarden/svg-icons/src/12/thumbs-up-fill.svg';
import ThumbsDownSelected from '@zendeskgarden/svg-icons/src/12/thumbs-down-fill.svg';
import { IconButton } from '@zendeskgarden/react-buttons';

const FeedbackWrap = styled.span`
  background: #ffffff;
  border-radius: 24px;
  color: #49545c;
  padding: 6px 10px;
  font-size: 9px;
`;

export const ActionButton = styled(IconButton)<{ iconIsPrimary?: boolean; iconIsDanger?: boolean }>`
  vertical-align: bottom;
  height: auto;
  width: auto;
  min-width: auto;
  margin-left: 5px;
  border-radius: 0px;
  &:hover {
    padding: 0;
    background: transparent;
  }

  > svg {
    color: #6c6c72;
  }

  &:hover > svg {
    color: #525257;
  }

  &:active > svg {
    color: #1c1c1c;
  }

  &:disabled > svg {
    color: #dcdcdc;
  }

  ${({ iconIsPrimary }) =>
    iconIsPrimary &&
    `
    > svg {
      color: #4F3BD0;
    }

    &:hover > svg {
      color: #330493;
    }
  
    &:active > svg {
      color: #272247;
    }
  
    &:disabled > svg {
      color: #DCDCDC;
    }
  `}

  ${({ iconIsDanger }) =>
    iconIsDanger &&
    `
    > svg {
      color: #D5351F;
    }

    &:hover > svg {
      color: #B41D08;
    }
  
    &:active > svg {
      color: #7B1608;
    }
  
    &:disabled > svg {
      color: #DCDCDC;
    }
  `}
`;

const StyledThumbsUpIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <ThumbsUpIcon {...props} />
);

const StyledThumbsDownIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <ThumbsDownIcon {...props} />
);


const iconStyleCommon: React.CSSProperties  = { height: '12px', width: '12px' };

export default function Feedback() {
  return (
    <FeedbackWrap>
      {'Static Message: How did we do?'}
      <ActionButton
        onClick={() => {
          console.log('Static Action: Thumbs Up');
        }}
      >
        <StyledThumbsUpIcon style={iconStyleCommon} />
      </ActionButton>{' '}
      <ActionButton
        onClick={() => {
          console.log('Static Action: Thumbs Down');
        }}
      >
        <StyledThumbsDownIcon style={iconStyleCommon} />
      </ActionButton>
    </FeedbackWrap>
  );
}
