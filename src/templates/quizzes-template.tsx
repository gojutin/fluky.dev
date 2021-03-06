import React, { useState } from "react";
import { Link } from "gatsby";
import ListLayout from "../components/list-layout";
import ListItem from "../components/list-item";
import Search from "../components/search";
import Heading from "../components/heading";
import { QuizPreviewItem } from "../components/quiz-preview-item";

const Quiz: React.FC = props => {
  const [filter, setFilter] = useState("");
  const { quizzes } = props.pageContext;
  const { otherQuizzes } = props.pageContext;

  const filteredQuizzes = quizzes.filter(({ node }) => {
    if (node.data.Name.toLowerCase().includes(filter.toLowerCase())) {
      return true;
    }
    return false;
  });

  const filteredOtherQuizzes = otherQuizzes.filter(quiz => {
    if (
      (quiz.title && quiz.title.toLowerCase().includes(filter.toLowerCase())) ||
      (quiz.description &&
        quiz.description.toLowerCase().includes(filter.toLowerCase())) ||
      (quiz.tag && quiz.tag.toLowerCase().includes(filter.toLowerCase()))
    ) {
      return true;
    }
    return false;
  });

  return (
    <ListLayout
      title="Dev Quizzes"
      description="Front end developer quizzes. JavaScript, TypeScript, HTML, CSS, and more."
      keywords={["quiz", "quizzes"]}
      type="quizzes"
      pathname="/quizzes"
    >
      <Search onChange={setFilter} />
      <small
        css={`
          padding-left: 10px;
        `}
      >
        Showing {filteredQuizzes.length + filteredOtherQuizzes.length} of{" "}
        {otherQuizzes.length + quizzes.length}
      </small>
      <div>
        <div
          css={`
            display: flex;
            flex-wrap: wrap;
            padding-top: 20px;
            margin-top: 20px;
            justify-content: center;
          `}
        >
          {filteredQuizzes.map(({ node }) => {
            return <QuizPreviewItem key={node.data.Name} data={node.data} />;
          })}
        </div>
      </div>
      <br />
      <h3
        css={`
          text-transform: uppercase;
        `}
      >
        Other Community Quizzes
      </h3>
      <ul>
        {filteredOtherQuizzes.map(site => {
          return (
            <ListItem
              key={site.url}
              title={site.title}
              description={site.description}
              url={site.url}
              provider={site.provider}
              tags={site.tags}
            />
          );
        })}
      </ul>
    </ListLayout>
  );
};

export default Quiz;
