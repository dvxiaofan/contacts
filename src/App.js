import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ListContacts from './ListContacts';
import CreateContact from './CreateContact';
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
      contacts: state.contacts.filter(
        c => c.id !== contact.id
      )
    }))

    // 删除服务器数据
    ContactsAPI.remove(contact);
  }

  render() {
    return (
      <div className='app'>
      {/* exact 绝对匹配 */}
        <Route exact path='/' render={() => (
          <ListContacts 
            // 传递出去的属性和方法
            onDeleteContact={this.removeContact} 
            contacts={this.state.contacts}
          />
        )}/>
        {/* 新建联系人界面 */}
        <Route path='/create' component={CreateContact}/>
      </div>
    )
  }
}

export default App;
