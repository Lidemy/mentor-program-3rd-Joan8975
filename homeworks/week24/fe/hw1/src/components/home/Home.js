/* jsx-a11y/no-static-element-interactions */

import React, { Component, Fragment } from 'react';
import './Home.css';
import Loading from '../loading/Loading';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMore: false, // 是否存在下一頁
      page: 1, // 目前的頁碼
    };
    const { initImgs } = this.props;
    initImgs([]);
  }

  componentDidMount() {
    const { getPostList, getImgsList, totalPage } = this.props;
    const { page } = this.state;
    getPostList();
    getImgsList(page);
    this.setState({
      hasMore: !(page === totalPage),
    });
  }

  handleLoad = () => {
    const { page } = this.state;
    const { getImgsList, totalPage } = this.props;
    this.setState((prevState) => ({
      page: prevState.page + 1,
      hasMore: !(prevState.page + 1 === totalPage),
    }));
    getImgsList(page + 1);
  }

  render() {
    const { page, hasMore } = this.state;
    const { history, imgs, posts, isLoadingGetPosts, isLoadingGetImgs } = this.props;
    return (
      <div className="container">
        <h3>Blog Posts</h3>
        <ul>
          {(!isLoadingGetPosts && !isLoadingGetImgs)
            ? posts.map((post, index) => {
              if (index < page * 9) {
                const singlePage = Math.floor(index / 9) + 1;
                const singleIndex = index - (9 * (singlePage - 1));
                return (
                  <Fragment key={post.id}>
                    <li role="presentation" onClick={() => history.push(`/posts/${post.id}#${singlePage}#${singleIndex}`)}>
                      <div className="preview">
                        <img src={imgs[index].urls.regular} alt="" />
                      </div>
                      <div className="title">{post.title}</div>
                      <div className="content">{post.body}</div>
                    </li>
                  </Fragment>
                );
              }
            })
            : <Loading />}
          {hasMore ? <button type="submit" className="common_button mid_button" onClick={this.handleLoad}>Load More</button> : <div className="clearfix" />}
          <div className="clearfix" />
        </ul>
      </div>
    );
  }
}
export default Home;
