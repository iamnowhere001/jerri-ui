import ContactsList from './contactsList.vue';

ContactsList.install = function (Vue) {
  Vue.component(ContactsList.name, ContactsList);
};

export default ContactsList;
