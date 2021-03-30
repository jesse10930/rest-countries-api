class SearchDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { dark, continent, onChange, onClick } = this.props;

    return (
      <div id='search-dropdown' className={dark ? 'dark' : ''}>
        <input
          id='search-box'
          className={dark ? 'dark' : ''}
          type='input'
          placeholder='&#xf002;     Search for a country...'
          onChange={onChange}
          autocomplete='off'
        ></input>
        <div id='continent-dropdown'>
          <button id='dropdown-btn' className={dark ? 'dark' : ''}>
            <p id='dropdown-title'>
              {continent
                ? continent[0].toUpperCase() + continent.slice(1)
                : 'Filter by Region'}
            </p>
            <i class='fas fa-angle-down'></i>
          </button>
          <div
            id='dropdown-items'
            className={dark ? 'dark' : ''}
            onClick={onClick}
          >
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