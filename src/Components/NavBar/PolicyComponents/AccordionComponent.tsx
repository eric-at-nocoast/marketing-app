import React, { useState } from 'react';
import styled  from 'styled-components';
import { Row, Col } from '@zendeskgarden/react-grid';
import { MD } from '@zendeskgarden/react-typography';
import { Field, Label, Toggle } from '@zendeskgarden/react-forms';
import { Well } from '@zendeskgarden/react-notifications';
import { Tooltip } from '@zendeskgarden/react-tooltips';
import { Anchor, IconButton } from '@zendeskgarden/react-buttons';
import { Tag } from '@zendeskgarden/react-tags';
import TrashStrokeIcon from '@zendeskgarden/svg-icons/src/16/trash-stroke.svg';
import format from 'date-fns/format';
import { addMinutes, parseISO } from 'date-fns';



const AccordionHeader = styled.div<{toggleEnabled: boolean}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
  padding-bottom: 15px;

    
  ::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 5px;
    background-color: ${({ toggleEnabled }) => toggleEnabled ? '#43b324' : '#87929d'};
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px; 
  }
`;

const AccordionWrapper = styled.div`
  cursor: pointer;
  width: 100%;
  border: 1px solid #e9ebed;
  border-radius: 4px;
  margin-bottom: 10px;
  padding-left: 15px;
  padding-right: 15px;
  position: relative;
`;



const AccordionContent = styled.div<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  border-top: 2px solid #e9ebed;
  padding-top: 10px;
  gap: 8px;
`;

const Chevron = styled.div<{ isOpen: boolean }>`
  display: inline-block;
  margin-top: 5px;
  margin-left: 5px;
  width: 10px;
  height: 10px;
  border-top: 2px solid currentColor;
  border-right: 2px solid currentColor;
  transform: ${(props) => (props.isOpen ? 'rotate(-45deg)' : 'rotate(135deg)')};
  transition: transform 0.3s;
`;

const ChevronContainer = styled.div`
  display: flex;
  align-content: center;
  justify-content: space-between;
  width: 70px;
`;

const formatHitCount = (count: number): string => {
  if (count < 1000) {
    return count.toString();
  }
  if (count < 10000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  if (count < 100000) {
    return `${Math.round(count / 1000)}k`;
  }
  return '99k+';
};

 interface KnowledgeEntryProps {
    entry_id: string;
    question: string;
    answer: string;
    enabled: boolean;
    source: string;
    source_metadata?: {
      id: number;
      title: string;
      html_url: string;
    };
    usage_count: number;
    last_updated_by: string;
    last_updated_at: string;
  }

 interface ManualKnowledgeEntryProps extends KnowledgeEntryProps {
    onDelete: () => void;
  }
  

export default function AccordionComponent({
  entry_id,
  question,
  usage_count,
  enabled,
  answer,
  source,
  source_metadata,
  last_updated_at,
  last_updated_by,
  onDelete,
  isOpen,
  onOpen,
  onEnable,
  timezone,
}: ManualKnowledgeEntryProps & {
  isOpen: boolean;
  onOpen: () => void;
  onEnable: (bool: boolean) => void;
  timezone: any;
}) {
  const [toggleEnabled, setToggleEnabled] = useState<boolean>(enabled);
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  const [deleteQuestion, setDeleteQuestion] = useState<boolean>(false);



  const FormattedDate = () => {
    const { offset } = timezone;
    const dateObj = parseISO(last_updated_at);
    const offsetDate = addMinutes(dateObj, offset);

    return format(offsetDate, "MMMM d, yyyy 'at' h:mmaaa");
  };

  const handleToggle = () => {
    onEnable(!toggleEnabled);
    setToggleEnabled(!toggleEnabled);
  };

  const handleAccordion = () => {
    onOpen();
  };

  if (deleteQuestion) {
    onDelete();
    setDeleteQuestion(false);
  }

  return (
    <div id={entry_id!} key={entry_id!}>
      <AccordionWrapper>
        <AccordionHeader toggleEnabled={toggleEnabled} onClick={handleAccordion}>
          <div>
          <MD
            style={{
              color: isOpen ? 'currentColor' : '#87929d',
            }}
          >
            {question}
          </MD>
          <Tooltip content="Entry's source">
            <Tag style={{marginTop: '5px'}}>
            {source === 'manual_entry' ? 'Manual Entry' : 'Help Center'}
            </Tag>
          </Tooltip>
          </div>

          <ChevronContainer>
              <div>
                <Tooltip content="Number of times used">
                  <Tag>{formatHitCount(usage_count!)}</Tag>
                </Tooltip>
              </div>
            <Chevron style={{marginLeft: '5px' }} isOpen={isOpen} />
          </ChevronContainer>
        </AccordionHeader>
        <AccordionContent isOpen={isOpen}>
          <Row style={{ marginBottom: '8px', alignItems: 'center' }}>
            <Col>
            
              <Field>
                <Toggle style={{color: toggleEnabled ? '#43b324' : '#e34f32' }} checked={toggleEnabled} onChange={handleToggle}>
                  <Label isRegular>{toggleEnabled ? 'Enabled' : 'Disabled'}</Label>
                </Toggle>
              </Field>
            </Col>
            {source === 'manual_entry' && (
              <Col textAlign="end">
                <Tooltip content="Delete Question">
                  <IconButton
                    isDanger
                    aria-label="Delete Question"
                    onClick={() => {
                      setDeleteModalVisible(true);
                    }}
                  >
                    <TrashStrokeIcon />
                  </IconButton>
                </Tooltip>
              </Col>
            )}
          </Row>
          <Row style={{ marginBottom: '8px' }}>
            <Col>
              <Well
                isRecessed
                style={{
                  backgroundColor: toggleEnabled ? `#F3EEFF` : `#e9ebed`,
                  color: '#49545C',
                }}
              >
                {answer}
              </Well>
            </Col>
          </Row>
          <Row style={{ marginBottom: '8px' }}>
            <Col>
              <Well
                style={{
                  backgroundColor: '#F8F9F9',
                  color: '#87929D',
                }}
              >
                <Row>
                  <MD isBold>Source:&nbsp;&nbsp;</MD>
                  {source === 'manual_entry' ? (
                    ` Manual Entry by ${last_updated_by}`
                  ) : (
                    <>
                      Help Center Article,&nbsp;&nbsp;
                      <Anchor isExternal href={source_metadata?.html_url}>
                        {source_metadata?.title}
                      </Anchor>
                    </>
                  )}
                </Row>
                <Row>
                  <MD isBold>Last Updated at:&nbsp;&nbsp;</MD>
                  Tuesday, 3:26pm
                </Row>
              </Well>
            </Col>
          </Row>
        </AccordionContent>
      </AccordionWrapper>
      
    </div>
  );
}
