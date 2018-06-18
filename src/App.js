import React, { Component } from 'react';

class ContactsList extends Component {
  render() {
    const people = this.props.contacts;

    return <ol>
      {people.map(person => (
        <li key={person.name}>{person.name}</li>
      ))}
    </ol>
  }
}
class App extends Component {
  render() {
    return (
      <div className="App">
        <ContactsList contacts={[
          {name: 'xiaoming'},
          {name: 'xiaofan'},
          {name: 'hehehaha'}
        ]}/>
        <ContactsList contacts={[
          {name: 'meixi'},
          {name: 'cluo'}
        ]}/>
      </div>
    );
  }
}

export default App;
