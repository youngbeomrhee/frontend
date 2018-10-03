let dataUrl = './users/real-user-data.json'
ReactDOM.render(
  <div>
    <Users data-url={dataUrl}/>
  </div>,
  document.getElementById('content')
)
