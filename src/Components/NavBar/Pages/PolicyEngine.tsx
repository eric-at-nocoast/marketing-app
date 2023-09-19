import React, { useState } from 'react';
import { Col, Grid, Row } from '@zendeskgarden/react-grid';
import { Tab, TabList, TabPanel, Tabs } from '@zendeskgarden/react-tabs';
import { XXL } from '@zendeskgarden/react-typography';
import NavLayout from '../../layouts/NavBar/NavLayout'
import BrandPolicyComponent from '../PolicyComponents/BrandPolicyComponent';

export default function PolicyEngine() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState('tab-0');

  const staticStyloData = {
    zendesk: {
      masquerade: false,
      subdomain: 'staticSubdomain',
      currentUser: 'staticUser',
    },
  };

  const staticBrandsResponse = {
    brands: [
      {
        subdomain: 'staticBrand1',
        name: 'Static Brand 1',
        has_help_center: true,
        default: true,
      },
      {
        subdomain: 'staticBrand2',
        name: 'Static Brand 2',
        has_help_center: false,
        default: false,
      },
    ],
  };

  const staticBrandAssistSettings = {
    staticBrand1: {
      analyzeKnowledgebase: true,
    },
    staticBrand2: {
      analyzeKnowledgebase: false,
    },
    accountSettings: {
      analyzeKnowledgebase: true,
    },
  };

  const sortedBrands = [...staticBrandsResponse.brands].sort((a, b) => (b.default === true ? 1 : -1));

  return (
    <NavLayout>
            <Grid>
            <XXL isBold style={{ marginBottom: '25px' }}>
              Policy and Knowledge Center
            </XXL>
            <Tabs selectedItem={selectedTab} onChange={setSelectedTab}>
              <Row justifyContent="center">
                <Col size={10} style={{ marginBottom: '10px' }}>
                  <TabList style={{ overflowX: 'auto' }}>
                    {sortedBrands.map((brand, index) => (
                      <Tab key={brand.subdomain} item={`tab-${index}`}>
                        {brand.name}
                      </Tab>
                    ))}
                  </TabList>
                </Col>
              </Row>
              {sortedBrands.map((brand, index) => (
                <TabPanel key={brand.subdomain} item={`tab-${index}`}>
                  {/* Replace BrandPolicyComponent with your actual component import */}
                  <BrandPolicyComponent
            />
                </TabPanel>
              ))}
            </Tabs>
          </Grid>
    </NavLayout>
  );
}
