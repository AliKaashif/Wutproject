import React from 'react';
import ContactController from '../controllers/ContactController';

class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.edit) {
      this.state = {
        fName: this.props.contact.fName,
        lName: this.props.contact.lName,
        email: this.props.contact.email,
        phone: this.props.contact.phone,
        imageUrl: this.props.contact.imageUrl,
        id: this.props.contact.id,
        show: false,
        errors: {},
      };
    } else {
      this.state = {
        fName: '',
        lName: '',
        email: '',
        phone: '',
        imageUrl: '',
        show: false,
        errors: {},
      };
    }
    this.contacts = new ContactController();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.validateForm()) {
      if (this.props.edit) {
        let options = {
          fName: this.state.fName,
          lName: this.state.lName,
          email: this.state.email,
          phone: this.state.phone,
          imageUrl: this.state.imageUrl,
        };
        this.contacts.update(this.state.id, options);
      } else {
        this.contacts.add(
          this.state.fName,
          this.state.lName,
          this.state.email,
          this.state.phone,
          this.state.imageUrl
        );
        this.setState({
          fName: '',
          lName: '',
          email: '',
          phone: '',
          imageUrl: '',
        });
      }
      console.log(this.contacts.getAll());
      this.hideModal();
    }
  }

  validateForm() {
    let fields = this.state;
    let errors = {};
    let formIsValid = true;

    // Validate first name
    if (!fields['fName']) {
      formIsValid = false;
      errors['fName'] = 'Please enter a first name';
    }

    // Validate last name
    if (!fields['lName']) {
      formIsValid = false;
      errors['lName'] = 'Please enter a last name';
    }

    // Validate phone number
    if (!fields['phone']) {
      formIsValid = false;
      errors['phone'] = 'Please enter a phone number';
    } else if (!/^\d{10}$/.test(fields['phone'])) {
      formIsValid = false;
      errors['phone'] = 'Please enter a 10-digit phone number';
    }

    // Validate email
    if (!fields['email']) {
      formIsValid = false;
      errors['email'] = 'Please enter an email address';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(fields['email'])
    ) {
      formIsValid = false;
      errors['email'] = 'Please enter a valid email address';
    }

    this.setState({
      errors: errors,
    });

    return formIsValid;
  }

  showModal() {
    console.log('show');
    this.setState({
      show: true,
    });
  }

  hideModal() {
    this.setState({
      show: false,
      errors: {},
    });
  }
  
  render() {
    let modal_title;
  
    if (this.props.edit) {
      modal_title = 'Update Contact';
    } else {
      modal_title = 'Add Contact';
    }
  
    let modal;
  
    if (this.state.show) {
      modal = (
        <div className="modal fade show">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modal_title}</h5>
                <button
                  onClick={this.hideModal}
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={this.handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">First Name:</label>
                    <input
                      className="form-control"
                      name="fName"
                      type="text"
                      value={this.state.fName}
                      onChange={this.handleChange}
                    />
                    <span className="text-danger">{this.state.errors['fName']}</span>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Last Name:</label>
                    <input
                      className="form-control"
                      name="lName"
                      type="text"
                      value={this.state.lName}
                      onChange={this.handleChange}
                    />
                    <span className="text-danger">{this.state.errors['lName']}</span>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email:</label>
                    <input
                      className="form-control"
                      name="email"
                      type="text"
                      value={this.state.email}
                      onChange={this.handleChange}
                    />
                    <span className="text-danger">{this.state.errors['email']}</span>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Phone #:</label>
                    <input
                      className="form-control"
                      name="phone"
                      type="text"
                      value={this.state.phone}
                      onChange={this.handleChange}
                    />
                    <span className="text-danger">{this.state.errors['phone']}</span>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Upload Image:</label>
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={this.handleImageUpload}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  onClick={this.hideModal}
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button onClick={this.handleSubmit} type="submit" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  
    return (
      <div>
        <button className="btn btn-primary" onClick={this.showModal}>
          {this.props.openText}
        </button>
        {modal}
      </div>
    );
  }
  }
  
  export default ContactForm;
  