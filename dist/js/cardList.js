class CardList extends React.Component {
  // set initial state
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

  // get country info on initial mount
  componentDidMount() {
    fetch('https://restcountries.com/v3.1/all')
      .then((res) => res.json())
      .then((data) => this.setState({ countries: data }));
  }

  // set state to card's info on click
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
    let currenciesArr = Object.keys(currencies);
    let languagesArr = Object.values(languages);
    let mainLang = Object.keys(languages)[0];

    this.setState({
      clicked: true,
      flag: flag,
      countryName: name,
      region: region,
      capital: capital[0],
      population: population,
      nativeName: nativeName[mainLang].official,
      subRegion: subRegion,
      topLevDom: topLevDom[0],
      currencies: currenciesArr,
      languages: languagesArr,
      borderCountries: borderCountries,
    });
  }

  // reset state on back click
  onBackClick() {
    this.setState({ clicked: false, searchField: '', continent: '' });
  }

  // get border countries from alpha3code on border button click
  onBorderClick(code) {
    window.scrollTo(0, 0);
    this.state.countries.map((country, i) => {
      if (country.cca3 === code) {
        let currenciesArr = Object.keys(country.currencies);
        let languagesArr = Object.values(country.languages);
        let mainLang = Object.keys(country.languages)[0];

        this.setState({
          flag: country.flags.svg,
          countryName: country.name.common,
          region: country.region,
          capital: country.capital[0],
          population: country.population
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
          nativeName: country.name.nativeName[mainLang].official,
          subRegion: country.subregion,
          topLevDom: country.tld[0],
          currencies: currenciesArr,
          languages: languagesArr,
          borderCountries: country.borders,
        });
      }
    });
  }

  // set searchField state on input change
  onSearchChange(e) {
    this.setState({ searchField: e.target.value });
  }

  // set continent state on continent click
  onContinentClick(e) {
    e.target.id === 'world'
      ? this.setState({ continent: '' })
      : this.setState({ continent: e.target.id });
  }

  // set dark state on dark click
  onToggleThemeClick(e) {
    this.setState({ dark: !this.state.dark });
  }

  render() {
    // destructure state
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

    // filter countries based on search field and continent click
    const filteredCountries = countries.filter((country) => {
      return (
        country.region
          .toLowerCase()
          .includes(this.state.continent.toLowerCase()) &&
        country.name.common
          .toLowerCase()
          .includes(this.state.searchField.toLowerCase())
      );
    });

    return (
      // header component
      <div id='countries-container' className={dark ? 'dark' : ''}>
        <Header dark={dark} onClick={this.onToggleThemeClick} />
        {/* if NOT clicked state, return search box, region dropdown, and filtered cards */}
        {!this.state.clicked ? (
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
                  flag={country.flags.svg}
                  name={country.name.common}
                  population={country.population}
                  region={country.region}
                  capital={country.capital}
                  nativeName={country.name.nativeName}
                  subRegion={country.subregion}
                  topLevDom={country.tld}
                  currencies={country.currencies}
                  languages={country.languages}
                  borderCountries={country.borders}
                  onClick={this.onCardClick}
                  dark={dark}
                />
              ))}
            </div>
          </div>
        ) : (
          // if clicked state, return clicked card details
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
        )}
      </div>
    );
  }
}
