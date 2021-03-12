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
              <div className='temp'>{country.name}</div>
            ))
          : 'JSON.stringify(this.state.countries)'}
      </div>
    );
  }
}
