import React from 'react';
import GroceryList from './components/GroceryList';

function App() {
  return (
      <div>
        <header>
          <h1>Grocery Manager</h1>
          <p>Spring Boot + React Demo</p>
        </header>

        <main>
          <GroceryList />
        </main>

        <footer>
          <p>© 2025 Grocery App Demo</p>
        </footer>
      </div>
  );
}

export default App;