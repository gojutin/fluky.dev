import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { Link } from "gatsby";
import Icon from "../Icon";
import MenuBlock from "./menu-block";
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
  red: "#f5222d",
  orange: "#f08b32",
};

interface LayoutProps {
  bg?: string;
  maxWidth?: string;
  title: string;
  keywords: string[];
  description: string;
}
const Layout: React.FC<LayoutProps> = ({
  children,
  bg,
  maxWidth,
  title,
  keywords,
  description,
}) => {
  // const data = useStaticQuery(graphql`
  //   query SiteTitleQuery {
  //     site {
  //       siteMetadata {
  //         title
  //         description
  //       }
  //     }
  //   }
  // `);

  return (
    <>
      <SEO title={title} keywords={keywords} description={description} />
      <ThemeProvider theme={theme}>
        <div
          css={`
            width: 100%;
            max-width: 100%;
            height: 100%;
            min-height: 100vh;
            margin: 0;
            padding: 0;
            background: ${bg || "white"};
            padding-bottom: 100px;
          `}
        >
          <header
            css={`
              padding: 0px 20px;
              height: 50px;
              display: flex;
              align-items: center;
              justify-content: flex-end;
              background: inherit;
            `}
          >
            <MenuBlock rotate={2} gradient={``}>
              <Link to="/">
                <div
                  css={`
                    color: #e83feb;
                    font-family: "Barriecito";
                    margin: 0;
                  `}
                >
                  <span
                    css={`
                      color: ${props => props.theme.lightblue};
                    `}
                  >
                    FLUKY
                  </span>
                  <span>.DEV</span>
                  <Icon />
                </div>
              </Link>
            </MenuBlock>
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
