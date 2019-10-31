/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable object-curly-newline */
/* jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */

import React, { Component, Fragment } from 'react';
import './Home.css';
import Loading from '../loading/Loading';
import { getPosts, getImgs } from '../../WebAPI';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      hasMore: false, // 是否存在下一頁
      page: 1, // 目前的頁碼
    };
  }

  componentDidMount() {
    const { page } = this.state;
    getPosts()
      .then(res => res.json())
      .then(
        (result) => {
          const totalPage = Math.ceil(result.length / 10);
          this.setState({
            totalPage,
            hasMore: !(page === totalPage),
            posts: result,
          });
        },
      );

    getImgs(page) // 先 load page1 資料
      .then(res => res.json())
      .then(
        (result) => {
          const { updateImgs } = this.props;
          updateImgs(result);
        },
      );
  }

  handleLoad() {
    const { page, totalPage } = this.state;
    // load page2,3,4...資料
    getImgs(page + 1)
      .then(res => res.json())
      .then(
        (result) => {
          const { updateImgs } = this.props;
          updateImgs(result);
          this.setState(prevState => ({
            page: prevState.page + 1,
            hasMore: !(prevState.page + 1 === totalPage),
          }));
        },
      );
  }

  render() {
    const { posts, page, hasMore } = this.state;
    const { history, imgs } = this.props;
    return (
      <div className="container">
        <h3>Blog Posts</h3>
        <ul>
          {(posts.length && imgs.length) // posts 和 imgs 都拿到資料才 load 畫面
            ? posts.map((post, index) => {
              if ((index < page * 9) && imgs[index]) { // 9 筆資料為一頁，並且確認 img[index] 不是 undefined
                const singlePage = Math.floor(index / 9) + 1; // 透過 index 判斷當前圖片所在的頁碼
                const singleIndex = index - (9 * (singlePage - 1)); // 判斷當前圖片為其頁碼中的第幾筆資料
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
          {hasMore ? <button type="submit" className="common_button mid_button" onClick={() => { this.handleLoad(); }}>Load More</button> : <div className="clearfix" />}
          <div className="clearfix" />
        </ul>
      </div>
    );
  }
}
export default Home;
