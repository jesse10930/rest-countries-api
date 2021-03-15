class CardList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      clicked: false,
    };
    this.onCardClick = this.onCardClick.bind(this);
    this.onBackClick = this.onBackClick.bind(this);
  }

  componentDidMount() {
    fetch('https://restcountries.eu/rest/v2/all')
      .then((res) => res.json())
      .then((data) => this.setState({ countries: data }));
  }

  onCardClick() {
    this.setState({ clicked: true });
  }

  onBackClick() {
    this.setState({ clicked: false });
  }

  render() {
    if (!this.state.clicked) {
      return (
        <div id='card-list'>
          {this.state.countries
            ? this.state.countries.map((country, i) => (
                <Card
                  id={i}
                  flag={country.flag}
                  name={country.name}
                  population={country.population}
                  region={country.region}
                  capital={country.capital}
                  onClick={this.onCardClick}
                />
              ))
            : 'Loading...'}
        </div>
      );
    } else {
      return (
        <div id='details-container'>
          <button onClick={this.onBackClick}>Back</button>
        </div>
      );
    }
  }
}
