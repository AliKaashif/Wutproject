class Contact {
  constructor(id = null, first_name, last_name, email, phone, imageUrl) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.imageUrl = imageUrl;
  }

  update( options ){
    if(options.fName) this.first_name = options.fName;
    if(options.lName) this.last_name = options.lName;
    if(options.email) this.email = options.email;
    if(options.phone) this.phone = options.phone;
    if(options.imageUrl) this.phone = options.imageUrl;
    return this;
  }

  save() {
    return true;
  }
}

export default Contact;