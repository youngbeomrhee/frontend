class SaveButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleSave = handleSave.bind(this);
  }
  handleSave(event) {
    console.log(this, event);
  }
  render() {
    return React.createElement(
      "div",
      null,
      React.createElement(
        "button",
        { onClick: this.handleSave },
        "Save"
      )
    );
  }
}