import { useState } from "react";
import styled, { css } from "styled-components";
import { Tooltip } from "@zendeskgarden/react-tooltips";
import { Grid, Row, Col } from "@zendeskgarden/react-grid";
import { Tabs, TabList, Tab, TabPanel } from "@zendeskgarden/react-tabs";
import { Well } from "@zendeskgarden/react-notifications";
import { Textarea } from "@zendeskgarden/react-forms";
import { Spinner } from "@zendeskgarden/react-loaders";

import { ReactComponent as CopyIcon } from "@zendeskgarden/svg-icons/src/12/copy-stroke.svg";
import { ReactComponent as ReloadIcon } from "@zendeskgarden/svg-icons/src/12/reload-stroke.svg";
import { ReactComponent as TrashIcon } from "@zendeskgarden/svg-icons/src/12/trash-stroke.svg";
import { ReactComponent as TranslationIcon } from "@zendeskgarden/svg-icons/src/12/translation-exists-stroke.svg";
import { ReactComponent as EyeStrokeIcon } from "@zendeskgarden/svg-icons/src/12/eye-stroke.svg";
import { ReactComponent as NotesIcon } from "@zendeskgarden/svg-icons/src/12/notes-stroke.svg";

import ActionIcon from "./ActionIcon";

import { MacroIconButton, StyledRow, SummaryMarkdown } from "./Common";

const Heading = styled.div<{ isCenter?: boolean }>`
  font-weight: bold;
  text-align: ${({ isCenter }) => (isCenter ? "center" : "inherit")};
  margin: 5px 0px;
  color: #2f3941;
`;

const tabColor = "#4F3BD0";

const StyloTab = styled(Tab)<{ isSelected?: boolean }>`
  font-size: 12px;
  padding: 5px 15px;
  border-color: ${({ isSelected }) => isSelected && "currentColor !important"};
  color: ${({ isSelected }) => (isSelected ? tabColor : "inherit")};

  &:hover {
    color: ${tabColor};
  }

  &:active {
    border-color: currentColor;
    color: ${tabColor};
  }

  &[data-garden-focus-visible] {
    color: ${tabColor};
  }
`;

const TextContainer = styled(Well)<{
  height?: number;
  color?: "primary" | "dark";
  hasShadows?: boolean;
}>`
  position: relative;
  border-radius: 8px;

  font-size: 12px;
  padding: 10px 10px 35px;

  ${({ color }) => {
    if (color === "primary") {
      return css`
        color: #2f3941;
        background: #f3eeff;
      `;
    }

    if (color === "dark") {
      return css`
        color: #ffffff;
        background: #525257;
      `;
    }

    return css`
      color: #49545c;
      background: #f4f4f3;
    `;
  }}

  ${({ height }) => css`
    > p,
    .markdown {
      height: ${`${height}px` || "auto"};
      min-height: 20px;
      max-height: ${!height ? "250px" : "auto"};
      overflow-y: auto;
      margin: 0px;
    }
    > p {
      white-space: pre-wrap;
    }
  `}

  ${({ hasShadows, color }) =>
    hasShadows && color === "primary"
      ? css`
          > p {
            background:
    /* Shadow Cover TOP */ linear-gradient(
                  rgb(243, 238, 255) 30%,
                  rgba(255, 255, 255, 0)
                )
                center top,
              /* Shadow Cover BOTTOM */
                linear-gradient(rgba(255, 255, 255, 0), rgb(243, 238, 255) 70%)
                center bottom,
              /* Shadow TOP */
                radial-gradient(
                  farthest-side at 50% 0,
                  rgba(0, 0, 0, 0.3),
                  rgba(0, 0, 0, 0)
                )
                center top,
              /* Shadow BOTTOM */
                radial-gradient(
                  farthest-side at 50% 100%,
                  rgba(0, 0, 0, 0.3),
                  rgba(0, 0, 0, 0)
                )
                center bottom;

            background-repeat: no-repeat;
            background-size: 100% 40px, 100% 40px, 100% 12px, 100% 12px;
            background-attachment: local, local, scroll, scroll;
          }
        `
      : ""}
`;

const ActionButtonWrap = styled.div`
  position: absolute;
  bottom: 4px;
  display: flex;
  width: 100%;
`;

const ActionButtonsRight = styled.div`
  justify-content: end;
  margin: 3px 15px 0px auto;
`;

const Button = styled.button<{ isPrimary?: boolean }>`
  font-size: 10px;
  padding: 3px 8px;
  border-radius: 10px;
  cursor: pointer;

  ${({ isPrimary }) =>
    isPrimary
      ? `
      color: #FFFFFF;
      border: 1px solid #4F3BD0;
      background: #4F3BD0;
      &:hover {
        border: 1px solid #330493;
        background: #330493;
      }
      &:active {
        border: 1px solid #272247;
        background: #272247;
      }
      &:disabled {
        border: 1px solid #DCDCDC;
        background: #DCDCDC;
      }
    `
      : `
    color: #4F3BD0;
    border: 1px solid #4F3BD0;
    &:hover {
      border: 1px solid #330493;
      color: #330493;
    }
    &:active {
      border: 1px solid #272247;
      color: #272247;
    }
    &:disabled {
      border: 1px solid #DCDCDC;
      color: #DCDCDC;
    }
    `}
`;

const InputArea = styled(Textarea)`
  padding: 0;
  height: 50px;
  font-size: 12px;
  color: #68737d;
  background: transparent;
  border: none;
  &:focus {
    border: none;
    box-shadow: none;
  }
`;

function LoadingMessage({ message }: { message: string }) {
  return (
    <>
      <Spinner size="12" delayMS={0} />
      {message}
    </>
  );
}

enum AsssitTabs {
  SUMMARY = "summary",
  RELEVANT_RESOURCES = "relevant_resources",
  TRANSLATION = "translation",
}

export default function StyloApp() {
  const [assistTab, setAssistTab] = useState<AsssitTabs>(AsssitTabs.SUMMARY);
 
  return (
    <>
    <Grid style={{ fontSize: "12px", 
    padding: "0px 10px", 
    height: '320px', 
    width: '800px', 
    overflow: 'auto'  }} gutters="sm">
      <Row>
        <Col>
          <Tabs selectedItem={assistTab} onChange={setAssistTab}>
            <TabList style={{ marginBottom: "15px" }}>
              <StyloTab
                isSelected={assistTab === AsssitTabs.SUMMARY}
                item={AsssitTabs.SUMMARY}
              >
                Summary
              </StyloTab>
              <StyloTab
                isSelected={assistTab === AsssitTabs.RELEVANT_RESOURCES}
                item={AsssitTabs.RELEVANT_RESOURCES}
              >
                Relevant Resources
              </StyloTab>
              <StyloTab
                isSelected={assistTab === AsssitTabs.TRANSLATION}
                item={AsssitTabs.TRANSLATION}
              >
                Translation
              </StyloTab>
            </TabList>

            <TabPanel item={AsssitTabs.SUMMARY}>
              <TextContainer hasShadows color="primary" height={85}>
                <p>Example summary text here.</p>
                <ActionButtonWrap>
                  <ActionButtonsRight>
                    <ActionIcon
                      Icon={CopyIcon}
                      tooltipContent="Copy to clipboard"
                      onClick={() => {}}
                    />
                    <ActionIcon
                      Icon={ReloadIcon}
                      iconIsPrimary
                      tooltipContent="Regenerate"
                      onClick={() => {}}
                    />
                  </ActionButtonsRight>
                </ActionButtonWrap>
              </TextContainer>

              <Heading>Use My Input ✨</Heading>
              <TextContainer>
                <InputArea
                  data-chromatic="ignore"
                  ref={null}
                  onChange={() => {}}
                  value="Example input text"
                  placeholder="Press generate response to create an auto-reply or try something like 'example placeholder text'"
                />
                <ActionButtonWrap>
                  <ActionButtonsRight>
                    <ActionIcon
                      Icon={TrashIcon}
                      iconIsDanger
                      tooltipContent="Clear field"
                      onClick={() => {}}
                    />
                    <ActionIcon
                      Icon={CopyIcon}
                      tooltipContent="Copy to clipboard"
                      onClick={() => {}}
                    />
                    <Button onClick={() => {}}>Generate Response</Button>
                  </ActionButtonsRight>
                </ActionButtonWrap>
              </TextContainer>
            </TabPanel>

            <TabPanel
              style={{ maxHeight: "250px", overflowY: "auto" }}
              id="relevantResources"
              item={AsssitTabs.RELEVANT_RESOURCES}
            >
              <div style={{ marginBottom: "10px" }}>
                <StyledRow>
                  <Col className="title">Knowledge Base Articles</Col>
                </StyledRow> 
                <StyledRow style={{ maxHeight: "70px", overflowY: "auto" }}>
                  <Col xs={12} className="border">
                    <a
                      href="https://example.com/article/1"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Example Article Title
                    </a>
                  </Col>
                  <Col xs={12} className="border">
                    <a
                      href="https://example.com/article/1"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Example Article Title
                    </a>
                  </Col>
                  <Col xs={12} className="border">
                    <a
                      href="https://example.com/article/1"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Example Article Title
                    </a>
                  </Col>
                </StyledRow>
              </div>
              <div style={{ marginBottom: "10px" }}>
                <StyledRow>
                  <Col className="title">Tickets</Col>
                </StyledRow>
                <div style={{ maxHeight: "125px", overflowY: "auto" }}>
                  <StyledRow>
                    <Col xs={8} className="border">
                      <a
                        href="https://example.zendesk.com/agent/tickets/1"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Example Ticket #1
                      </a>
                    </Col>
                    <Col xs={4} className="border">
                      Assignee
                    </Col>
                    <Col xs={8} className="border">
                      <a
                        href="https://example.zendesk.com/agent/tickets/1"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Example Ticket #2
                      </a>
                    </Col>
                    <Col xs={4} className="border">
                      Assignee
                    </Col>
                    <Col xs={8} className="border">
                      <a
                        href="https://example.zendesk.com/agent/tickets/1"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Example Ticket #3
                      </a>
                    </Col>
                    <Col xs={4} className="border">
                      Assignee
                    </Col>
                  </StyledRow>
                </div>
              </div>

              <StyledRow>
                <Col className="title border">Macros</Col>
              </StyledRow>
              <StyledRow>
                <Col xs={12}>
                  <Row>
                    <Col
                      xs={8}
                      style={{
                        paddingTop: "3px",
                        borderBottom: "1px solid #d8dcde",
                      }}
                    >
                      Example Macro Title
                    </Col>
                    <Col xs={4} style={{ borderBottom: "1px solid #d8dcde" }}>
                      <Tooltip
                        type="dark"
                        size="small"
                        zIndex={1}
                        content="Click to preview"
                      >
                        <MacroIconButton size="small" onClick={() => {}}>
                          <EyeStrokeIcon />
                        </MacroIconButton>
                      </Tooltip>
                    </Col>
                  </Row>
                </Col>
              </StyledRow>
            </TabPanel>

            <TabPanel item={AsssitTabs.TRANSLATION}>
              <TextContainer height={210}>
                <SummaryMarkdown className="markdown">
                  <p>Static loading message for translation</p>
                </SummaryMarkdown>
                <ActionButtonWrap>
                  <ActionButtonsRight>
                    <ActionIcon
                      Icon={NotesIcon}
                      tooltipContent="Create internal note"
                      onClick={() => {}}
                    />
                    <ActionIcon
                      Icon={CopyIcon}
                      tooltipContent="Copy to clipboard"
                      onClick={() => {}}
                    />
                    <ActionIcon
                      Icon={ReloadIcon}
                      iconIsPrimary
                      tooltipContent="Regenerate"
                      onClick={() => {}}
                    />
                  </ActionButtonsRight>
                </ActionButtonWrap>
              </TextContainer>
            </TabPanel>
          </Tabs>
        </Col>
        <Col>
          <Heading isCenter>Suggested Response</Heading>
          <TextContainer
            color="primary"
            hasShadows
            height={230}
            style={{ display: "block" }}
          >
            <p>Static loading message for suggested response</p>
            <ActionButtonWrap>
              <ActionButtonsRight>
                <ActionIcon
                  disabled
                  Icon={TranslationIcon}
                  tooltipContent="Translate"
                />
                <ActionIcon
                  Icon={CopyIcon}
                  tooltipContent="Copy to clipboard"
                  onClick={() => {}}
                />
                <Button onClick={() => {}} disabled={false}>
                  Paste Into Text Editor
                </Button>
              </ActionButtonsRight>
            </ActionButtonWrap>
          </TextContainer>
        </Col>
      </Row>
    </Grid>
    </>
  );
}
