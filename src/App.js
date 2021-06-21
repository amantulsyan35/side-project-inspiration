import React, { useState, useEffect } from 'react';
import './App.css';
import CardContainer from './CardContainer';
const axios = require('axios');

const App = (props) => {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [numComment, setNumComment] = useState('');
  const [count, setCount] = useState(5);
  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState(true);

  useEffect(() => {
    if (loading === true) getProjects();
  });

  const getProjects = async () => {
    const res = await axios.get(
      `https://www.reddit.com/r/SideProject.json?limit=${count}`
    );
    // ?limit=3
    const { data } = res.data;

    setProjects(data.children);
    setLoading(false);

    const maxUp = Math.max.apply(
      Math,
      projects.map((x) => {
        return x.data.ups;
      })
    );

    for (let i = 0; i < projects.length; i++) {
      if (projects[i].data.ups === maxUp) {
        setTitle(projects[i].data.title);
        setLoading(false);
        setNumComment(projects[i].data.num_comments);
        setLink(projects[i].data.url);
      }
    }
  };

  // click logic
  const handleClick = () => {
    setLoading(true);
    setClicked(false);
    getProjects();
  };

  const handleChange = (evt) => {
    setCount(evt.target.value);
  };

  const sideProject = projects.map((p) => {
    return (
      <CardContainer
        key={p.data.id}
        comments={p.data.num_comments}
        link={p.data.url}
        title={p.data.title}
      />
    );
  });

  if (loading) {
    return <div class='loader'></div>;
  }

  return (
    <div>
      <div className='Navbar'>
        <div className='Navbar-main'>
          <p>
            Welcome to the reddit Side Project zone, where Ideas are Abundant!
          </p>
        </div>
      </div>
      <div className='fetch'>
        <form className='Form'>
          <label>
            Select the number of projects:
            <select
              value={count}
              onChange={handleChange}
              className='Form-select'
            >
              <option value='5'>5</option>
              <option value='10'>10</option>
              <option value='15'>15</option>
              <option value='20'>20</option>
              <option value='25'>25</option>
            </select>
          </label>
        </form>
        <button onClick={handleClick}>Get Ideas</button>
      </div>
      <div className='Max-upvote'>
        <div className='Navbar-upvote'>
          <p>
            {clicked === true
              ? "Ideas are easy. It's the execution of ideas that really separates the sheep from the goats."
              : title}
          </p>
          {clicked === false && (
            <>
              <a href={link} alt='url'>
                <i className='fas fa-external-link-alt'></i>
              </a>
              <span>
                <i className='fas fa-comments'></i>
              </span>
            </>
          )}
          <span className='Navbar-comment'>{numComment}</span>
        </div>
      </div>
      <div className='Project-container'>{sideProject}</div>
      <div className='footer'>
        <p>IDEATE - EXECUTE - ITERATE</p>
      </div>
    </div>
  );
};

export default App;
