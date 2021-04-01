class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popWithComma: '',
      currencyType: [],
      borderCountriesArr: [],
      languageName: [],
    };
  }

  componentDidMount() {
    let currBuff = [];
    let langBuff = [];
    let bordBuff = [];

    this.props.currencies.map((currency, i) => {
      currBuff.push(currency.name);
    });
    this.props.languages.map((language, i) => {
      langBuff.push(language.name);
    });
    this.props.borderCountries.map((country, i) => {
      bordBuff.push(country);
    });

    this.setState({
      popWithComma: this.props.population
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
      currencyType: currBuff,
      borderCountriesArr: bordBuff,
      languageName: langBuff,
    });
  }

  render() {
    const {
      id,
      flag,
      name,
      region,
      capital,
      nativeName,
      subRegion,
      topLevDom,
      currencies,
      languages,
      borderCountries,
      onClick,
      dark,
    } = this.props;

    const { popWithComma } = this.state;

    return (
      <div
        id={'country-card-' + id}
        className={dark ? 'dark' : ''}
        onClick={() =>
          onClick(
            flag,
            name,
            region,
            capital,
            popWithComma,
            nativeName,
            subRegion,
            topLevDom,
            currencies,
            languages,
            borderCountries
          )
        }
      >
        <div id={'flag-div-' + id}>
          <img src={flag} alt='flag' />
        </div>
        <div id={'description-' + id}>
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
