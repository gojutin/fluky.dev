import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { useStaticQuery, graphql, Link } from "gatsby";
import SEO from "./seo";
import "./layout.css";

const Container = styled.div<{ maxWidth?: string }>`
  margin: 0 auto;
  max-width: ${props => props.maxWidth || "960px"};
  padding: 20px;
`;

const theme = {
  blue: "#0066B8",
  lightblue: "#329bf0",
  antgreen: "rgb(82, 196, 26)",
  lightgreen: "#93ff61",
  gray1: "#f5f5f5",
  gray2: "#efefef",
  gray3: "#dadada",
  gray4: "#666",
  gray5: "#333",
  red: "#e3005f",
  orange: "#f08b32",
};

interface LayoutProps {
  bg?: string;
  maxWidth?: string;
}
const Layout: React.FC<LayoutProps> = ({ children, bg, maxWidth }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `);

  return (
    <>
      <SEO
        title={data.site.siteMetadata.title}
        keywords={[`typescript`, `quiz`, `javascript`, `front end`]}
      />
      <ThemeProvider theme={theme}>
        <div
          css={`
            height: 100%;
            min-height: 100vh;
            width: 100%;
            background: ${bg || "white"};
          `}
        >
          <header
            css={`
              padding: 10px;
              display: flex;
              align-items: center;
              justify-content: center;

              background: #333;
            `}
          >
            <Link to="/">
              {" "}
              <h1
                css={`
                  color: ${props => props.theme.lightblue};
                  font-family: "Barriecito";
                  margin: 0;
                `}
              >
                <b>DEV STUFF 💫</b>
              </h1>
            </Link>
          </header>
          <Container maxWidth={maxWidth}>
            <main>{children}</main>
          </Container>
        </div>
      </ThemeProvider>
    </>
  );
};

export default Layout;
