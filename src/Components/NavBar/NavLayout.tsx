import React, { useState } from 'react';
import Layout from '../Common/Layout';
import styled from 'styled-components';
import { LG, MD } from '@zendeskgarden/react-typography';
import { ReactComponent as ChevronUp } from "@zendeskgarden/svg-icons/src/16/chevron-up-fill.svg";
import { ReactComponent as ChevronDown } from "@zendeskgarden/svg-icons/src/16/chevron-down-fill.svg";
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  height: calc(100vh + 40px);
  width: 100vw;
  padding-left: 60px;
  padding-right: 30px;
`;

const NavLeftPanel = styled.div`
  width: 300px;
  background-color: rgb(1, 43, 48);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 40px;
  height: calc(100vh);
  border: 1px solid #e0e0e0;
  border-left: none;
  border-top: none;
`;

const Folder = styled.div`
  color: #fff;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`;

const NavItem = styled.div`
  color: #fff;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`;


const MenuItem = styled.div`
  color: #bbb;
  padding-left: 16px;
  cursor: pointer;
`;

function NavLayout() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <Layout>
        <Container>
            <NavLeftPanel>
              <NavItem style={{marginTop: '50px'}} onClick={() => navigate('/navbar/getting-started')}><MD>Getting Started</MD></NavItem>
                <Folder onClick={() => setIsSettingsOpen(prev => !prev)}>
                   <MD>Settings</MD>  
                    <span>{isSettingsOpen ? <ChevronUp/> : <ChevronDown/>}</span>
                </Folder>
                {isSettingsOpen && (
                    <>
                        <MenuItem onClick={() => navigate('/navbar/policy-engine')}><MD>Policy Engine</MD></MenuItem>
                        <MenuItem onClick={() => navigate('/navbar/assist-brand-settings')}><MD>Assist Brand Settings</MD></MenuItem>
                    </>
                )}
            </NavLeftPanel>
        </Container>
    </Layout>
  );
}

export default NavLayout;
