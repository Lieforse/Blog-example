import React from "react";
import { connect } from "react-redux";
import { fetchData } from "../store/actions/articlesActions";

import Articles from "../components/home/Articles";
import FilterBar from "../components/home/FilterBar";

class Home extends React.Component {
  componentWillMount() {
    this.props.fetchData();
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="wrapper">
        <FilterBar
          articles={this.props.articles}
          comments={this.props.comments}
        />
        <div className="container articles-container">
          <Articles
            articles={this.props.articles}
            views={this.props.views}
            comments={this.props.comments}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    articles: state.articles,
    initialArticles: state.initialArticles,
    views: state.views,
    comments: state.comments,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => dispatch(fetchData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
