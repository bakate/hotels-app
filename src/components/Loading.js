import React from 'react';
import loadingGif from '../assets/loading.gif';

export default function Loading() {
  return (
    <div className="loading">
      <h2>Chargement...</h2>
      <img src={loadingGif} alt="loading gif" />
    </div>
  );
}
