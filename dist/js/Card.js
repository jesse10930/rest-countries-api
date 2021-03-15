class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popWithComma: '',
    };
  }

  componentDidMount() {
    this.setState({
      popWithComma: this.props.population
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    });
  }

  render() {
    const { flag, name, region, capital, onClick } = this.props;
    const { popWithComma } = this.state;

    return (
      <div id='country-card' onClick={onClick}>
        <div id='flag-div'>
          <img src={flag} />
        </div>
        <div id='description'>
          <h2 className='line'>{name}</h2>
          <p className='line'>
            <span className='bold'>Population: </span>
            {popWithComma}
          </p>
          <p className='line'>
            <span className='bold'>Region: </span>
            {region}
          </p>
          <p className='line'>
            <span className='bold'>Capital: </span>
            {capital}
          </p>
        </div>
      </div>
    );
  }
}
