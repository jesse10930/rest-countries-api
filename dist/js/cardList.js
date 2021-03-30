class CardList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dark: false,
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
    this.onToggleThemeClick = this.onToggleThemeClick.bind(this);
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
      capital: capital,
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

  onToggleThemeClick(e) {
    this.setState({ dark: !this.state.dark });
  }

  render() {
    const {
      dark,
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
        <div id='countries-container' className={dark ? 'dark' : ''}>
          <Header dark={dark} onClick={this.onToggleThemeClick} />
          <div id='main-display'>
            <SearchDropdown
              dark={dark}
              onChange={this.onSearchChange}
              continent={this.state.continent}
              onClick={this.onContinentClick}
            />
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
                  dark={dark}
                />
              ))}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div id='countries-container' className={dark ? 'dark' : ''}>
          <Header dark={dark} onClick={this.onToggleThemeClick} />
          <Details
            dark={dark}
            onBackClick={this.onBackClick}
            flag={flag}
            countryName={countryName}
            nativeName={nativeName}
            population={population}
            region={region}
            subRegion={subRegion}
            capital={capital}
            topLevDom={topLevDom}
            currencies={currencies}
            languages={languages}
            borderCountries={borderCountries}
            onBorderClick={this.onBorderClick}
            countries={countries}
          />
        </div>
      );
    }
  }
}
