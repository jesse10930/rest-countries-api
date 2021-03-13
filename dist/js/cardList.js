class CardList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
    };
  }

  componentDidMount() {
    fetch('https://restcountries.eu/rest/v2/all')
      .then((res) => res.json())
      .then((data) => this.setState({ countries: data }));
  }

  render() {
    return (
      <div id='card-list'>
        {this.state.countries
          ? this.state.countries.map((country, i) => (
              <div id='country-card'>
                <img src={country.flag} />
                <div id='description'>
                  <h2 className='line'>{country.name}</h2>
                  <p className='line'>
                    <span className='bold'>Region: </span>
                    {country.region}
                  </p>
                  <p className='line'>
                    <span className='bold'>Population: </span>
                    {country.population}
                  </p>
                  <p className='line'>
                    <span className='bold'>Capital: </span>
                    {country.capital}
                  </p>
                </div>
              </div>
            ))
          : 'JSON.stringify(this.state.countries)'}
      </div>
    );
  }
}
