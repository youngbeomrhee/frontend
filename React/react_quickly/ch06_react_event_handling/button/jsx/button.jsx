class SaveButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleSave = handleSave.bind(this);
  }
  handleSave(event) {
    console.log(this, event);
  }
  render() {
    return <div>
      {/* <button onClick={((event)=>{console.log(this, event)})}>Save</button> */}
      <button onClick={this.handleSave}>Save</button>
    </div>
  }
}