// import logo from './logo.svg';
import './App.css';
import StarRating from "./StarRating";

function App() {
  return (
    <div className="App">
      <StarRating
        style={{padding: '3px', backgroundColor: 'lightblue'}}
        onDoubleClick={e => alert('double click')}
        totalStars={5}
        selectedStarsCount={0}
      />
    </div>
  );
}

export default App;