import React, { useState } from "react";
import styled from "styled-components";
import { Button } from '@zendeskgarden/react-buttons';
import { useNavigate } from "react-router-dom";
import IndustryDropdown, { industryItems } from "./IndustryDropdown";
import GetRandomEntryFromStore from "../../data/hooks/randomEntry";
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
      console.log('randomEntry', randomEntry);
      navigate('/ticket/123', { state: { exampleObj: randomEntry, industry: selectedIndustry.value } });
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
              disabled
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
