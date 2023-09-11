import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import StyloApp from './StyloApp';
import StyloIcon from './StyloIcon';
import { DEFAULT_THEME } from '@zendeskgarden/react-theming';
import { ReactComponent as BuildingIcon } from "@zendeskgarden/svg-icons/src/16/building-stroke.svg";
import { MediaInput } from '@zendeskgarden/react-forms';
import IconDropdown from './Components/TicketScreen/IconDropdown';
import TagWell from './Components/TicketScreen/Tags';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const Container = styled.div`
  display: flex;
  height: calc(100vh - 100px); /* Making space for the new row */
  width: 100vw;
`;

const LeftPanel = styled.div`
  width: 300px;
  background-color: #f3f4f6;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
`;

const RightPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%; /* Ensuring the right panel takes up the full height */
`;

const TopContainer = styled.div`
  flex: 2;
  padding: 16px;
  overflow-y: scroll;
  background-color: #f7f9fc;
  border-bottom: 1px solid #e0e0e0;
`;

const BottomContainer = styled.div`
  flex: 1;
  padding: 16px;
  background-color: #fff;
  position: relative;
`;

const Message = styled.div`
  padding: 8px;
  margin-bottom: 8px;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: calc(100% - 40px); 
  border: 1px solid #e0e0e0;
  border-bottom: none;
  border-radius: 8px 8px 0 0; 
  padding: 8px;
  padding-bottom: 0;
  font-size: 16px;
  resize: none;
  margin-bottom: -5px;
  &:focus {
    outline: none;
    box-shadow: none;
    border-bottom: 0;
  }

`;
const IconContainer = styled.div`
  display: flex;
  gap: 10px; 
  background-color: white; 
  border: 1px solid #e0e0e0; 
  border-top: none; 
  border-radius: 0 0 8px 8px; 
`;

const Icon = styled.div<{ active?: boolean }>`
  background-color: ${(props) => (props.active ? DEFAULT_THEME.palette.grey[200] : '')};
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 5px;
  padding: 8px;
  
  hover:{
    background-color: #e0e0e0;
  } 
`;

const TopRow = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: flex-end;
  padding: 10px 15px;
  background-color: #f7f9fc; 
  border-bottom: 1px solid #e0e0e0; 
`;

const BottomRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 10px 15px;
  background-color: #f7f9fc; 
  border-top: 1px solid #e0e0e0; 
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #000000; 
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #730060; 
  }
`;

const StyloAppContainer = styled.div`
  position: fixed;
  z-index: 1000; 
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 8px;
`;



function TicketScreen() {
    const [styloVisible, setStyloVisible] = React.useState(false);    

      const [buttonPosition, setButtonPosition] = React.useState({ top: 0, left: 0 });
      const buttonRef = React.useRef<HTMLDivElement>(null);
    
      const handleVisibilityToggle = () => {
        if (buttonRef.current) {
          const rect = buttonRef.current.getBoundingClientRect();
          setButtonPosition({ top: rect.top, left: rect.left });
        }
        setStyloVisible((prevVisibility) => !prevVisibility);
      };

  return (
    <>
      <GlobalStyle />
      <TopRow/>
      <Container>
        <LeftPanel>
        <Field>
          <Label>Brand</Label>
          <MediaInput start={<BuildingIcon />} value="Example Brand"/>
          </Field>
          <Field>
          <IconDropdown options={['Luke Skywalker', 'Yoda', 'Darth Vader']} label='Requester'/>
          </Field>
          <Field>
          <IconDropdown 
          options={['Han Solo', 'R2-D2', 'C-3P0']} 
          label='Assignee' 
          startIcon={() => <StyloIcon fill='#330493' marginValue='8px' />} 
/>
          </Field>
          <Field>
            <TagWell tags={['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4', 'Tag 5', 'Tag 6']} />
          </Field>
        </LeftPanel>
        <RightPanel>
          <TopContainer>
            {/* Past messages should be rendered here; it's a static representation for now */}
            <Message>Agent: Hello, how can I assist you today?</Message>
            <Message>Customer: I am facing issues with my order.</Message>
            {/* Repeat Message components as needed */}
          </TopContainer>

          <BottomContainer>
          {styloVisible && (
        <StyloAppContainer style={{ top: `${buttonPosition.top - 330}px`, left: `${buttonPosition.left + 25}px` }}>
          <StyloApp />
        </StyloAppContainer>
      )}
        <TextArea placeholder="Enter text here..." />
      <IconContainer>
        <Icon onClick={() => console.log('Icon 1 clicked')}>👍</Icon>
        <Icon onClick={() => console.log('Icon 2 clicked')}>👎</Icon>
        <Icon  active={styloVisible} onClick={handleVisibilityToggle}  ref={buttonRef}><StyloIcon fill={styloVisible ? '#FF52EF' : '#000000'}/></Icon>
      </IconContainer>
          </BottomContainer>
        </RightPanel>
      </Container>
      <BottomRow>
          <SubmitButton onClick={() => console.log('Submit Ticket clicked')}>Submit Ticket</SubmitButton>
        </BottomRow>
    </>
  );
}

export default TicketScreen;
