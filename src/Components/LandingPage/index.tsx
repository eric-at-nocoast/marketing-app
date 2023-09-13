import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background: linear-gradient(180deg, #f3eeff 0%, #ffeefd 100%);
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

const TabButton = styled.button<{ active: boolean }>`
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

const Dropdown = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  background-color: #ffeefd;
  border: 2px solid #470c42;
  border-radius: 5px;
  font-size: 1em;
  color: #272247;
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

export const LandingPage: React.FC = () => {
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [jsonInput, setJsonInput] = useState("");
  const [activeTab, setActiveTab] = useState("industry");
  const industrySummaries: any = {
    ecommerce:
      "This ticket involves a customer inquiry regarding an online purchase.",
    gaming: "This ticket involves a technical issue reported by a gamer.",
    // ... add summaries for all industries here
  };

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
            <Dropdown onChange={(e) => setSelectedIndustry(e.target.value)}>
              <option value="" disabled selected>
                Select an industry
              </option>
              <option value="ecommerce">eCommerce</option>
              <option value="gaming">Gaming</option>
              {/* add options for all industries here */}
            </Dropdown>

            <SummaryContainer>
              {selectedIndustry && <p>{industrySummaries[selectedIndustry]}</p>}
            </SummaryContainer>
            <ButtonContainer>
              <GenerateButton onClick={() => {}}>
                Generate new ticket
              </GenerateButton>
              <TestButton disabled={!selectedIndustry}>
                Test with sample ticket
              </TestButton>
            </ButtonContainer>
          </OptionContainer>
        )}
        {activeTab === "json" && (
          <OptionContainer>
            <JSONStatusContainer>
              <strong>JSON Status:</strong>{" "}
              {jsonInput && (isValidJSON(jsonInput) ? "Valid" : "Invalid")}
            </JSONStatusContainer>
            <JSONInput
              placeholder='{"key": "value"}'
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
            />
            <TestButton disabled={!isValidJSON(jsonInput)}>
              Test with my own ticket
            </TestButton>
          </OptionContainer>
        )}
      </OptionsContainer>
    </Container>
  );
};

export default LandingPage;
