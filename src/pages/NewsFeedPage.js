import { NewsCard } from "../components";
import { apiUrl } from "../config/constants";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";

const NewsFeedPage = () => {
  const [articlesArray, setArticlesArray] = useState("");

  useEffect(() => {
    try {
      const getArticles = async () => {
        const response = await axios.get(
          `${apiUrl}/articles`
          // `https://newsapi.org/v2/top-headlines?country=us&apiKey=aaf8f6c86f4a47c68ae027348fd6b41a`
        );
        // console.log(response.data.articles);
        // setArticlesArray(response.data.articles);
        setArticlesArray(response.data);
      };
      getArticles();
    } catch (e) {
      console.log(e.message);
    }
  }, []);

  return (
    <Container>
      <h1 style={{ margin: "3rem", textAlign: "center" }}>
        Secondhand News Feed{" "}
      </h1>

      {articlesArray
        ? articlesArray.map((article, i) => (
            <NewsCard
              key={i}
              title={article.title}
              imageUrl={article.urlToImage}
              content={article.content}
              url={article.url}
            />
          ))
        : "loading..."}
    </Container>
  );
};

export { NewsFeedPage };

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-right: auto;
  margin-left: auto;
  max-width: 1300px;
`;
