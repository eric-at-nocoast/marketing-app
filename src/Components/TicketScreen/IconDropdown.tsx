import React, { useRef, useState, useEffect } from 'react';
import debounce from 'lodash.debounce';
import { Item, Menu, Label, Field, Dropdown, Autocomplete } from '@zendeskgarden/react-dropdowns';
import { Row, Col } from '@zendeskgarden/react-grid';
import { ReactComponent as UserIcon } from '@zendeskgarden/svg-icons/src/16/user-circle-fill.svg';
import styled from 'styled-components';


const StyledAutocomplete = styled(Autocomplete)`
  display: flex;
  align-items: center;
`;

const IconDropDown = ({ options = [
  'Luke Skywalker',
], label = "Requester", startIcon: StartIcon = UserIcon }) => {
  const [selectedItem, setSelectedItem] = useState(options[0]);
  const [inputValue, setInputValue] = useState('');
  const [matchingOptions, setMatchingOptions] = useState(options);

  /**
   * Debounce filtering
   */
  const filterMatchingOptionsRef = useRef(
    debounce((value) => {
      const matchedOptions = options.filter(
        option => option.trim().toLowerCase().indexOf(value.trim().toLowerCase()) !== -1
      );

      setMatchingOptions(matchedOptions);
    }, 300)
  );

  useEffect(() => {
    filterMatchingOptionsRef.current(inputValue);
  }, [inputValue]);

  return (
    <Row justifyContent="center">
      <Col>
        <Dropdown
          
          inputValue={inputValue}
          selectedItem={selectedItem}
          onSelect={item => setSelectedItem(item)}
          onInputValueChange={value => setInputValue(value)}
          downshiftProps={{ defaultHighlightedIndex: 0 }}
        >
          <Field>
            <Label>{label}</Label>
            <StyledAutocomplete disabled start={<StartIcon />}>{selectedItem}</StyledAutocomplete>
          </Field>
          <Menu>
            {matchingOptions.length ? (
              matchingOptions.map(option => (
                <Item key={option} value={option}>
                  <span>{option}</span>
                </Item>
              ))
            ) : (
              <Item disabled>No matches found</Item>
            )}
          </Menu>
        </Dropdown>
      </Col>
    </Row>
  );
};

export default IconDropDown;
