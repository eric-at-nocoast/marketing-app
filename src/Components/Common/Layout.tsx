import styled, { createGlobalStyle } from "styled-components";
import StyloIcon from "../ticketScreen/StyloIcon";
import { useNavigate } from "react-router-dom";
import { ReactNode } from "react";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    overflow: hidden;
  }
`;

const TopRow = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: flex-end;
  padding: 10px 15px;
  padding-left: 0px;
  padding-top: 0px;
  background-color: #f7f9fc; 
  position: absolute;
  border-bottom: 1px solid #e0e0e0; 
`;


const MainNavigationPanel = styled.div`
background-color: #03363D;
  display: block;
  justify-content: center;
  position: absolute;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  width: 60px;
  z-index: 1500;
`


const TabContainer = styled.div`
  display: flex;
  width: 100%;
  padding-left: 50px;
  z-index: 1000;
`;

const Tab = styled.div`

max-width: 240px;
height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 1 0px;
  background: #f0f0f0;
  border: 1px solid #e0e0e0;
}
  &:hover {
    background-color: #F3EEFF; 

  }
`;

const NavigationIconWrapper = styled.div`
  position: relative;
  top: 80px;
`;


function truncateText(text: string, length: number) {
    return text.length > length ? text.substring(0, length) + "..." : text;
  }

function Layout({ children }: {children: ReactNode} ) {
    const navigate = useNavigate();

    return (
      <main style={{    
        height: '100vh',
        width: '100vw'
        }}>
        <GlobalStyle />
        <TopRow>
          <TabContainer>
            <Tab onClick={() => navigate('/')}><StyloIcon fill='#000000' marginValue='8px'/>{truncateText('Pick a new industry', 22)}</Tab>
          </TabContainer>
        </TopRow>
        <MainNavigationPanel>
          <NavigationIconWrapper  onClick={() => navigate('/navbar')}>
            <StyloIcon fill="#FFFFFF" size='24px' />
          </NavigationIconWrapper>
        </MainNavigationPanel>
        <div>
        {children}
        </div>
      </main>
    );
  }
  
  export default Layout