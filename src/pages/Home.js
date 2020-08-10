import React from "react";
import { connect } from "react-redux";
import { fetchData } from "../store/actions/articlesActions";

import Articles from "../components/home/Articles";
import FilterBar from "../components/home/FilterBar";

class Home extends React.Component {
  componentWillMount() {
    this.props.fetchData();
  }

  render() {
    return (
      <div className="wrapper">
        <FilterBar
          filteredArticles={this.props.filteredArticles}
          comments={this.props.comments}
        />
        <div className="container articles-container">
          <Articles
            articles={this.props.articles}
            filteredArticles={this.props.filteredArticles}
            comments={this.props.comments}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    articles: state.articles,
    filteredArticles: state.filteredArticles,
    comments: state.comments,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => dispatch(fetchData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
