class Content extends React.Component {
  render() {
    let number = 1
    return (
      <div>
        <Button buttonLabel="Start"/>
        <Button />
        <Button />
        <Button title={number}/>
        <Button shouldstring="test"/>
        <Button shouldstring={1}/>
        <Button email="hi@azat.co" buttonLabel="hi@azat.co"/>
        <Button email="not-a-valid-email" buttonLabel="not-a-valid-email"/>
      </div>
    )
  }
}