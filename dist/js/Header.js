class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // destructure props
    const { dark, onClick } = this.props;

    return (
      <section id='header' className={dark ? 'dark' : ''}>
        <div id='title'>
          <a href='//www.codebyronda.com' target='_blank'>
            <span className='sr-only'>portfolio</span>
            <img src='./images/prof-pic-resize.jpg' alt='prof-pic' />
          </a>
          <h3>Where in the World?</h3>
        </div>
        {/* dark mode toggle */}
        <div id='background-toggle' onClick={onClick}>
          {dark ? <i class='fas fa-moon'></i> : <i class='far fa-moon'></i>}
          <h5 id='toggle-title' class='false' onClick={onClick}>
            Dark Mode
          </h5>
        </div>
      </section>
    );
  }
}
