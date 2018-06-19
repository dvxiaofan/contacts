import React from 'react'
import PropTypes from 'prop-types'

function ListContacts(props) {
	return (
		<ol className='contact-list'>
				{props.contacts.map((contact) => (
					// Each child in an array or iterator should have a unique "key" prop.
					<li key={contact.id} className='contact-list-item'>
						<div className='contact-avatar' style={{
							backgroundImage: `url(${contact.avatarURL})`
						}}/>
						<div className='contact-details'>
							<p>{contact.name}</p>
							<p>{contact.email}</p>
						</div>
						<button onClick={() => props.onDeleteContact(contact)} className='contact-remove'></button>
					</li>
				))}
      </ol>
	)
}
// 利用proptypes 指定props 的类型和是否为必须
ListContacts.propTypes = {
	contacts: PropTypes.array.isRequired,
	onDeleteContact: PropTypes.func.isRequired
}

export default ListContacts
