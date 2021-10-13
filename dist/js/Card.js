class Card extends React.Component {
  // initial state
  constructor(props) {
    super(props);
  }

  render() {
    // destructure props
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
      population,
      borderCountries,
      onClick,
      dark,
    } = this.props;

    return (
      <div
        id={'country-card-' + id}
        className={dark ? 'dark' : ''}
        // pass all props to onClick function
        onClick={() =>
          onClick(
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
            {/* add commas to population */}
            {population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
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
