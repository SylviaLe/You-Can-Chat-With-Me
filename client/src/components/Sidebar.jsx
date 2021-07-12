import React, { useState } from 'react'
import { Tab, Nav, Button, Modal } from 'react-bootstrap'
import Conversations from './Conversations'
import Contacts from './Contacts'
import NewContactModal from './NewContactModal'
import NewConversationModal from './NewConversationModal'

const CONVERSATIONS_KEY = 'conversations'
const CONTACT_KEY = 'contacts'

export default function Sidebar({ id }) {

    const [activeKey, setActiveKey] = useState(CONVERSATIONS_KEY)
    const [modalOpen, setModalOpen] = useState(false)  //by default the modal is close. clicking the button will set it to true, then take the site to the modal

    const converseOpen = activeKey === CONVERSATIONS_KEY  //check if the conversation panel is open

    function closeModal(){
        setModalOpen(false)  //close the modal with an x
    }

    return (
        <div style={{width: "250px"}} className='d-flex flex-column'>
            <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
                <Nav variant='tabs' className='justify-content-center'>
                    <Nav.Item>
                        <Nav.Link eventKey={CONVERSATIONS_KEY}>
                            Conversations
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey={CONTACT_KEY}>
                            Contacts
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
                {/* the content inside each tab */}
                <Tab.Content className="border-end overflow-auto flex-grow-1">
                    <Tab.Pane eventKey={CONVERSATIONS_KEY}>
                        <Conversations />
                    </Tab.Pane>
                    <Tab.Pane eventKey={CONTACT_KEY}>
                        <Contacts />
                    </Tab.Pane>
                </Tab.Content>
                <div className="p-2 border-top border-end small">
                    Your id: <span className="text-muted">{id}</span>
                </div>
                <Button className="w-100 rounded-0" onClick={() => setModalOpen(true)}>New {converseOpen ? 'Conversation' : 'Contact'}</Button>
            </Tab.Container>

            <Modal show={modalOpen} onHide={closeModal}>
                {/* https://www.google.com/search?q=react+modal&oq=react+modal&aqs=chrome..69i57j0l9.3337j0j7&sourceid=chrome&ie=UTF-8 */}
                {converseOpen ? 
                    <NewConversationModal closeModal={closeModal}/>  :
                    <NewContactModal closeModal={closeModal}/>
                }
            </Modal>
        </div>
    )
}
