
import React from 'react';
import { Row, Col } from '@zendeskgarden/react-grid';
import { Field, Label } from '@zendeskgarden/react-forms';
import { Tag } from '@zendeskgarden/react-tags';
import { Well } from '@zendeskgarden/react-notifications';



const TagWell = ({ tags }: { tags: string[] }) => {
    return (
        <Row justifyContent="center">
            <Col>
                <Field>
                    <Label>Tags</Label>
                        <div style={{ maxHeight: '250px', overflow: 'auto' }}>
                            <Well>
                                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                    {tags.map((tag: string) => (
                                        <Tag
                                            key={btoa(tag)}
                                            id={tag}
                                            style={{ margin: '5px', justifyContent: 'flex-start' }}
                                            tabIndex={0}
                                        >
                                            <span>{tag}</span>
                                        </Tag>
                                    ))}
                                </div>
                            </Well>
                        </div>
                </Field>
            </Col>
        </Row>
    )
}

export default TagWell;
