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
		this.setState({ query: query.trim() });
	}

	// 清除搜索框内容
	clearQuery = () => {
		this.setState({ query: '' });
	}

	render() {
		// 对象结构
		const { contacts, onDeleteContact } = this.props;
		const { query } = this.state;

		// 创建要显示的数据
		let showingContacts;
		if (query) {
			// 搜索框有内容的时候，用正则表达式匹配符合要求的数据
			const match = new RegExp(escapeRegExp(query), 'i');
			// 筛选数据
			showingContacts = contacts.filter((contact) => match.test(contact.name));
		} else {
			// 搜索框无内容， 显示原始数据
			showingContacts = contacts;
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
						value={query}
						// 事件监听器在每个 onChange 事件上触发 updateQuery() 函数
						onChange={(event) => this.updatedQuery(event.target.value)}
					/>
					{/* 添加联系人按钮 */}
					<a 
						herf='#create'
						className='add-contact'
						onClick={this.props.onNavigate}	
					>Add Contact</a>						
				</div>

				{/* 搜索时的显示信息 */}
				{showingContacts.length !== contacts.length && (
					<div className='showing-contacts'>
						<span>Now Showing {showingContacts.length} of {contacts.length} total</span>
						<button onClick={this.clearQuery}>Show All</button>
					</div>
				)}

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
							<button onClick={() => onDeleteContact(contact)} className='contact-remove'></button>
						</li>
					))}
				</ol>
			</div>
		)
	}
}

export default ListContacts
