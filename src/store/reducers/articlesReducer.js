const initialState = {
  articles: [],
  initialArticles: [],
  views: [],
  comments: [],
  detailArticle: {},
  appliedSortMethod: "",
};

const articlesReducer = (state = initialState, action) => {
  if (action.type === "DATA_LOADED_ARTICLES") {
    let newState = JSON.parse(JSON.stringify(state));
    if (
      localStorage.getItem("articles") &&
      JSON.parse(localStorage.getItem("articles")) !== state.articles
    ) {
      let articles = JSON.parse(localStorage.getItem("articles"));
      newState.articles = articles;
      newState.initialArticles = articles;

      let views = [];

      articles.map((item) =>
        views.push({ [item.id]: Math.ceil(Math.random() * 100) })
      );

      newState.views = views;
      let serialObj = JSON.stringify(views);
      localStorage.setItem("views", serialObj);
    } else {
      newState.articles = action.articles;
      newState.initialArticles = action.articles;

      let views = [];
      JSON.parse(localStorage.getItem("articles"));
      action.articles.map((item) =>
        views.push({ [item.id]: Math.ceil(Math.random() * 100) })
      );

      newState.views = views;
      let serialObj = JSON.stringify(views);
      localStorage.setItem("views", serialObj);
    }

    return newState;
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

    if (sortFilter === "Sort by popularity") {
      newState.filteredArticles.sort((a, b) => {
        let views = JSON.parse(localStorage.getItem("views"));
        let aViews = Number(views[a.id - 1][a.id]);
        let bViews = Number(views[b.id - 1][b.id]);

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
  } else if (action.type === "ADD_ARTICLE") {
    let newState = JSON.parse(JSON.stringify(state));
    let articles = JSON.parse(localStorage.getItem("articles"));
    let form = action.form;

    let article = {
      userId: Number(form["user-id-js"]),
      id: null,
      title: form["title-js"],
      body: form["text-js"],
    };

    article.id = articles[articles.length - 1].id + 1;
    newState.articles.push(article);
    articles.push(article);

    let serialObjActicles = JSON.stringify(articles);
    localStorage.setItem("articles", serialObjActicles);

    let views = JSON.parse(localStorage.getItem("views"));

    views.push({ [article.id]: Math.ceil(Math.random() * 100) });

    newState.views = views;

    let serialObjViews = JSON.stringify(views);
    localStorage.setItem("views", serialObjViews);

    return newState;
  } else if (action.type === "DELETE_ARTICLES") {
    let newState = JSON.parse(JSON.stringify(state));
    const articles = JSON.parse(localStorage.getItem("articles"));
    let views = JSON.parse(localStorage.getItem("views"));
    const foundIDs = action.articlesToDelete.map((id) =>
      articles.findIndex((item) => item.id === id)
    );

    for (let i = 0; i < foundIDs.length; ++i) {
      if (i > 0) {
        let num = foundIDs[i] - i;
        articles.splice(num, 1);
        views.splice(num, 1);
      } else {
        articles.splice(foundIDs[i], 1);
        views.splice(foundIDs[i], 1);
      }
    }

    newState.articles = articles;
    newState.views = views;

    let serialObjActicles = JSON.stringify(articles);
    localStorage.setItem("articles", serialObjActicles);

    let serialObjViews = JSON.stringify(views);
    localStorage.setItem("views", serialObjViews);

    return newState;
  } else if (action.type === "CHANGE_ARTICLE") {
    let newState = JSON.parse(JSON.stringify(state));
    let articles = JSON.parse(localStorage.getItem("articles"));
    let form = action.form;

    let article = {
      userId: Number(form["user-id-js"]),
      id: null,
      title: form["title-js"],
      body: form["text-js"],
    };

    article.id = Number(form["id-js"]);
    articles[article.id - 1] = article;

    newState.articles = articles;

    let serialObj = JSON.stringify(articles);
    localStorage.setItem("articles", serialObj);

    return newState;
  } else if (action.type === "RESTORE_DATA") {
    localStorage.removeItem("articles");
    localStorage.removeItem("views");

    return state;
  } else return state;
};

export default articlesReducer;
