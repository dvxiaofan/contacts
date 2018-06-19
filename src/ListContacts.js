import React, { Component } from 'react'
import PropTypes from 'prop-types'

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
		return (
			<div className='list-contacts'>
				{JSON.stringify(this.state)}
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
					{this.props.contacts.map((contact) => (
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
