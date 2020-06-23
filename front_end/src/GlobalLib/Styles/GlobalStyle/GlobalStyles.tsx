import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

interface GlobalStyleProps {
  theme: any;
}
export default createGlobalStyle<GlobalStyleProps>`
  ${reset};
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600,700');
  * {
    box-sizing: border-box;
  }
  body {
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.balckColor};
    font-size: 1rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  textarea {
    font-size: 1rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  a {
    color: ${(props) => props.theme.blueColor};
    text-decoration: none;
  }
  input:focus{
    outline:none;
  }
  img {
    border: 0;
  }
`;