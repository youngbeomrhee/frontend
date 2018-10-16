ReactDOM.render(
  <div>
    <Content>
      <h1>React</h1>
      <p>Rocks</p>
    </Content>
    <Content>
      <img src="images/azat.jpg" width="100"/>
    </Content>
    <Content>
      <a href="http://react.rocks">http://react.rocks</a>
    </Content>
    <Content>
      <a className="btn btn-danger" href="http://react.rocks">http://react.rocks</a>
      <a className="btn btn-info" href="http://react.rocks">info</a>
    </Content>
  </div>,
  document.getElementById('content')
)
