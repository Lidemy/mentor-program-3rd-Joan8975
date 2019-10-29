export const getPosts = () => fetch('https://qootest.com/posts/?_sort=id&_order=desc');

export const getImgs = page => fetch(`https://api.unsplash.com/photos/?client_id=773741e75ba8c52b7d3d825cd4c33cf637a1f77a7fe0f64109e4f5bdd35e22ad&per_page=9&order_by=popular&page=${page}`);

export const getSinglePost = postId => fetch(`https://qootest.com/posts/${postId}`);

export const updatePost = (postId, method) => fetch(`https://qootest.com/posts/${postId}`, method);

export const deletePost = (postId, method) => fetch(`https://qootest.com/posts/${postId}`, method);

export const createPost = method => fetch('https://qootest.com/posts/', method);
