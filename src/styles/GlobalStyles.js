import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  ul, li {
    list-style: none;
  }

  button {
    border: 0;
    background-color: inherit;
    cursor: pointer;
  }

  .drop_shadow_2 {
    box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.2);
  }
  .drop_shadow_6 {
    box-shadow: 0px 3px 12px 3px rgba(0, 0, 0, 0.2);
  }
  .inner_shadow {
    box-shadow: 0px 1px 3px 1px rgba(0, 0, 0, 0.25);
  }
`;

export default GlobalStyles;