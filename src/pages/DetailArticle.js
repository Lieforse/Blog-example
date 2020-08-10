import React from "react";
import {
  fetchDetailData,
  fetchComments,
} from "../store/actions/articlesActions";
import { connect } from "react-redux";

class DetailArticle extends React.Component {
  componentWillMount() {
    const id = this.props.match.params.id;
    this.props.fetchDetailData(id);
    if (localStorage.getItem("views")) {
      let arr = JSON.parse(localStorage.getItem("views"));
      let obj = arr.find((item) => item[id]);
      obj[id] += 1;
      arr[id - 1] = obj;
      console.log(arr);
      let serialObj = JSON.stringify(arr);
      localStorage.setItem("views", serialObj);
    }
    if (this.props.comments.length === 0) {
      this.props.fetchComments();
    }

    console.log();
  }

  showComments = () => {
    const id = this.props.match.params.id;
    let filteredComments = this.props.comments.filter(
      (item) => item.postId === Number(id)
    );

    return (
      <div className="card-info">
        <div className="card-additional-info">
          <p>{filteredComments.length} Comments</p>
          <p className="views">
            <span className="mdi mdi-eye"></span>
            {
              JSON.parse(localStorage.getItem("views")).filter(
                (item) => item[this.props.match.params.id]
              )[0][this.props.match.params.id]
            }
          </p>
        </div>

        <div className="comments-container">
          {filteredComments.map((item) => (
            <div className="card" key={item.id}>
              <h5>{item.name}</h5>
              <h6>{item.email}</h6>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="detailArticle">
        <div className="container">
          <div className="col-auto">
            <div className="card">
              <img
                src={`https://picsum.photos/1800/300?random=${Math.round(
                  Math.random() * 100000
                )}`}
                alt=""
              />
              <div className="card-body">
                <h3>{this.props.detailArticle.title}</h3>
                <pre>{this.props.detailArticle.body}</pre>
              </div>
              {this.showComments()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    detailArticle: state.detailArticle,
    comments: state.comments,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDetailData: (id) => dispatch(fetchDetailData(id)),
    fetchComments: () => dispatch(fetchComments()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailArticle);
