class Menu extends React.Component {
  render() {
    let menus = ['Home',
      'About',
      'Services',
      'Portfolio',
      'Contact us']
    return (
      <div>
        {menus.map((v,i) => {
          return <div><Link label={v}/></div>
        })}
      </div>
    )
  }
}

class Link extends React.Component {
  render() {
    const url='/'
      + this.props.label
        .toLowerCase()
        .trim()
        .replace(/ /g, '-')
    return <div>
      <a href={url}>
      {this.props.label}
      </a>
      <br/>
    </div>
  }
}

ReactDOM.render(<Menu />, document.getElementById('menu'))
