import React, { useState, useEffect, useRef } from "react";
import { graphql } from "gatsby";
import QuizQuestion from "../components/quiz-question";
import shuffle from "lodash/shuffle";
import Markdown from "../components/markdown";
import QuizButton from "../components/quiz-button";
import { motion, AnimatePresence } from "framer-motion";
import QuizResults from "../components/quiz-results";
import Title from "../components/title";
import Layout from "../components/layout";
import LastUpdated from "../components/last-updated";
import Progress from "../components/progress";

const getFeedbackCorrect = () => {
  const options: string[] = [
    "Correct!",
    "Nailed it!",
    "Good job!",
    "Way to go!",
    "Great job!",
    "Well done!",
    "Excellent!",
  ];
  const len = options.length;
  const randomIndex = Math.floor(Math.random() * len);
  return options[randomIndex];
};

const getFeedbackIncorrect = () => {
  const options: string[] = [
    "That's Incorrect.",
    "So close.",
    "Not quite.",
    "Better luck next time.",
    "Too bad.",
    "Nope, that's incorrect.",
  ];
  const len = options.length;
  const randomIndex = Math.floor(Math.random() * len);
  return options[randomIndex];
};

const keycodeMap = {
  49: "1",
  50: "2",
  51: "3",
  52: "4",
};

const keywords = ["quiz", "quizzes"];

const Page = ({ data, pageContext }) => {
  const description =
    "`Test your ${pageContext.title} knowledge with our ${pageContext.title} Quiz.`";
  const title = `${pageContext.title} Quiz`;
  if (!data.allAirtable.edges.length) {
    return (
      <Layout title={title} keywords={keywords} description={description}>
        <Title>{pageContext.title} Quiz</Title>
        <h2>Looks like there are no questions for this category yet.</h2>
      </Layout>
    );
  }

  const [shuffledQuestions] = useState(shuffle(data.allAirtable.edges));
  const [isQuestionAnswered, setIsQuestionAnswered] = useState(false);
  const isQuestionAnsweredRef = useRef(false);
  const [userAnswer, setUserAnswer] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(
    shuffledQuestions[0].node
  );
  const [questionsAnsweredCorrectly, setQuestionsAnsweredCorrectly] = useState(
    0
  );
  const [
    questionsAnsweredIncorrectly,
    setQuestionsAnsweredIncorrectly,
  ] = useState(0);

  useEffect(() => {
    isQuestionAnsweredRef.current = isQuestionAnswered;
  }, [isQuestionAnswered]);

  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  const dataLength = data.allAirtable.edges.length;

  const handleSetUserAnswer = value => {
    if (isQuestionAnswered) return;
    setUserAnswer(value);
  };

  useEffect(() => {
    setCurrentQuestion(shuffledQuestions[currentIndex].node);
  }, [currentIndex]);

  const checkAnswer = () => {
    if (!userAnswer) return;
    setIsQuestionAnswered(true);
    if (userAnswer === currentQuestion.data.Answer) {
      setQuestionsAnsweredCorrectly(v => v + 1);
    } else {
      setQuestionsAnsweredIncorrectly(v => v + 1);
    }
  };

  const handleGoToNextQuestion = () => {
    if (currentIndex === dataLength - 1) {
      setCurrentIndex(0);
      setIsQuizCompleted(true);
    } else {
      setCurrentIndex(v => v + 1);
    }
    setIsQuestionAnswered(false);
    setUserAnswer(null);
  };

  const options = [
    { id: "1", value: currentQuestion.data.Option1 },
    { id: "2", value: currentQuestion.data.Option2 },
    { id: "3", value: currentQuestion.data.Option3 },
    { id: "4", value: currentQuestion.data.Option4 },
  ].filter(option => !!option.value);

  useEffect(() => {
    document.addEventListener("keypress", e => {
      // 1,2,3,4
      if ([49, 50, 51, 52].includes(e.charCode)) {
        console.log(options.length, +e.key);
        if (options.length < +e.key) return;
        console.log("DIDNTS");
        handleSetUserAnswer(keycodeMap[e.charCode]);
      }
    });
    return document.removeEventListener("keypress", () => {});
  }, [checkAnswer, handleGoToNextQuestion]);

  const answeredCount: number =
    questionsAnsweredCorrectly + questionsAnsweredIncorrectly;
  const percentageCorrect: number = questionsAnsweredCorrectly / answeredCount;
  const percentageFixed: number | string = percentageCorrect.toFixed(2);
  const score: number = Math.floor(+percentageFixed * 100);

  if (isQuizCompleted) {
    return (
      <Layout
        title={title}
        keywords={keywords}
        description={description}
        bg="#16202b"
      >
        <Title
          css={`
            color: white;
          `}
        >
          {pageContext.title} Quiz
        </Title>

        <QuizResults
          score={score}
          correctCount={questionsAnsweredCorrectly}
          incorrectCount={questionsAnsweredIncorrectly}
        />
      </Layout>
    );
  }

  return (
    <Layout title={title} keywords={keywords} description={description}>
      <Title>{pageContext.title} Quiz</Title>
      <LastUpdated date={pageContext.lastModified} />
      <Progress
        percent={(answeredCount / data.allAirtable.edges.length) * 100}
      />

      <div
        css={`
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
          h3 {
            margin: 5px;
          }
        `}
      >
        <div>{answeredCount > 0 && <h3>Score: {score}%</h3>}</div>

        <h3>
          {answeredCount}/{data.allAirtable.edges.length}
        </h3>
      </div>

      <br />
      <QuizQuestion
        data={currentQuestion.data}
        key={currentQuestion.data.Question}
        isAnswered={isQuestionAnswered}
        userAnswer={userAnswer}
        onSelection={answer => handleSetUserAnswer(answer)}
      />
      <br />
      {isQuestionAnswered && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div>
            {userAnswer === currentQuestion.data.Answer && (
              <h2
                css={`
                  color: ${({ theme }) => theme.green};
                  margin: 10px 0px;
                `}
              >
                {getFeedbackCorrect()}
              </h2>
            )}
            {userAnswer !== currentQuestion.data.Answer && (
              <h2
                css={`
                  color: ${({ theme }) => theme.red};
                  margin: 10px 0px;
                `}
              >
                {getFeedbackIncorrect()}
              </h2>
            )}
          </div>
          <Markdown source={currentQuestion.data.Explanation} />
        </motion.div>
      )}

      {!!userAnswer && !isQuestionAnswered && (
        <QuizButton
          onClick={checkAnswer}
          initial={{ scale: 0.8, opacity: 0.3 }}
          animate={{ scale: 1.2, opacity: 1 }}
          title="Check Answer"
        />
      )}

      <AnimatePresence>
        {!!userAnswer && isQuestionAnswered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <QuizButton
              initial={{ scale: 0.8, opacity: 0.3 }}
              animate={{ scale: 1.2, opacity: 1 }}
              onClick={handleGoToNextQuestion}
              title="Continue"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Page;

export const pageQuery = graphql`
  query AllAirtableByCategory($category: String!) {
    allAirtable(
      filter: {
        table: { eq: "Questions" }
        fields: { category: { eq: $category } }
      }
    ) {
      edges {
        node {
          data {
            ID
            Type
            Difficulty
            Category
            Question
            Option1
            Option2
            Option3
            Option4
            Answer
            Explanation
          }
        }
      }
    }
  }
`;
