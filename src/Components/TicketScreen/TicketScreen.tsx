import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import StyloApp from "../styloApp/StyloApp";
import StyloIcon from "./StyloIcon";
import { DEFAULT_THEME } from "@zendeskgarden/react-theming";
import { ReactComponent as BuildingIcon } from "@zendeskgarden/svg-icons/src/16/building-stroke.svg";
import { ReactComponent as UserIcon } from "@zendeskgarden/svg-icons/src/16/user-circle-fill.svg";
import {ReactComponent as Link } from '@zendeskgarden/svg-icons/src/16/link-fill.svg';
import {ReactComponent as Text } from '@zendeskgarden/svg-icons/src/16/text-stroke.svg';
import { MediaInput } from "@zendeskgarden/react-forms";
import { LG, MD } from "@zendeskgarden/react-typography";
import { useLocation } from "react-router-dom";
import IconDropdown from "./IconDropdown";
import TagWell from "./Tags";
import Layout from "../common/Layout";
import { TicketBody, OutputFormat } from "../../types/common";

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
  cursor: ${(props) => (props.active ? "pointer" : "default")};
  margin-bottom: 5px;
  padding: 8px;

  hover: {
    background-color: ${(props)=> props.active ? DEFAULT_THEME.palette.grey[200] : ''};
  }
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #000000;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:disabled {
    background-color: #87929d;
    cursor: not-allowed;
  }
  &:hover:not(:disabled) {
    background-color: #730060;
  }
`;

const StyloAppContainer = styled.div`
@media (min-width: 1440px) {
  width: 800px;
};
@media (min-width: 1440px) {
  width: 800px;
};
  position: fixed;
  z-index: 1000;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 8px;
  box-sizing: border-box;
`;


type ExampleComment = {
  id: number;
  type: string;
  body: string;
  public: boolean;
  via: {
    channel: string;
    source: {
      from: {
        name: string;
        email: string;
      };
      to: {
        name: string;
        email: string;
      };
    };
  };
};

function transformJson(comment: ExampleComment): OutputFormat {
  let is_end_user =
    comment.via.source.from.email === "customer@example.com" ? true : false;
  let user_id = is_end_user ? 123 : 789;

  return {
    is_end_user,
    author_id: user_id,
    plain_text: comment.body,
  };
}





function TicketScreen() {
  const [styloVisible, setStyloVisible] = useState(false);
  const [exampleObj, setExampleObj] = useState<any>(null);
  const [ticketBody, setTicketBody] = useState<TicketBody>();
  const [textAreaValue, setTextAreaValue] = useState("");
  const location = useLocation();

  const [buttonPosition, setButtonPosition] = useState({
    top: 0,
    left: 0,
    height: 0,
    width: 0,
  });
  const buttonRef = useRef<HTMLDivElement>(null);

  console.log(location.state)


  useEffect(() => {
const fallbackObj ={
  "comments": [
      {
          "id": 1,
          "type": "Comment",
          "body": "Hello, I am interested in finding courses that offer Continuing Education Units (CEUs). Can you help me with that?",
          "public": true,
          "via": {
              "channel": "Customer Support",
              "source": {
                  "from": {
                      "name": "Customer",
                      "email": "customer@example.com"
                  },
                  "to": {
                      "name": "Agent",
                      "email": "agent@supportOrg.com"
                  }
              }
          }
      },
      {
          "id": 2,
          "type": "Comment",
          "body": "Of course! At LearnSphere, we offer a wide range of online courses that provide Continuing Education Units (CEUs). What specific field or topic are you looking for?",
          "public": true,
          "via": {
              "channel": "Customer Support",
              "source": {
                  "from": {
                      "name": "Agent",
                      "email": "customer@example.com"
                  },
                  "to": {
                      "name": "Customer",
                      "email": "customer@example.com"
                  }
              }
          }
      },
      {
          "id": 3,
          "type": "Comment",
          "body": "I'm interested in courses related to project management. Can you recommend any?",
          "public": true,
          "via": {
              "channel": "Customer Support",
              "source": {
                  "from": {
                      "name": "Customer",
                      "email": "customer@example.com"
                  },
                  "to": {
                      "name": "Agent",
                      "email": "agent@supportOrg.com"
                  }
              }
          }
      },
      {
          "id": 4,
          "type": "Comment",
          "body": "Absolutely! We have a highly-rated course called 'Effective Project Management' that offers 10 CEUs upon completion. It covers all the essential aspects of project management. Would you like more information about this course?",
          "public": true,
          "via": {
              "channel": "Customer Support",
              "source": {
                  "from": {
                      "name": "Agent",
                      "email": "customer@example.com"
                  },
                  "to": {
                      "name": "Customer",
                      "email": "customer@example.com"
                  }
              }
          }
      },
      {
          "id": 5,
          "type": "Comment",
          "body": "Yes, please! I would like to know the duration, cost, and any prerequisites for the 'Effective Project Management' course.",
          "public": true,
          "via": {
              "channel": "Customer Support",
              "source": {
                  "from": {
                      "name": "Customer",
                      "email": "customer@example.com"
                  },
                  "to": {
                      "name": "Agent",
                      "email": "agent@supportOrg.com"
                  }
              }
          }
      }
  ],
  "id": "d2bf5a3b-c0ac-4380-82d6-7117a5abea92"
}


    
    const industryObj = {
      education: {
      value: 'education',
      companyName: 'LearnSphere',
      companysubdomain: 'trylo-education',
    },
    ecommerce: {
      value: 'ecommerce',
      companyName: 'EcoHomestead',
      companysubdomain: 'trylo-ecommerce',
    },
    energy: {
      value: 'energy',
      companyName: 'Bright Energy',
      companysubdomain: 'trylo-energy',
    },
    entertainment: {
      value: 'entertainment',
      companyName: 'StarStreamCo',
      companysubdomain: 'trylo-entertainment',
    },
    finance: {
      value: 'finance',
      companyName: 'SecureWealth',
      companysubdomain: 'trylo-finance',
    }}
    

    if(location.state.exampleObj && location.state.industry){
        const randomTicketId = Math.floor(Math.random() * 10000);
        const comments = location.state.exampleObj.comments;
        let cleanedComments: any[] = [];
  
        comments.forEach((comment: ExampleComment) => {
          const outputData = transformJson(comment);
          cleanedComments.push(outputData);
        });


         const industry: string = location.state.industry;
        const companySubdomain: string = industryObj[industry as keyof typeof industryObj].companysubdomain;


        const ticketBody = {
          ticket_info: {
            subdomain: "d3v-trylo",
            brand_subdomain: companySubdomain,
            ticket_id: randomTicketId,
            description: cleanedComments[0].plain_text,
          },
          comments: cleanedComments,
        };
        setTicketBody(ticketBody);
        setExampleObj(location.state.exampleObj)
      }
    else {
      const randomTicketId = Math.floor(Math.random() * 10000);
      const comments = fallbackObj.comments;
      let cleanedComments: any[] = [];

      comments.forEach((comment: ExampleComment) => {
        const outputData = transformJson(comment);
        cleanedComments.push(outputData);
      });
      const ticketBody = {
        ticket_info: {
          subdomain: "d3v-trylo",
          brand_subdomain: 'trylo-education',
          ticket_id: randomTicketId,
          description: cleanedComments[0].plain_text,
        },
        comments: cleanedComments,
      };
      setTicketBody(ticketBody);
      setExampleObj(fallbackObj);

    }

  }, [location.state.industry, location.state.exampleObj ]);

  const handleVisibilityToggle = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setButtonPosition({ top: rect.top, left: rect.left, height: rect.height, width: rect.width });
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
            {exampleObj?.comments?.map((comment: any, index: any) => {
              const via = comment.via.source.from.name ?? "";
              return (
                <>
                  <MD style={{ marginLeft: "32px" }}>
                    {via === "Customer" || via === 'customer' || via === 'customer@example.com' ? "Luke Skywalker" : "Han Solo"}
                  </MD>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {typeof via === "string" &&
                    (via.includes("customer") || via.includes("Customer" || via === 'customer@example.com')) ? (
                      <UserIcon
                        style={{
                          height: "24px",
                          width: "24px",
                          marginRight: "8px",
                        }}
                      />
                    ) : (
                      <StyloIcon fill="#330493" marginValue="8px" size="24px" />
                    )}
                    <Message style={{backgroundColor: via === 'Customer' || via === 'customer' || via === 'customer@example.com' ? '#F3EEFF' : '#FFEEFD' }} key={index}>{comment.body}</Message>
                  </div>
                </>
              );
            })}
          </TopContainer>

          <BottomContainer>
            {ticketBody && (
              <StyloAppContainer
              style={{
                top: `${buttonPosition.top - 330}px`, 
                left: `${buttonPosition.left + 15}px`,
                visibility: styloVisible ? "visible" : "hidden", 
              }}
              >
                <StyloApp 
                ticketObj={ticketBody}
                styloVisible={styloVisible} 
                setTextAreaValue={setTextAreaValue}
                />
              </StyloAppContainer>
            )}
            <TextArea
              value={textAreaValue}
              onChange={(e)=>{setTextAreaValue(e.target.value)}}
             />
            <IconContainer>
              <Icon active={false} onClick={() => console.log("Icon 1 clicked")}><Link/></Icon>
              <Icon active={false} onClick={() => console.log("Icon 2 clicked")}><Text/></Icon>
              <Icon
              id="stylo-button"
                active={styloVisible}
                onClick={() => {
                  handleVisibilityToggle();
                }}
                ref={buttonRef}
              >
                <StyloIcon fill={styloVisible ? "#FF52EF" : "#000000"} />
              </Icon>
            </IconContainer>
          </BottomContainer>
        </RightPanel>
      </Container>
      <BottomRow>
        <SubmitButton disabled={ textAreaValue === '' ? true : false }  onClick={() => console.log("Submit Ticket clicked")}>
          Submit Ticket
        </SubmitButton>
      </BottomRow>
      <MainAppPanel />
    </Layout>
  );
}

export default TicketScreen;
