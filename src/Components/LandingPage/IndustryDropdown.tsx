import styled from 'styled-components';
import React from 'react';
import { Dropdown, Menu as MenuBase, Item as ItemBase, Select as SelectBase, Field as FieldBase, Label } from '@zendeskgarden/react-dropdowns';

interface IndustryProps {
    rotated: boolean | undefined;
    onRotateChange: (value: boolean | undefined) => void;
    onSelect: (value: string) => void;
  }
    
interface IItem {
  label: string;
  value: string;
}


  
  interface IndustryDropdownProps {
    selectedItem: IItem;
    handleSelect: (item: any) => void;
  }

  // Styled components
const Menu = styled(MenuBase)`
/* Your styles for the Menu component */
background-color: #f9f9f9;
`;

const Item = styled(ItemBase)`
/* Your styles for the Item component */
&:hover {
  background-color: #e6e6e6;
}
`;

const Select = styled(SelectBase)`
/* Your styles for the Select component */
width: 100%;
border: 2px solid #470c42;
border-radius: 4px;
background-color: #ffeefd;
`;

const Field = styled(FieldBase)`
`;
 export const industryItems: IItem[] = [
    { label: 'Education', value: 'education' },
    { label: 'Ecommerce', value: 'ecommerce' },
    { label: 'Energy/Utilities', value: 'energy' },
    { label: 'Entertainment', value: 'entertainment' },
    { label: 'Finance', value: 'finance' },
   // { label: 'Government', value: 'government' },
   // { label: 'Real Estate', value: 'realestate' },
   // { label: 'Retail', value: 'retail' },
   // { label: 'Technology/Software', value: 'software' },
   // { label: 'Telecommunications', value: 'telecommunications' },
   // { label: 'Travel/Hospitality', value: 'travel' },
  ];


  const IndustryDropdown = ({ selectedItem, handleSelect }: IndustryDropdownProps) => {
    return (
      <div style={{marginBottom: '15px', width: '100%'}}>
        <Dropdown
          selectedItem={selectedItem}
          onSelect={(item) => {
            handleSelect(item.value);
          }}
          downshiftProps={{ itemToString: (item: IItem) => (item ? item.label : '') }}
        >
          <Field>
            <Label>Select an Industry</Label>
            <Select>{selectedItem.label}</Select>
          </Field>
          <Menu>
            {industryItems.map((option) => (
              <Item key={option.value} value={option}>
                {option.label}
              </Item>
            ))}
          </Menu>
        </Dropdown>
      </div>
    );
  };
  
  export default IndustryDropdown;
  