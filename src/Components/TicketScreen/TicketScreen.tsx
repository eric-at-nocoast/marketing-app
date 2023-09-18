import React, { useEffect, useState } from "react";
import styled from "styled-components";
import StyloApp from "../StyloApp/StyloApp";
import StyloIcon from "./StyloIcon";
import { DEFAULT_THEME } from "@zendeskgarden/react-theming";
import { ReactComponent as BuildingIcon } from "@zendeskgarden/svg-icons/src/16/building-stroke.svg";
import { ReactComponent as UserIcon } from '@zendeskgarden/svg-icons/src/16/user-circle-fill.svg';
import { MediaInput } from "@zendeskgarden/react-forms";
import { LG, MD } from "@zendeskgarden/react-typography";
import { useLocation } from "react-router-dom";
import IconDropdown from "./IconDropdown";
import TagWell from "./Tags";
import Layout from "../Common/Layout";

const Container = styled.div`
  display: flex;
  height: calc(100vh - 60px);
  width: 100vw;
  padding-left: 60px;
  box-sizing: border-box;
`;

const LeftPanel = styled.div`
  width: 300px;
  background-color: #f3f4f6;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 40px;
  border: 1px solid #e0e0e0;
  border-top: none;
`;

const MainAppPanel = styled.div`
  background-color: #f7f9fc;
  width: 40px;
  flex-shrink: 0;
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 10px 50px;
  background-color: #f7f9fc;
  border-top: 1px solid #e0e0e0;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
`;

const RightPanel = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 100%;
  overflow: hidden;
`;

const TopContainer = styled.div`
  flex: 2;
  padding: 16px;
  margin-top: 50px;
  padding-top: 0px;
  overflow-y: auto;
  background-color: #f7f9fc;
  border-bottom: 1px solid #e0e0e0;
`;

const BottomContainer = styled.div`
  flex: 1;
  padding: 16px;
  background-color: #fff;
`;

const TopContainerHeader = styled.div`
  height: 40px;
  display: flex;
  place-items: center;
  justify-content: center;
  width: calc(100% + 32px);
  background-color: #f3f4f6;
  position: sticky;
  top: 0;
  margin-left: -16px;
  margin-right: -16px;
  box-sizing: border-box;
  margin-bottom: 16px;
  border: 1px solid #e0e0e0;
  border-top: none;
  border-left: none;
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
  height: calc(
    100% - 42px
  ); // Adjusted to accommodate the height of IconContainer
  border: 1px solid #e0e0e0;
  border-bottom: none;
  border-radius: 8px 8px 0 0;
  padding: 8px;
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
  background-color: white;
  border: 1px solid #e0e0e0;
  border-top: none;
  border-radius: 0 0 8px 8px;
`;

const Icon = styled.div<{ active?: boolean }>`
  background-color: ${(props) =>
    props.active ? DEFAULT_THEME.palette.grey[200] : ""};
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 5px;
  padding: 8px;

  hover: {
    background-color: #e0e0e0;
  }
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
  box-sizing: border-box;
`;

function TicketScreen() {
  const [styloVisible, setStyloVisible] = React.useState(false);
  const [exampleObj, setExampleObj] = useState<any>(null);
  const location = useLocation();

  const [buttonPosition, setButtonPosition] = React.useState({
    top: 0,
    left: 0,
  });
  const buttonRef = React.useRef<HTMLDivElement>(null);


  useEffect(() => {
    const fallbackObj = {
      "comments": [
        {
          "id": 1,
          "type": "Comment",
          "body": "Hello, I have a question about one of your products.",
          "public": true,
          "via": {
            "channel": "Web",
            "source": {
              "from": "Customer",
              "to": "EcoHomestead"
            }
          }
        },
        {
          "id": 2,
          "type": "Comment",
          "body": "Sure, go ahead and ask your question. I'll be happy to help!",
          "public": true,
          "via": {
            "channel": "Web",
            "source": {
              "from": "EcoHomestead",
              "to": "Customer"
            }
          }
        },
        {
          "id": 3,
          "type": "Comment",
          "body": "I'm interested in purchasing the 'EcoBamboo Cutting Board.' Can you please tell me what material it is made of?",
          "public": true,
          "via": {
            "channel": "Web",
            "source": {
              "from": "Customer",
              "to": "EcoHomestead"
            }
          }
        },
        {
          "id": 4,
          "type": "Comment",
          "body": "Thank you for your inquiry! The 'EcoBamboo Cutting Board' is made from 100% organic bamboo.",
          "public": true,
          "via": {
            "channel": "Web",
            "source": {
              "from": "EcoHomestead",
              "to": "Customer"
            }
          }
        },
        {
          "id": 5,
          "type": "Comment",
          "body": "That's great! Bamboo is a sustainable material. Does it come with any certifications?",
          "public": true,
          "via": {
            "channel": "Web",
            "source": {
              "from": "Customer",
              "to": "EcoHomestead"
            }
          }
        }
      ],
      "id": "ab1dfaed-2473-48ee-bd7a-831c3f5a911f"
    }
    setExampleObj(location.state?.exampleObj || fallbackObj);
  }, [location.state]);

  const handleVisibilityToggle = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setButtonPosition({ top: rect.top, left: rect.left });
    }
    setStyloVisible((prevVisibility) => !prevVisibility);
  };

  return (
    <Layout>
      <Container>
        <LeftPanel>
          <Field>
            <Label>Brand</Label>
            <MediaInput start={<BuildingIcon />} value="Example Brand" />
          </Field>
          <Field>
            <IconDropdown
              options={["Luke Skywalker", "Yoda", "Darth Vader"]}
              label="Requester"
            />
          </Field>
          <Field>
            <IconDropdown
              options={["Han Solo", "R2-D2", "C-3P0"]}
              label="Assignee"
              startIcon={() => <StyloIcon fill="#330493" marginValue="8px" />}
            />
          </Field>
          <Field>
            <TagWell
              tags={["Tag 1", "Tag 2", "Tag 3", "Tag 4", "Tag 5", "Tag 6"]}
            />
          </Field>
        </LeftPanel>
        <RightPanel>
          <TopContainer>
            <TopContainerHeader>
              <LG>Example Subject</LG>
            </TopContainerHeader>
            {exampleObj?.comments?.map((comment: any, index: any) => (
              <>
              <MD style={{marginLeft: '32px'}}>{comment.via.source.from}</MD>
              <div style={{display: 'flex', alignItems: 'center'}}>
                {comment.via.source.from === 'Customer' ? <UserIcon style={{height: '24px', width: '24px', marginRight: '8px'}} /> : <StyloIcon fill="#330493" marginValue="8px" size="24px"/>}
            <Message key={index}>{comment.body}</Message>
            </div>
            </>
            ))}
          </TopContainer>

          <BottomContainer>
            {styloVisible && (
              <StyloAppContainer
                style={{
                  top: `${buttonPosition.top - 330}px`,
                  left: `${buttonPosition.left + 25}px`,
                }}
              >
                <StyloApp />
              </StyloAppContainer>
            )}
            <TextArea placeholder="Enter text here..." />
            <IconContainer>
              <Icon onClick={() => console.log("Icon 1 clicked")}>👍</Icon>
              <Icon onClick={() => console.log("Icon 2 clicked")}>👎</Icon>
              <Icon
                active={styloVisible}
                onClick={handleVisibilityToggle}
                ref={buttonRef}
              >
                <StyloIcon fill={styloVisible ? "#FF52EF" : "#000000"} />
              </Icon>
            </IconContainer>
          </BottomContainer>
        </RightPanel>
      </Container>
      <BottomRow>
        <SubmitButton onClick={() => console.log("Submit Ticket clicked")}>
          Submit Ticket
        </SubmitButton>
      </BottomRow>
      <MainAppPanel />
    </Layout>
  );
}

export default TicketScreen;
