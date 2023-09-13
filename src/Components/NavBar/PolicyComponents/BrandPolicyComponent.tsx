import { Col, Row } from '@zendeskgarden/react-grid';
import React, { useState } from 'react';
// Import other necessary components and styles
import AccordionComponent from './AccordionComponent';

function BrandPolicyComponent( ) {
  const [openAccordions, setOpenAccordions] = useState<any>({});

  const currentItems = [
    {
    id: '1',
      entry_id: 2,
      question: 'What is the weather today?',
      usage_count: 5,
      enabled: true,
      answer: 'The weather today is sunny.',
      source: 'Weather API',
      source_metadata: {
        id: 1,
        title: 'Weather API',
        html_url: 'https://example.com',
      },
      last_updated_at: "2023-09-13T13:26:00.398Z",
      last_updated_by: 'Admin',
    },
    // ... add more items similarly
  ];

  const handleAccordionToggle = (id: number) => {
    setOpenAccordions((prev: any) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleDeleteQuestion = (id: number) => {
    console.log('Delete question with id:', id);
  };

  const handleEnableEntry = (id: string, question: string, answer: string,  bool: boolean) => {
    console.log('Enable entry with id:', id, 'bool:', bool);
  };

  // ...other static data and mock functions

  return (
    <>
      {/* ... The rest of your code with static notificationStatus, 
        questionModalVisible, handleSearch, searchLoading, and other states and functions */}

      <div style={{ minHeight: '991.25px' }}>
        {/* ... replace searchLoading and lazyLoad with static boolean values */}
        
        {currentItems && currentItems.map((KnowledgeEntry) => (
          <Row justifyContent="center" key={KnowledgeEntry.entry_id}>
            <Col size={10}>
              <AccordionComponent
                entry_id={KnowledgeEntry.id}
                question={KnowledgeEntry.question}
                usage_count={KnowledgeEntry.usage_count}
                enabled={KnowledgeEntry.enabled}
                answer={KnowledgeEntry.answer}
                source={KnowledgeEntry.source}
                source_metadata={KnowledgeEntry.source_metadata}
                last_updated_at={KnowledgeEntry.last_updated_at}
                last_updated_by={KnowledgeEntry.last_updated_by}
                onDelete={() => {
                  handleDeleteQuestion(KnowledgeEntry.entry_id);
                }}
                onEnable={(bool) => {
                  handleEnableEntry(
                    KnowledgeEntry.id,
                    KnowledgeEntry.question,
                    KnowledgeEntry.answer,
                    bool,
                  );
                }}
                isOpen={openAccordions[KnowledgeEntry.entry_id] || false}
                onOpen={() => handleAccordionToggle(KnowledgeEntry.entry_id)}
                timezone={'UTC'}  // replace with a static value or an actual variable holding user timezone
              />
            </Col>
          </Row>
        ))}
        {currentItems?.length === 0 && (
          <Row justifyContent="center">
            <Col size={10}>No questions found.</Col>
          </Row>
        )}
      </div>
    </>
  );
}

export default BrandPolicyComponent;
