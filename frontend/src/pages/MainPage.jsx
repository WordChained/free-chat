import React from 'react';
import { SearchForm } from '../cmps/SearchForm.jsx';
export const MainPage = () => {
  return (
    <section className="main-page">
      <h1 className="main-header">Free Chat</h1>
      <SearchForm />
    </section>
  );
};
