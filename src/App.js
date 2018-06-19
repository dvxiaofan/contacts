import React, { Component } from 'react';
import ListContacts from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI';

class App extends Component {
  state = {
    contacts: []
  }

  // 在DOM插入之后立即调用此方法获取数据
  componentDidMount() {
    ContactsAPI.getAll().then((contacts) => {
      // 键值相同， 直接简写
      this.setState({ contacts });
    })    
  }

  // 删除联系人方法
  removeContact = (contact) => {
    // 调用 setState并传入当前state更新状态
    this.setState((state) => ({
      // 利用filter 过滤掉点击的contact， 把剩余的重新返回一个数组
      contacts: state.contacts.filter((c) => c.id !== contact.id)
    }))

    // 删除服务器数据
    ContactsAPI.remove(contact);
  }

  render() {
    return <div>
      <ListContacts onDeleteContact={this.removeContact} contacts={this.state.contacts}/>
    </div>
  }
}

export default App;
