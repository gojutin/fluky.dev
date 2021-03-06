import React from "react";
import styled from "styled-components";
import useMedia from "../hooks/useMedia";
import useReadMore from "../hooks/useReadMore";
import Heading from "./heading";
import MarkdownBody from "./markdown-body";
import Divider from "./divider";
import Tag from "./tag";
import VisitWebsiteButton from "./visit-website-button";

const SmallThumbnail = styled.img<{ isMobile: boolean }>`
  border-radius: 10px;
  margin-right: ${props => (props.isMobile ? "0px" : "20px")};
  height: auto;
  margin-bottom: ${props => (props.isMobile ? "20px" : "0px")};
  width: 100px;
  background-color: #f5f5f5;
`;

const LargeThumbnail = styled.img`
  border-radius: 2px;
  margin-right: 10px;
  height: auto;
  width: 25px;
  height: 25px;
  background-color: #f5f5f5;
  float: left;
`;

const ProviderName = styled.small`
  font-size: 12px;
  color: ${props => props.theme.gray4};
  margin-left: 8px;
`;

const LI = styled.li<{ isMobile: boolean }>`
  display: flex;
  margin: 15px 0px;
  padding: 10px 0px;
  flex-direction: ${props => (props.isMobile ? "column" : "row")};
  align-items: ${props => (props.isMobile ? "flex-start" : "flex-start")};
`;

const Tags = styled.div`
  display: flex;
  align-items: center;
  margin-top: 12px;
  flex-wrap: wrap;
`;

interface ListItemProps {
  thumbnail?: string;
  title: string;
  description: string;
  url: string;
  tags: string[];
  isSmallImage?: boolean;
  provider?: string;
}
export const ListItem: React.FC<ListItemProps> = ({
  thumbnail,
  title,
  description = "",
  url,
  tags,
  isSmallImage,
  provider,
}) => {
  const [descriptionSnippet, ReadMoreButton] = useReadMore(description);
  const { isMobile } = useMedia();

  const maybeRenderSmallThumbnail = thumbnail && !isSmallImage && (
    <SmallThumbnail
      src={thumbnail}
      alt={`Thumbnail for ${title}`}
      isMobile={isMobile}
    />
  );

  const maybeRenderLargeThumbnail = thumbnail && isSmallImage && (
    <LargeThumbnail src={thumbnail} alt={`Thumbnail for ${title}`} />
  );

  const renderTags = tags.map(tag => {
    return <Tag key={tag}>{tag}</Tag>;
  });

  return (
    <>
      <LI isMobile={isMobile}>
        {maybeRenderSmallThumbnail}

        <div>
          {maybeRenderLargeThumbnail}
          <Heading>
            {title}
            {provider && <ProviderName>{provider}</ProviderName>}
          </Heading>

          <MarkdownBody md={descriptionSnippet} />
          <ReadMoreButton />

          <Tags>
            <VisitWebsiteButton url={url} />
            {tags && renderTags}
          </Tags>
        </div>
      </LI>
      <Divider />
    </>
  );
};

export default ListItem;
