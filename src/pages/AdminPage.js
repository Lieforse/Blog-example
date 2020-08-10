import React from "react";
import { connect } from "react-redux";
import { fetchData } from "../store/actions/articlesActions";

import ArticlesManagement from "../components/admin/ArticlesManagement";

class AdminPage extends React.Component {
  componentWillMount() {
    this.props.fetchData();
  }

  render() {
    return (
      <div className="wrapper admin-wrapper">
        <ArticlesManagement articles={this.props.articles} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);
