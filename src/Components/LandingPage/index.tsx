import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Button } from '@zendeskgarden/react-buttons';
import { useNavigate } from "react-router-dom";
import IndustryDropdown, { industryItems } from "./Components/IndustryDropdown";
import GetRandomEntryFromStore from "../../Data/hooks/randomEntry";
import { MD } from "@zendeskgarden/react-typography";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background: linear-gradient(180deg, #fef9f5 50%, #ffeeff 100%);
  color: #272247;
`;

const Title = styled.h1`
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 2.5em;
`;

const Subtitle = styled.h2`
  margin-bottom: 40px;
  text-align: center;
  font-size: 1.5em;
`;

const OptionsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 80%;
  height: 60%;
`;

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
`;

const TabButton = styled(Button)<{ active: boolean }>`
  font-size: 1.5em;
  margin: 0 20px;
  padding-bottom: 10px;
  background: none;
  border: none;
  border-bottom: ${(props) => (props.active ? "4px solid #8856FF" : "none")};
  color: ${(props) => (props.active ? "#272247" : "#8856FF")};
  cursor: pointer;
`;

const JSONStatusContainer = styled.div`
  height: 40px;
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  background-color: #ffeefd;
  border: 2px solid #470c42;
  border-radius: 5px;
  font-size: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #272247;
`;

const JSONInput = styled.textarea`
  width: 100%;
  height: 300px;
  padding: 10px;
  border: 2px solid #470c42;
  margin-bottom: 20px;
  border-radius: 5px;
  background-color: #ffeefd;
  font-size: 1em;
  color: #272247;
  resize: none;
  overflow-y: auto;
  font-family: "Courier New", Courier, monospace;
`;

const OptionContainer = styled.div`
  width: 50%;
  padding: 20px;
  background-color: #f3eeff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SummaryContainer = styled.div`
  width: 100%;
  height: 300px; /* Adjust based on the height of JSONInput */
  padding: 10px;
  border: 2px solid #470c42;
  border-radius: 5px;
  margin-bottom: 20px;
  background-color: #ffeefd;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1em;
`;

const TestButton = styled.button`
  width: 40%;
  padding: 10px;
  font-size: 1em;
  background-color: #8856ff;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #7542df;
    transform: scale(1.05);
  }
`;

const GenerateButton = styled.button`
  width: 40%;
  padding: 10px;
  font-size: 1em;
  background-color: #ff52ef;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #ff30d6;
    transform: scale(1.05);
  }
`;

const ButtonContainer = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
`;

const exampleObject = {
  "comments":[
     {
        "id":18175442614285,
        "type":"Comment",
        "author_id":16350729995021,
        "body":"A quick test",
        "html_body":"<div class=\"zd-comment\" dir=\"auto\">A quick test<br>&nbsp;<br></div>",
        "plain_body":"A quick test\n&nbsp;",
        "public":true,
        "attachments":[],
        "audit_id":18175442614157,
        "created_at":"2023-08-02T21:20:52Z"
     },
     {
        "id":18175444753677,
        "type":"Comment",
        "author_id":16350729995021,
        "body":"What is this?",
        "html_body":"<div class=\"zd-comment zd-comment-pre-styled\" dir=\"auto\"><div dir=\"ltr\">What is this?<br></div><br></div>",
        "plain_body":"What is this?",
        "public":true,
        "attachments":[],
        "audit_id":18175481848845,
        "created_at":"2023-08-02T21:21:22Z"
     },
     {
        "id":18175515330701,
        "type":"Comment",
        "author_id":18175500105741,
        "body":"Whoa!",
        "html_body":"<div class=\"zd-comment zd-comment-pre-styled\" dir=\"auto\"><div dir=\"ltr\">Whoa!<br></div><br></div>",
        "plain_body":"Whoa!",
        "public":false,
        "attachments":[],
        "audit_id":18175485250701,
        "created_at":"2023-08-02T21:22:11Z"
     },
     {
        "id":18175469591437,
        "type":"Comment",
        "author_id":18175500105741,
        "body":"My printer is on fire",
        "html_body":"<div class=\"zd-comment zd-comment-pre-styled\" dir=\"auto\"><div dir=\"ltr\">My printer is on fire<br></div><br></div>",
        "plain_body":"My printer is on fire",
        "public":false,
        "attachments":[],
        "audit_id":18175485865613,
        "created_at":"2023-08-02T21:22:21Z"
     },
     {
        "id":18175530879373,
        "type":"Comment",
        "author_id":16350729995021,
        "body":"Everything is fine",
        "html_body":"<div class=\"zd-comment\" dir=\"auto\">Everything is fine<br></div>",
        "plain_body":"Everything is fine",
        "public":true,
        "attachments":[],
        "audit_id":18175470360461,
        "created_at":"2023-08-02T21:22:32Z"
     },
     {
        "id":19019973116045,
        "type":"Comment",
        "author_id":16350729995021,
        "body":"Test internal",
        "html_body":"<div class=\"zd-comment\" dir=\"auto\">Test internal<br>&nbsp;<br></div>",
        "plain_body":"Test internal\n&nbsp;",
        "public":false,
        "attachments":[],
        "audit_id":19019950274445,
        "created_at":"2023-08-30T12:04:57Z"
     }
  ],
  "next_page":null,
  "previous_page":null,
  "count":6
}

export const LandingPage: React.FC = () => {
  const [selectedIndustry, setSelectedIndustry] = useState<any>(industryItems[0])
  const [jsonInput, setJsonInput] = useState("");
  const [activeTab, setActiveTab] = useState("industry");
  const [testButtonDisabled, setTestButtonDisabled] = useState(false);
  const industrySummaries: { [key: string]: string } = {
    'education': 'Education summary',
    'ecommerce': 'Ecommerce summary',
    'energy': 'Energy summary',
    'entertainment': 'Entertainment summary',
    'finance': 'Finance summary',  
  }

  const handleTestButtonClick = async () => {
    // Disable the button to prevent multiple clicks
    setTestButtonDisabled(true);
  
    try {
      const randomEntry = await GetRandomEntryFromStore(selectedIndustry.value);
      navigate('/', { state: { exampleObj: randomEntry } });
    } catch (error) {
      console.error('Failed to get random entry', error);
      // Optionally show an error message to the user
    } finally {
      // Re-enable the button
      setTestButtonDisabled(false);
    }
  };

  const handleSelect = (value: string) => {
    const newItem = industryItems.find((item) => item.value === value);
    if (newItem) {
      setSelectedIndustry(newItem);
    }
  };


  const navigate = useNavigate();

  const isValidJSON = (str: string) => {
    try {
      JSON.parse(str);
      return true;
    } catch {
      return false;
    }
  };


  return (
    <Container>
      <Title>Customized Demo</Title>
      <Subtitle>
        Choose a sample ticket based on industry or provide your own JSON of a
        ticket.
      </Subtitle>
      <TabsContainer>
        <TabButton
          active={activeTab === "industry"}
          onClick={() => setActiveTab("industry")}
        >
          Industry
        </TabButton>
        <TabButton
          active={activeTab === "json"}
          onClick={() => setActiveTab("json")}
        >
          JSON
        </TabButton>
      </TabsContainer>
      <OptionsContainer>
        {activeTab === "industry" && (
          <OptionContainer>
            <IndustryDropdown selectedItem={selectedIndustry} handleSelect={handleSelect} />
            <SummaryContainer>
              {selectedIndustry && <p>{industrySummaries[selectedIndustry.value]}</p>}
            </SummaryContainer>
              <TestButton  disabled={!selectedIndustry || testButtonDisabled} onClick={handleTestButtonClick}
              >
                Test with sample ticket
              </TestButton>
          </OptionContainer>
        )}
        {activeTab === "json" && (
          <OptionContainer>
                          <MD isBold style={{marginBottom: '10px', alignSelf: 'start'}}>JSON Status:</MD>{" "}

            <JSONStatusContainer>
              {jsonInput && (isValidJSON(jsonInput) ? "Valid" : "Invalid")}
            </JSONStatusContainer>
            <JSONInput
              placeholder='JSON not yet supported, coming soon'
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
            />
            <TestButton disabled={true}>
              Test with my own ticket
            </TestButton>
          </OptionContainer>
        )}
      </OptionsContainer>
    </Container>
  );
};

export default LandingPage;
