import React from 'react';

export const AppFooter = () => {
  return (
    <div className="app-footer">
      <div>© Copyrights {new Date(Date.now()).getFullYear()}</div>
    </div>
  );
};
