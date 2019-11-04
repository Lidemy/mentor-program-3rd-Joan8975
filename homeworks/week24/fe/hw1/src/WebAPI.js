import axios from 'axios';

export const getPosts = () => axios.get('https://qootest.com/posts/?_sort=id&_order=desc');

export const getImgs = page => axios.get(`https://api.unsplash.com/photos/?client_id=773741e75ba8c52b7d3d825cd4c33cf637a1f77a7fe0f64109e4f5bdd35e22ad&per_page=9&order_by=popular&page=${page}`);

export const singlePost = (postId) => axios.get(`https://qootest.com/posts/${postId}`);

export const updatePost = (postId, author, title, body) => axios.patch(`https://qootest.com/posts/${postId}`, { author, title, body });

export const deletePost = (postId) => axios.delete(`https://qootest.com/posts/${postId}`);

export const createPost = (author, title, body) => axios.post('https://qootest.com/posts/', { author, title, body });
