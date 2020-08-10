import React from "react";
import { Pagination } from "../Pagination";
import { Link } from "react-router-dom";

class Articles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postsPerPage: 10,
      currentPage: 1,
    };

    this.paginateArticles = this.paginateArticles.bind(this);
    this.commentsCounter = this.commentsCounter.bind(this);
  }

  commentsCounter = (id) => {
    let filteredComments = this.props.comments.filter(
      (item) => item.postId === id
    );
    return filteredComments.length;
  };

  showArticleViews = (id) => {
    let views = this.props.views;
    let articleViews = views.find((item) => item[id] != undefined);

    return articleViews[id];
  };

  paginateArticles = () => {
    const indexOfLastPost = this.state.postsPerPage * this.state.currentPage;
    const indexOfFistPost =
      (this.state.currentPage - 1) * this.state.postsPerPage;
    const currentPosts = this.props.articles.slice(
      indexOfFistPost,
      indexOfLastPost
    );

    return currentPosts.map((item) => (
      <div className="card" key={item.id}>
        <img
          src={`https://picsum.photos/1800/300?random=${Math.round(
            Math.random() * 100000
          )}`}
          alt=""
        />
        <div className="card-body">
          <h4>{item.title}</h4>
          <pre>{item.body}</pre>
        </div>
        <div className="card-info">
          <div className="info-container">
            <p className="comments">
              <span className="mdi mdi-comment-text-outline"></span>
              {this.commentsCounter(item.id)}
            </p>
            <p className="views">
              <span className="mdi mdi-eye"></span>
              {this.showArticleViews(item.id)}
            </p>
          </div>
          <Link to={`/${item.id}`}>
            <button className="btn btn-dark">Read more</button>
          </Link>
        </div>
      </div>
    ));
  };

  paginate = (number) => {
    this.setState({ currentPage: number });
    window.scrollTo(0, 0);
  };

  render() {
    return (
      <div className="col-auto">
        {this.paginateArticles()}
        <Pagination
          articles={this.props.articles}
          postsPerPage={this.state.postsPerPage}
          paginate={this.paginate}
        />{" "}
      </div>
    );
  }
}

export default Articles;
