import React, { Component } from 'react'
import { Container, Row, Col } from 'bootstrap-4-react'
import UserDataComponent from '../components/UserDataComponent'
import Sidebar from '../components/Sidebar'

export default class UserDataPage extends Component {
    render() {
        return (
            <Container style={{paddingTop: '50px'}}>
                <Row>
                    <Col style={{paddingLeft: '120px', paddingRight: '120px'}}>
                        <UserDataComponent />
                    </Col>
                </Row>
                <Sidebar />
            </Container>
        )
    }
}
