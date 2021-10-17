import './App.css';
import ErrorBoundary from "./ErrorBoundary";
import {Component} from "react";

function Callout(props) {
  return <h1>Callout</h1>;
}

class BreakThings extends Component {
  render() {
    throw new Error("We intentionally broke something");
    return null;
  }
}

function SiteLayout({ children, menu = c => null }) {
  return (
    <div className="site-container">
      <div>{menu}</div>
      <div>{children}</div>
    </div>
  );
};

function App() {
  return (
    <SiteLayout menu={
      <ErrorBoundary>
        <p>Site Layout Menu</p>
        <BreakThings />
      </ErrorBoundary>
    }>
      <ErrorBoundary>
        <Callout>Callout</Callout>
      </ErrorBoundary>
      <ErrorBoundary>
        <h1>Contents</h1>
        <p>This is the main part of the example layout</p>
      </ErrorBoundary>
    </SiteLayout>
  );
}

export default App;
