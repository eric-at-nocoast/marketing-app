import styled from 'styled-components';
import { Row } from '@zendeskgarden/react-grid';
import { IconButton } from '@zendeskgarden/react-buttons';

export const ResourceWrap = styled.div`
  margin-bottom: 25px;
`;
export const StyledRow = styled(Row)`
  color: #49545c;
  font-size: 12px;

  .title {
    color: #2f3941;
    font-weight: bold;
  }

  .center {
    text-align: center;
  }

  .border {
    margin-bottom: 3px;
    border-bottom: 1px solid #d8dcde;
  }

  a {
    color: #1f73b7;
    &:hover {
      text-decoration: underline;
    }
  }

  .limit-text {
    white-space: nowrap;
    overflow: hidden;
    display: block;
    text-overflow: ellipsis;
  }

  .table-heading {
    font-size: 10px;
    color: #68737d;
  }
`;

export const SummaryMarkdown = styled.div`
  h1,
  h2 {
    font-weight: bold;
  }
  ul {
    margin-left: 15px;
    list-style-type: disc;
  }
  ol {
    margin-left: 15px;
    list-style-type: decimal;
  }
  * {
    margin-bottom: 5px;
  }
`;

export const MacroIconButton = styled(IconButton)`
  padding: 5px;
  width: 22px;
  height: 22px;
  min-width: auto;
  margin: 2px 0;
`;
