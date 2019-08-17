import React from "react";
import { Layout, MenuBlock } from "../components/common";

const menuItems = [
  {
    label: "QUIZZES",
    rotate: -3,
    to: "/quizzes",
    color: "white",
    gradient: `
    background: #f857a6; 
    background: -webkit-linear-gradient(to right, #ff5858, #f857a6);  
    background: linear-gradient(to right, #ff5858, #f857a6); 

    `,
  },
  {
    label: "COMMUNITY",
    rotate: -3,
    to: "/communities",
    color: "darkmagenta",
    gradient: `
    background: #2193b0;
    background: -webkit-linear-gradient(to right, #6dd5ed, #2193b0);
    background: linear-gradient(to right, #6dd5ed, #2193b0); 
    
    `,
  },
  {
    label: "NEWSLETTERS",
    to: "/newsletters",
    color: "#005075",
    gradient: `
    background: #ffb347;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #ffcc33, #ffb347);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #ffcc33, #ffb347); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    `,
  },
  {
    label: "PODCASTS",
    to: "/podcasts",
    color: "#333",
    gradient: `
    background: #1D976C;  
    background: -webkit-linear-gradient(to right, #93F9B9, #1D976C);  
    background: linear-gradient(to right, #93F9B9, #1D976C);`,
  },

  {
    label: "BUZZWORDS",
    to: "/buzzwords",
    color: "yellow",
    gradient: `
    background: #614385; 
    background: -webkit-linear-gradient(to right, #516395, #614385); 
    background: linear-gradient(to right, #516395, #614385); 
    `,
  },
  {
    label: "ABOUT",
    to: "/about-site",
    color: "#222",
    gradient: `
    // background: #f2709c; 
    // background: -webkit-linear-gradient(to right, #ff9472, #f2709c);  
    // background: linear-gradient(to right, #ff9472, #f2709c); 
    background: #fc4a1a;
    background: -webkit-linear-gradient(to right, #f7b733, #fc4a1a);
    background: linear-gradient(to right, #f7b733, #fc4a1a);
    `,
  },
  {
    label: "CONTACT",
    to: "/contact",
    color: "#dadada",
    gradient: `
    background: #000000;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #434343, #000000);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #434343, #000000); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    `,
  },
];

const App = () => (
  <Layout
    maxWidth="1200px"
    bg="#f0f6ff"
    title="Fluky.dev"
    titleTemplate="Fluky.dev | Front End Developers"
    keywords={[
      "fluky",
      "fluky.dev",
      "dev",
      "developers",
      "coders",
      "javascript",
      "typescript",
      "html",
      "css",
      "quiz",
      "quizzes",
      "resources",
      "tips",
    ]}
    description="A collection of resources for front end developers. Coding quizzes, podcasts, newsletters, and more!"
  >
    <div
      css={`
        padding: 20px;
        text-align: center;
      `}
    >
      <div
        css={`
          padding: 4px;
          display: inline-block;
          margin-bottom: 50px;
        `}
      >
        <h1
          css={`
            color: ${props => props.theme.gray4};
            text-align: center;
            font-family: Barriecito;
            font-size: 2rem;
            line-height: 2.3rem;
          `}
        >
          Resources for{" "}
          <span
            css={`
              color: ${props => props.theme.pink};
              padding: 0px 3px;
              display: inline-block;
              font-weight: bold;

              // @media (min-width: 500px) {
              //   background: yellow;
              // }
            `}
          >
            Front End Developers
          </span>
        </h1>
      </div>

      <div
        css={`
          margin: 0px;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
        `}
        role="navigation"
      >
        {menuItems.map(({ to, color, gradient, label }, index) => {
          const rotateValue = index % 2 ? 3 : -3;
          return (
            <MenuBlock
              key={label}
              rotate={rotateValue}
              to={to}
              color={color}
              gradient={gradient}
              index={index}
            >
              {label}
            </MenuBlock>
          );
        })}
      </div>
    </div>
  </Layout>
);

export default App;
