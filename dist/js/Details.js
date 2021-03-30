class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      dark,
      onBackClick,
      flag,
      countryName,
      nativeName,
      population,
      region,
      subRegion,
      capital,
      topLevDom,
      currencies,
      languages,
      borderCountries,
      onBorderClick,
      countries,
    } = this.props;

    return (
      <div id='details-container'>
        <button
          id='back-btn'
          className={dark ? 'dark' : ''}
          onClick={onBackClick}
        >
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
                i < currencies.length - 1 ? currency.name + ', ' : currency.name
              )}
            </p>
            <p className='line languages'>
              <span className='bold'>Languages: </span>
              {languages.map((language, i) =>
                i < languages.length - 1 ? language.name + ', ' : language.name
              )}
            </p>
            <p id='bord-count' className='line borderCountries'>
              <span className='bold'>Border Countries: </span>
              {borderCountries.map((borderCountry, i) =>
                countries.map(
                  (country, i) =>
                    country.alpha3Code === borderCountry && (
                      <button
                        id='border-button'
                        className={dark ? 'dark' : ''}
                        onClick={() => onBorderClick(borderCountry)}
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