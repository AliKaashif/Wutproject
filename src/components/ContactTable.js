import React from 'react';
import ContactRow from "./ContactRow";
import ContactController from '../controllers/ContactController';

/** 
 * This renders a list of contacts. Upon the event
 * 'contactChange' it will refresh the list.
 */

class ContactTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      error: null,
      sortType: 'asc',
      searchQuery: '',
    };
    this.contactController = new ContactController();
    this.sortContacts = this.sortContacts.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  componentDidMount() {
    this.contactController.getAll()
      .then(data => {
        if (Array.isArray(data)) {
          this.setState({ contacts: data }, () => {
            this.sortContacts('fName'); // Sort by first name in ascending order
          });
        } else {
          this.setState({ error: 'Error fetching contacts.' });
        }
      })
      .catch(error => {
        console.error('Error fetching contacts:', error);
        this.setState({ error: 'Error fetching contacts.' });
      });
  }

  sortContacts() {
    const contacts = [...this.state.contacts];
    contacts.sort((a, b) => {
      const firstNameA = a.firstName || '';
      const firstNameB = b.firstName || '';
      return firstNameA.localeCompare(firstNameB);
    });
    this.setState({ contacts });
  }
  
  handleSearchChange(event) {
    this.setState({
      searchQuery: event.target.value.toLowerCase(),
    });
  }

  render() {
    if (this.state.error) {
      return <div>{this.state.error}</div>;
    }
  
    let filteredContacts = [...this.state.contacts];
    if (this.state.searchQuery) {
      console.log('Search query:', this.state.searchQuery);
      filteredContacts = filteredContacts.filter(contact => {
        const firstName = contact.firstName ? contact.firstName.toLowerCase() : '';
        const lastName = contact.lastName ? contact.lastName.toLowerCase() : '';
        const searchQuery = this.state.searchQuery;
        console.log('First name:', firstName);
        console.log('Last name:', lastName);
        console.log('Matching:', firstName.includes(searchQuery) || lastName.includes(searchQuery));
        return (
          firstName.includes(searchQuery) ||
          lastName.includes(searchQuery)
        );
      });
    }
    console.log('Filtered contacts:', filteredContacts);
  
    return (
      <div>
        <input type="text" onChange={this.handleSearchChange} placeholder="Search by first name" />
        <table className='table'>
          <thead>
            <tr className="contact-row">
              <th>Image</th>
              <th>
                <button onClick={() => this.sortContacts('fName')}>
                  First Name
                  {this.state.sortType === 'asc' ? ' ▲' : ' ▼'}
                </button>
              </th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone #</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.map((contact, i) => {
              return (<ContactRow key={contact.id} contact={contact}/>);
            })}
          </tbody>
        </table>
      </div>
    );
  }
  
  
}

export default ContactTable;
