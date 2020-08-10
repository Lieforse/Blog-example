import React from "react";
import { connect } from "react-redux";
import { sortArticles } from "../../store/actions/articlesActions";

class FilterBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortList: [
        "Sort by popularity",
        "Sort by latests",
        "Sort by comments: High to Low",
        "Sort by comments: Low to High",
        "Sort by default",
      ],
      sortMethod: "Sort by default",
    };
    this.showSortBar = this.showSortBar.bind(this);
  }

  showSortBar = () => {
    let sortBar = document.querySelector("#sort-bar-news-js");

    function outsideClickListener(event) {
      if (event.target === null) {
        return false;
      } else if (
        !sortBar.contains(event.target) &&
        !document.querySelector("#sort-bar-container-js").contains(event.target)
      ) {
        sortBar.classList.remove("active");
        document.querySelector("#sort-bar-title-js").classList.remove("active");
      }
      document.removeEventListener("click", outsideClickListener);
    }

    if (sortBar.classList.contains("active")) {
      sortBar.classList.remove("active");
      document.querySelector("#sort-bar-title-js").classList.remove("active");
    } else {
      sortBar.classList.add("active");
      document.querySelector("#sort-bar-title-js").classList.add("active");
      document.addEventListener("click", outsideClickListener);
    }
  };

  sortMethod = (sortFilter) => {
    this.props.sortArticles(sortFilter);
    this.setState({ sortMethod: sortFilter });
  };

  render() {
    return (
      <div className="sort-bar">
        <div className="container">
          <p className="results">
            Showing {this.props.articles.length} results{" "}
          </p>
          <div
            className="sort-bar-container"
            id="sort-bar-container-js"
            onClick={() => this.showSortBar()}
          >
            <div className="sort sort-bar-title" id="sort-bar-title-js">
              <p>{this.state.sortMethod}</p>
              <p className="mdi mdi-chevron-down"></p>
            </div>
            <div className="sort-bar-menu" id="sort-bar-news-js">
              {this.state.sortList.map((sortItem) => (
                <p
                  className="sort-bar-item"
                  onClick={() => this.sortMethod(sortItem)}
                  key={sortItem}
                >
                  {sortItem}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sortArticles: (sortFilter) => {
      dispatch(sortArticles(sortFilter));
    },
  };
};

export default connect(null, mapDispatchToProps)(FilterBar);
