import SearchBar from './searchBar.vue';

SearchBar.install = function (Vue) {
  Vue.component(SearchBar.name, SearchBar);
};

export default SearchBar;
