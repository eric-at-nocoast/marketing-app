import React from 'react';
import styled from 'styled-components';
const IconWrapper = styled.div`
width: 16px;
height: 16px;
display: flex;
align-items: center;
justify-content: center;
&:hover svg path {
  fill: #FF52EF; 
}
`;

interface Props {
    fill?: string;
    marginValue?: string;
}

function StyloIcon({ fill, marginValue }: Props) {


  return (
    <IconWrapper style={{marginRight: marginValue || '0px' }}>
    <svg
      width="16"
      height="16"
      viewBox="1 1 74 74"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.328 37.08C11.328 22.8576 22.8576 11.328 37.08 11.328C51.3024 11.328 62.832 22.8576 62.832 37.08C62.832 51.3024 51.3024 62.832 37.08 62.832C22.8576 62.832 11.328 51.3024 11.328 37.08ZM37.08 0.671997C16.9724 0.671997 0.671997 16.9724 0.671997 37.08C0.671997 57.1876 16.9724 73.488 37.08 73.488C57.1876 73.488 73.488 57.1876 73.488 37.08C73.488 16.9724 57.1876 0.671997 37.08 0.671997ZM52.7793 46.5822C53.6133 44.4509 52.5616 42.047 50.4303 41.213C48.299 40.379 45.8952 41.4307 45.0612 43.562C44.6498 44.6132 42.4677 47.7361 37.6722 47.7361C32.7487 47.7361 29.8861 44.4506 29.2102 43.1552C28.1516 41.1261 25.6484 40.3394 23.6194 41.3981C21.5903 42.4568 20.8036 44.9599 21.8623 46.989C23.5544 50.2322 28.8614 56.0241 37.6722 56.0241C46.6112 56.0241 51.4147 50.0695 52.7793 46.5822Z"
        fill={fill}
      />
    </svg>
    </IconWrapper>
  );
}

export default StyloIcon;
