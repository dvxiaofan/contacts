import React, { Component } from 'react';
import ListContacts from './ListContacts';

class App extends Component {
  state = {
    contacts: [
      {
        "id": "ryan",
        "name": "Ryan Florence",
        "email": "ryan@reacttraining.com",
        "avatarURL": "http://localhost:5001/ryan.jpg"
      },
      {
        "id": "michael",
        "name": "Michael Jackson",
        "email": "michael@reacttraining.com",
        "avatarURL": "http://localhost:5001/michael.jpg"
      },
      {
        "id": "tyler",
        "name": "Tyler McGinnis",
        "email": "tyler@reacttraining.com",
        "avatarURL": "http://localhost:5001/tyler.jpg"
      }
    ]
  }

  // 删除联系人方法
  removeContact = (contact) => {
    // 调用 setState并传入当前state更新状态
    this.setState((state) => ({
      // 利用filter 过滤掉点击的contact， 把剩余的重新返回一个数组
      contacts: state.contacts.filter((c) => c.id !== contact.id)
    }))
  }

  render() {
    return <div>
      <ListContacts onDeleteContact={this.removeContact} contacts={this.state.contacts}/>
    </div>
  }
}

export default App;
