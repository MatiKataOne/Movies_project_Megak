import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'primereact/button';
import MovieTable from './components/movie.table.component';

function App() {
  return (
    <div className="App">
      <MovieTable />
    </div>
  );
}

export default App;
