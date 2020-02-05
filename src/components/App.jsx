import React, { PureComponent } from 'react';
import 'antd/dist/antd.css';
import styledNormalize from 'styled-normalize';
import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components/macro';

const GlobalStyle = createGlobalStyle`
  ${styledNormalize}
  
  body {
    background-color: #0f8ee9;
  }

  * {
    box-sizing: border-box;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  ul,
  ol,
  li {
    display: block;
    padding: 0;
    margin: 0;
  }
`;

const StyledBox = styled.div`
  max-width: 400px;
  padding: 20px;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0px 15px 35px rgba(0, 0, 0, 1);
`;

class App extends PureComponent {
  render() {
    return (
      <>
        <GlobalStyle />
        <StyledBox>Форма</StyledBox>
      </>
    );
  }
}

export default App;
