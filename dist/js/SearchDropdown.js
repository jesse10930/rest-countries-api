class SearchDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // destructure props
    const { dark, continent, onChange, onClick } = this.props;

    return (
      <div id='search-dropdown' className={dark ? 'dark' : ''}>
        {/* search box */}
        <div id='search-box-container' className={dark ? 'dark' : ''}>
          <i class='fas fa-search'></i>
          <input
            id='search-box'
            className={dark ? 'dark' : ''}
            type='search'
            placeholder='Search for a country...'
            onChange={onChange}
            autocomplete='off'
            name='search-box'
            aria-label='Search for country'
          ></input>
        </div>
        <div id='continent-dropdown'>
          <button id='dropdown-btn' className={dark ? 'dark' : ''}>
            {/* Capitalize continent */}
            {continent
              ? continent[0].toUpperCase() + continent.slice(1)
              : 'Filter by Region'}
            <i class='fas fa-angle-down'></i>
          </button>
          <div
            id='dropdown-items'
            className={dark ? 'dark' : ''}
            onClick={onClick}
          >
            <p id='world' className={dark ? 'dark' : ''}>
              All Countries
            </p>
            <p id='africa' className={dark ? 'dark' : ''}>
              Africa
            </p>
            <p id='americas' className={dark ? 'dark' : ''}>
              Americas
            </p>
            <p id='asia' className={dark ? 'dark' : ''}>
              Asia
            </p>
            <p id='europe' className={dark ? 'dark' : ''}>
              Europe
            </p>
            <p id='oceania' className={dark ? 'dark' : ''}>
              Oceania
            </p>
          </div>
        </div>
      </div>
    );
  }
}
