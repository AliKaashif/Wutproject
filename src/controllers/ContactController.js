import Contact from '../models/Contact';

/** 
 * This class controls the list of contacts for the app.
 * This would be a good place to implement the data
 * connections to your API. Whenever a change is made the 
 * 'contactChange' event is dispatched to trigger the 
 * Contact list to refresh.
 */
const API_URL = "http://localhost/dev_test/dev_testserver/wp-json/my_restful_api/v1/contacts";
class ContactController {

  constructor() {
    if(ContactController._instance){
      return ContactController._instance;
    }
    ContactController._instance = this;
    this.event = new Event('contactChange');
    this.contacts = [];
    this.count = 0;
  }
  
  getAll() {
      return fetch(API_URL)
        .then(response => response.json())
        .catch(error => console.error('Error fetching contacts:', error));
    }

    add(first_name, last_name, email, phone, imageUrl) {
      const formData = new FormData();
      formData.append('first_name', first_name);
      formData.append('last_name', last_name);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('image_url', imageUrl);
    
      return fetch(API_URL, {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          if (data && data.id) {
            const contact = new Contact(data.id, first_name, last_name, email, phone, imageUrl);
            this.contacts.push(contact);
            this.count++;
            window.dispatchEvent(this.event);
            return true;
          }
          return false;
        })
        .catch(error => console.error('Error adding contact:', error));
    }
    

    remove(contact_id) {
      return fetch(`${API_URL}/${contact_id}`, {
      method: 'DELETE'
      })
        .then(response => response.json())
        .then(data => {
          if (data && data.success) {
            this.contacts = this.contacts.filter(contact => contact.id !== contact_id);
            window.dispatchEvent(this.event);
          }
        })
        .catch(error => console.error('Error deleting contact:', error));
    }
    

    update(contact_id, options) {
      const formData = new FormData();
      formData.append('id', contact_id);
      formData.append('first_name', options.fName);
      formData.append('last_name', options.lName);
      formData.append('email', options.email);
      formData.append('phone', options.phone);
      formData.append('image_url', options.imageUrl);
    
      return fetch(`http://localhost/dev_test/dev_testserver/wp-json/my_restful_api/v1/contacts/${contact_id}`, {
        method: 'PUT',
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          if (data && data.id) {
            const contactIndex = this.contacts.findIndex(contact => contact.id === contact_id);
            if (contactIndex !== -1) {
              this.contacts[contactIndex].fName = options.first_name;
              this.contacts[contactIndex].lName = options.last_name;
              this.contacts[contactIndex].email = options.email;
              this.contacts[contactIndex].phone = options.phone;
              this.contacts[contactIndex].imageUrl = options.imageUrl;
              window.dispatchEvent(this.event);
            }
          }
        })
        .catch(error => console.error('Error updating contact:', error));
    }
    
}

export default ContactController;