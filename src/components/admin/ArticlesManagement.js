import React from "react";
import { Pagination } from "../Pagination";

class ArticlesManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postsPerPage: 12,
      currentPage: 1,
      unfoldItem: null,
      articlesToDelete: [],
      managementParam: "",
      changedItems: null,
      filterByUserId: null,
    };

    this.paginateArticles = this.paginateArticles.bind(this);
    this.showFullContent = this.showFullContent.bind(this);
    this.ArticlesManagement = this.ArticlesManagement.bind(this);
    this.submitArticlesManagement = this.submitArticlesManagement.bind(this);
    this.deleteArticle = this.deleteArticle.bind(this);
    this.selectArticle = this.selectArticle.bind(this);
    this.restoreData = this.restoreData.bind(this);
    this.changeArticle = this.changeArticle.bind(this);
    this.filterByUserId = this.filterByUserId.bind(this);
  }

  paginateArticles = () => {
    const indexOfLastPost = this.state.postsPerPage * this.state.currentPage;
    const indexOfFistPost =
      (this.state.currentPage - 1) * this.state.postsPerPage;
    let currentPosts = [];

    let filteredArticles = this.props.articles.filter(
      (item) => item.userId === this.state.filterByUserId
    );

    if (this.state.filterByUserId) {
      currentPosts = filteredArticles.slice(indexOfFistPost, indexOfLastPost);
    } else {
      currentPosts = this.props.articles.slice(
        indexOfFistPost,
        indexOfLastPost
      );
    }

    return currentPosts.map((item) => (
      <div className="row" key={item.id}>
        <div className="col-auto checkbox">
          <input
            type="checkbox"
            onChange={(event) => this.selectArticle(event, item.id)}
          />
        </div>
        <div className="col-1">{item.id}</div>
        <div
          className="col-1 user-id"
          onClick={() => this.filterByUserId(item.userId)}
        >
          {item.userId}
        </div>
        <div className="col-2">
          {item.id === this.state.unfoldItem
            ? item.title
            : item.title.length <= 14
            ? item.title
            : item.title.slice(0, 14).concat("...")}
        </div>
        <div className="col-6">
          {item.id === this.state.unfoldItem
            ? item.body
            : item.body.slice(0, 67).concat("...")}
        </div>
        <div className="col-1 extra-buttons">
          <span
            className="mdi mdi-eye"
            onClick={() => this.showFullContent(item.id)}
          ></span>
          <span
            className="mdi mdi-pencil"
            onClick={() => this.changeArticle(item.id)}
          ></span>
        </div>
      </div>
    ));
  };

  paginate = (number) => {
    this.setState({ currentPage: number });
    window.scrollTo(0, 0);
  };

  showFullContent = (id) => {
    if (this.state.unfoldItem !== id) {
      this.setState({ unfoldItem: id });
    } else {
      this.setState({ unfoldItem: null });
    }
  };

  ArticlesManagement = (param, id) => {
    let textarea = document.getElementsByTagName("textarea");
    let input = document.getElementById("user-id-js");
    let elem = document.querySelector("#create-article-js");

    if (param === "add") {
      document.getElementById("id-js").classList.remove("active");
      this.state.managementParam = "";
      input.value = "";
      textarea[0].value = "";
      textarea[1].value = "";
    }

    if (this.state.managementParam === "change") {
      if (this.state.changedItems === id) {
        textarea[0].removeEventListener("keydown", resize);
        textarea[1].removeEventListener("keydown", resize);
        elem.classList.remove("active");
        document.getElementById("id-js").classList.remove("active");
        this.state.changedItems = null;
        this.state.managementParam = "";
      } else {
        document.getElementById("id-js").classList.add("active");
        textarea[0].addEventListener("keydown", resize);
        textarea[1].addEventListener("keydown", resize);
        elem.classList.add("active");
        this.state.changedItems = id;
      }
    } else {
      if (elem.classList.contains("active")) {
        textarea[0].removeEventListener("keydown", resize);
        textarea[1].removeEventListener("keydown", resize);
        elem.classList.remove("active");
      } else {
        textarea[0].addEventListener("keydown", resize);
        textarea[1].addEventListener("keydown", resize);
        elem.classList.add("active");
      }
    }

    if (param === "change") {
      let idInput = document.getElementById("id-js");
      let article = this.props.articles.find((item) => item.id === id);
      idInput.value = article.id;
      input.value = article.userId;
      textarea[0].value = article.title;
      textarea[0].style.cssText = "height:" + textarea[0].scrollHeight + "px";
      textarea[1].value = article.body;
      textarea[1].style.cssText = "height:" + textarea[1].scrollHeight + "px";
    }

    function resize() {
      let el = this;
      el.style.cssText = "height:auto; padding:0";
      el.style.cssText = "height:" + el.scrollHeight + "px";
    }
  };

  submitArticlesManagement = () => {
    if (!localStorage.getItem("articles")) {
      let articles = this.props.articles.slice();
      let serialObj = JSON.stringify(articles);
      localStorage.setItem("articles", serialObj);
    }

    let rawForm = Array.from(document.querySelectorAll("#create-article-js"))[0]
      .children;
    let form = {};
    Array.from(rawForm).map((item) => {
      form = Object.assign(form, { [item.id]: item.value });
    });

    const articles = JSON.parse(localStorage.getItem("articles"));

    let article = {
      userId: Number(form["user-id-js"]),
      id: null,
      title: form["title-js"],
      body: form["text-js"],
    };
    if (this.state.managementParam === "change") {
      article.id = Number(form["id-js"]);
      articles[article.id - 1] = article;
      this.state.managementParam = "";
    } else {
      article.id = articles[articles.length - 1].id + 1;
      articles.push(article);
    }

    let serialObj = JSON.stringify(articles);
    localStorage.setItem("articles", serialObj);
  };

  selectArticle = (event, id) => {
    if (event.target.checked) {
      this.state.articlesToDelete.push(id);
    } else {
      let foundId = this.state.articlesToDelete.findIndex(
        (item) => item === id
      );
      this.state.articlesToDelete.splice(foundId, 1);
    }
  };

  deleteArticle = () => {
    if (!localStorage.getItem("articles")) {
      let articles = this.props.articles.slice();
      let serialObj = JSON.stringify(articles);
      localStorage.setItem("articles", serialObj);
    }

    const articles = JSON.parse(localStorage.getItem("articles"));
    const foundIDs = this.state.articlesToDelete.map((id) =>
      articles.findIndex((item) => item.id === id)
    );

    for (let i = 0; i < foundIDs.length; ++i) {
      if (i > 0) {
        let num = foundIDs[i] - i;
        articles.splice(num, 1);
      } else {
        articles.splice(foundIDs[i], 1);
      }
    }

    let serialObj = JSON.stringify(articles);
    localStorage.setItem("articles", serialObj);

    this.state.articlesToDelete.splice(0);

    let checks = document.querySelectorAll('input[type="checkbox"]');
    for (let i = 0; i < checks.length; i++) {
      let check = checks[i];
      if (!check.disabled) {
        check.checked = false;
      }
    }
  };

  restoreData = () => {
    localStorage.removeItem("articles");
  };

  changeArticle = (id) => {
    this.state.managementParam = "change";
    this.ArticlesManagement("change", id);
  };

  filterByUserId = (userId) => {
    this.setState({ filterByUserId: userId });
  };

  functionfastom = (userId) => {
    if (userId) {
      return this.props.articles.filter((item) => item.userId === userId);
    }
    return this.props.articles;
  };

  render() {
    return (
      <div className="container">
        <div className="card">
          <div className="buttons">
            <div
              className="btn btn-dark"
              onClick={() => this.ArticlesManagement("add")}
            >
              <span className="mdi mdi-plus"></span>
              Create
            </div>
            <div
              className="btn btn-danger"
              onClick={() => this.deleteArticle()}
            >
              <span className="mdi mdi-delete"></span>
              Delete
            </div>
            <div className="btn btn-warning" onClick={() => this.restoreData()}>
              <span className="mdi mdi-restore"></span>
              Restore data
            </div>
          </div>
          <div className="create-article" id="create-article-js">
            <input type="text" className="id" id="id-js" readOnly />
            <input
              type="number"
              className="user-id"
              id="user-id-js"
              placeholder="UserID"
            />
            <textarea
              type="text"
              className="title"
              id="title-js"
              rows="1"
              placeholder="Title"
            />
            <textarea
              type="textarea"
              className="text"
              id="text-js"
              rows="1"
              placeholder="Text"
            />
            <div
              className="btn btn-success"
              onClick={() => this.submitArticlesManagement()}
            >
              Submit
            </div>
          </div>
          <form className="card-form">
            <div className="card-head">
              <div className="row">
                <div className="col-auto checkbox"></div>
                <div className="col-1">ID</div>
                <div className="col-1">UserID</div>
                <div className="col-2">Title</div>
                <div className="col-6">Text</div>
              </div>
            </div>
            <div className="card-body">{this.paginateArticles()}</div>
            <Pagination
              articles={this.props.articles}
              postsPerPage={this.state.postsPerPage}
              paginate={this.paginate}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default ArticlesManagement;
