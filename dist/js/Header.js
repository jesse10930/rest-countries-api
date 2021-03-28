class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { dark, onClick } = this.props;

    return (
      <section id='header' className={dark ? 'dark' : ''}>
        <div id='title'>
          <h3>Where in the World?</h3>
        </div>
        <div id='background-toggle' onClick={onClick}>
          <i class='far fa-moon'></i>
          <h5 id='toggle-title' class='false' onClick={onClick}>
            Dark Mode
          </h5>
        </div>
      </section>
    );
  }
}
