import React, { Component } from 'react'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class ListContacts extends Component {
	// 利用proptypes 指定props 的类型和是否为必须
	static propTypes = {
		contacts: PropTypes.array.isRequired,
		onDeleteContact: PropTypes.func.isRequired
	}

	state = {
		query: ''
	}

	updatedQuery = (query) => {
		// 调用 setState()，合并新状态以更新组件的内部状态
		this.setState({ query: query.trim() })
	}

	render() {

		// 创建要显示的数据
		let showingContacts;
		if (this.state.query) {
			// 搜索框有内容的时候，用正则表达式匹配符合要求的数据
			const match = new RegExp(escapeRegExp(this.state.query), 'i');
			// 筛选数据
			showingContacts = this.props.contacts.filter((contact) => match.test(contact.name));
		} else {
			// 搜索框无内容， 显示原始数据
			showingContacts = this.props.contacts;
		}

		// 按名字首字母排序
		showingContacts.sort(sortBy('name'));

		return (
			<div className='list-contacts'>
				<div className='list-contacts-top'>
					<input 
						className='search-contacts' 
						type='text' 
						placeholder='Search contacts'
						value={this.state.query}
						// 事件监听器在每个 onChange 事件上触发 updateQuery() 函数
						onChange={(event) => this.updatedQuery(event.target.value)}
						/>
				</div>
				<ol className='contact-list'>
					{showingContacts.map((contact) => (
						// Each child in an array or iterator should have a unique "key" prop.
						<li key={contact.id} className='contact-list-item'>
							<div className='contact-avatar' style={{
								backgroundImage: `url(${contact.avatarURL})`
							}}/>
							<div className='contact-details'>
								<p>{contact.name}</p>
								<p>{contact.email}</p>
							</div>
							<button onClick={() => this.props.onDeleteContact(contact)} className='contact-remove'></button>
						</li>
					))}
				</ol>
			</div>
		)
	}
}

export default ListContacts
