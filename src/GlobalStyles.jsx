import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body{
    margin:0;
    padding:0;
  }


  h1, h2, h3,p,div{
    margin:0;
    padding:0;
  }

  ::-webkit-scrollbar {
	display:none /* Chrome , Safari , Opera */
}
`;

export default GlobalStyles;
