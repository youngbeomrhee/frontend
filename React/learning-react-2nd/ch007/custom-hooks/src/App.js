import React, { useState, useEffect } from "react";

const newsFeed = {
  subscribe: (addPost) => {
    addPost();
    console.log('post added');
  },
  unsubscribe: (addPost) => {
    addPost();
    console.log('post added');
  },

}

const welcomeChime = {
  play: () => console.log('welcome~')
}
const goodbyeChime = {
  play: () => console.log('goodbye~')
}

const useJazzyNews = () => {
  const [posts, setPosts] = useState([{id: 1}]);
  const addPost = post => {
    debugger;
    setPosts(allPosts => [post, ...posts]);
  }

  useEffect(() => {
    newsFeed.subscribe(addPost.bind(null, posts));
    return () => newsFeed.unsubscribe(addPost.bind(null, posts));
  }, []);

  useEffect(() => {
    welcomeChime.play();
    return () => goodbyeChime.play();
  }, []);
  return posts;
}

function NewsFeed({url}) {
  const posts = useJazzyNews();

  return (
    <>
      <h1>{posts.length} article</h1>
      {
        posts.map(post => (
          <Post key={post.id} {...post} />
        ))
      }
    </>
  )
}

function Post() {
  return (
    <>

    </>
  )
}

export default function App() {

  return (
    <>
      <NewsFeed url={'https://subscribeme.com'}></NewsFeed>
    </>
  );
}