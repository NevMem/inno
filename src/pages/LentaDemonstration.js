import React, { Component } from 'react'
import { Container, Row, Col } from 'bootstrap-4-react'
import Lenta from '../components/Lenta.js'
import DataProvider from '../data/DataProvider'

export default class LentaDemonstration extends Component {
    constructor(prps) {
        super(prps)
        this.state = {
            rows: []
        }
    }

    componentDidMount() {
        new DataProvider().loadData().then(data => {
            this.setState({ ...this.state, rows: data })
        })
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col col="col lg-2"/>
                    <Col>
                        <Lenta rows={this.state.rows} />
                    </Col>
                    <Col col="col lg-2"/>
                </Row>
            </Container>
        )
    }
}
