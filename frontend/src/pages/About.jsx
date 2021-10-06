import React from 'react';

export const About = () => {
  window.scrollTo(0, 0);
  return (
    <div>
      <h4>
        {' '}
        This is a sandbox-project, made to be a platform to practice React
        hooks.{' '}
      </h4>
      <h5>The following technologies were also used: </h5>
      <ul>
        <li>HTML5</li>
        <li>CSS3</li>
        <li>Redux</li>
        <li>Firebase - web version 9 (Modular)</li>
        <li>Shutterstuck API</li>
      </ul>
    </div>
  );
};
