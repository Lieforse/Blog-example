const initialState = {
  articles: [],
  filteredArticles: [],
  comments: [],
  detailArticle: {},
  appliedSortMethod: "",
};

const articlesReducer = (state = initialState, action) => {
  if (action.type === "DATA_LOADED_ARTICLES") {
    if (!localStorage.getItem("views")) {
      let views = [];
      action.articles.map((item) =>
        views.push({ [item.id]: Math.ceil(Math.random() * 100) })
      );
      let serialObj = JSON.stringify(views);
      localStorage.setItem("views", serialObj);
    }
    if (localStorage.getItem("articles")) {
      console.log("got articles from LS");
      let articles = JSON.parse(localStorage.getItem("articles"));
      return Object.assign({}, state, {
        articles: articles,
        filteredArticles: articles,
      });
    } else {
      return Object.assign({}, state, {
        articles: action.articles,
        filteredArticles: action.articles,
      });
    }
  }
  if (action.type === "DATA_LOADED_COMMENTS") {
    return Object.assign({}, state, {
      comments: action.comments,
    });
  }
  if (action.type === "DATA_LOADED_DETAIL_ARTICLE") {
    return Object.assign({}, state, {
      detailArticle: action.article,
    });
  } else if (action.type === "SORT_ARTICLES") {
    let newState = JSON.parse(JSON.stringify(state));
    let sortFilter = action.sortFilter;
    newState.appliedSortMethod = sortFilter;
    console.log(newState.filteredArticles);

    if (sortFilter === "Sort by popularity") {
      newState.filteredArticles.sort((a, b) => {
        let views = JSON.parse(localStorage.getItem("views"));
        console.log(views);
        let aViews = Number(views[a.id - 1][a.id]);
        let bViews = Number(views[b.id - 1][b.id]);
        console.log("aViews ", aViews);
        console.log("bViews ", bViews);

        console.log(aViews - bViews);

        return bViews - aViews;
      });
    } else if (sortFilter === "Sort by latests") {
      newState.filteredArticles.sort((a, b) => b.id - a.id);
    } else if (sortFilter === "Sort by comments: High to Low") {
      newState.filteredArticles.sort((a, b) => {
        let aCommentsCounter = 0;
        state.comments.map((item) =>
          item.postId === a.id ? ++aCommentsCounter : false
        );
        let bCommentsCounter = 0;
        state.comments.map((item) =>
          item.postId === b.id ? ++bCommentsCounter : false
        );

        return aCommentsCounter - bCommentsCounter;
      });
    } else if (sortFilter === "Sort by comments: Low to High") {
      newState.filteredArticles.sort((a, b) => {
        let aCommentsCounter = 0;
        state.comments.map((item) =>
          item.postId === a.id ? ++aCommentsCounter : false
        );
        let bCommentsCounter = 0;
        state.comments.map((item) =>
          item.postId === b.id ? ++bCommentsCounter : false
        );
        return bCommentsCounter - aCommentsCounter;
      });
    } else {
      newState.filteredArticles.sort((a, b) => a.id - b.id);
    }
    return newState;
  } else return state;
};

export default articlesReducer;
