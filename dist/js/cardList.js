class CardList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      clicked: false,
      flag: '',
      countryName: '',
      region: '',
      capital: '',
      population: '',
      nativeName: '',
      subRegion: '',
      topLevDom: '',
      currencies: [],
      languages: [],
      borderCountries: [],
      searchField: '',
      continent: '',
    };
    this.onCardClick = this.onCardClick.bind(this);
    this.onBackClick = this.onBackClick.bind(this);
    this.onBorderClick = this.onBorderClick.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onContinentClick = this.onContinentClick.bind(this);
  }

  componentDidMount() {
    fetch('https://restcountries.eu/rest/v2/all')
      .then((res) => res.json())
      .then((data) => this.setState({ countries: data }));
  }

  onCardClick(
    flag,
    name,
    region,
    capital,
    population,
    nativeName,
    subRegion,
    topLevDom,
    currencies,
    languages,
    borderCountries
  ) {
    this.setState({
      clicked: true,
      flag: flag,
      countryName: name,
      region: region,
      capital,
      capital,
      population: population,
      nativeName: nativeName,
      subRegion: subRegion,
      topLevDom: topLevDom,
      currencies: currencies,
      languages: languages,
      borderCountries: borderCountries,
    });
  }

  onBackClick() {
    this.setState({ clicked: false, searchField: '', continent: '' });
  }

  onBorderClick(code) {
    this.state.countries.map((country, i) => {
      if (country.alpha3Code === code) {
        this.setState({
          flag: country.flag,
          countryName: country.name,
          region: country.region,
          capital: country.capital,
          population: country.population
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
          nativeName: country.nativeName,
          subRegion: country.subregion,
          topLevDom: country.topLevelDomain,
          currencies: country.currencies,
          languages: country.languages,
          borderCountries: country.borders,
        });
      }
    });
  }

  onSearchChange(e) {
    this.setState({ searchField: e.target.value });
  }

  onContinentClick(e) {
    this.setState({ continent: e.target.id });
  }

  render() {
    const {
      countries,
      flag,
      countryName,
      region,
      capital,
      population,
      nativeName,
      subRegion,
      topLevDom,
      currencies,
      languages,
      borderCountries,
    } = this.state;

    const filteredCountries = countries.filter((country) => {
      return (
        country.region
          .toLowerCase()
          .includes(this.state.continent.toLowerCase()) &&
        country.name
          .toLowerCase()
          .includes(this.state.searchField.toLowerCase())
      );
    });

    if (!this.state.clicked) {
      return (
        <div id='main-display'>
          <div id='search-dropdown'>
            <input
              id='search-box'
              type='input'
              placeholder='&#xf002;     Search for a country...'
              onChange={this.onSearchChange}
            ></input>
            <div id='continent-dropdown'>
              <button id='dropdown-btn'>
                <p id='dropdown-title'>
                  {this.state.continent
                    ? this.state.continent[0].toUpperCase() +
                      this.state.continent.slice(1)
                    : 'Filter by Region'}
                </p>
                <i class='fas fa-angle-down'></i>
              </button>
              <div id='dropdown-items' onClick={this.onContinentClick}>
                <p id='africa'>Africa</p>
                <p id='americas'>Americas</p>
                <p id='asia'>Asia</p>
                <p id='europe'>Europe</p>
                <p id='oceania'>Oceania</p>
              </div>
            </div>
          </div>
          <div id='card-list'>
            {filteredCountries.map((country, i) => (
              <Card
                id={i}
                flag={country.flag}
                name={country.name}
                population={country.population}
                region={country.region}
                capital={country.capital}
                nativeName={country.nativeName}
                subRegion={country.subregion}
                topLevDom={country.topLevelDomain}
                currencies={country.currencies}
                languages={country.languages}
                borderCountries={country.borders}
                onClick={this.onCardClick}
              />
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <div id='details-container'>
          <button id='back-btn' onClick={this.onBackClick}>
            <i class='fas fa-long-arrow-alt-left fa-2x'></i>
            <p id='back-title'>Back</p>
          </button>
          <div id='country-info'>
            <div id='flag'>
              <img src={flag}></img>
            </div>
            <div id='details'>
              <h1 className='countryName'>{countryName}</h1>
              <p className='line nativeName'>
                <span className='bold'>Native Name: </span>
                {nativeName}
              </p>
              <p className='line population'>
                <span className='bold'>Population: </span>
                {population}
              </p>
              <p className='line region'>
                <span className='bold'>Region: </span>
                {region}
              </p>
              <p className='line subRegion'>
                <span className='bold'>Sub Region: </span>
                {subRegion}
              </p>
              <p className='line capital'>
                <span className='bold'>Capital: </span>
                {capital}
              </p>
              <p className='line topLevDom'>
                <span className='bold'>Top Level Domain: </span>
                {topLevDom}
              </p>
              <p className='line currencies'>
                <span className='bold'>Currencies: </span>
                {currencies.map((currency, i) =>
                  i < currencies.length - 1
                    ? currency.name + ', '
                    : currency.name
                )}
              </p>
              <p className='line languages'>
                <span className='bold'>Languages: </span>
                {languages.map((language, i) =>
                  i < languages.length - 1
                    ? language.name + ', '
                    : language.name
                )}
              </p>
              <p className='line borderCountries'>
                <span className='bold'>Border Countries: </span>
                {borderCountries.map((borderCountry, i) =>
                  this.state.countries.map(
                    (country, i) =>
                      country.alpha3Code === borderCountry && (
                        <button
                          id='border-button'
                          onClick={() => this.onBorderClick(borderCountry)}
                        >
                          {country.name}
                        </button>
                      )
                  )
                )}
              </p>
            </div>
          </div>
        </div>
      );
    }
  }
}
