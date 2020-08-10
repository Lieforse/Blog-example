export const fetchData = () => {
  return (dispatch) => {
    fetch("https://jsonplaceholder.typicode.com/posts/")
      .then((response) => response.json())
      .then((response) =>
        dispatch({ type: "DATA_LOADED_ARTICLES", articles: response })
      )
      .then(
        fetch("https://jsonplaceholder.typicode.com/comments/")
          .then((response) => response.json())
          .then((response) =>
            dispatch({ type: "DATA_LOADED_COMMENTS", comments: response })
          )
      );
  };
};

export const fetchComments = () => {
  return (dispatch) => {
    fetch("https://jsonplaceholder.typicode.com/comments/")
      .then((response) => response.json())
      .then((response) =>
        dispatch({ type: "DATA_LOADED_COMMENTS", comments: response })
      );
  };
};

export const fetchDetailData = (id) => {
  return (dispatch) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => response.json())
      .then((response) =>
        dispatch({ type: "DATA_LOADED_DETAIL_ARTICLE", article: response })
      );
  };
};

export const sortArticles = (sortFilter) => {
  return {
    type: "SORT_ARTICLES",
    sortFilter,
  };
};
