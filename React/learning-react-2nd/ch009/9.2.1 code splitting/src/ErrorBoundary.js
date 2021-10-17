import React, { Component } from "react";
import {ErrorScreen} from "./ErrorScreen";

export default class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    const { children } = this.props;
    if (error) return <ErrorScreen error={error} />;
    return children;
  }
}
