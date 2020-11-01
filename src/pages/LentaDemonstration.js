import React, { Component } from 'react'
import { Container, Row, Col } from 'bootstrap-4-react'
import Lenta from '../components/Lenta.js'
import DataProvider from '../data/DataProvider'
import Sidebar from '../components/SIdebar.js';

export default class LentaDemonstration extends Component {
    constructor(prps) {
        super(prps)
        this.state = {
            rows: [],
            loading: false,
            loaded: false
        }
    }

    componentDidMount() {
        this.setState({ ...this.state, loading: true  })
        new DataProvider().loadData().then(data => {
            this.setState({ ...this.state, rows: data, loading: false, loaded: true })
        })
        .catch(err => {
            this.setState({ ...this.state, rows: [], loading: false, loaded: true })
        })
    }

    render() {
        return (
            <Container>
                <Sidebar />
                <Row>
                    <Col col="col lg-2"/>
                    <Col style={{paddingLeft: '100px', paddingRight: '100px', paddingBottom: '50px'}}>
                        <Lenta rows={this.state.rows} loading={this.state.loading} loaded={this.state.loaded} />
                    </Col>
                    <Col col="col lg-2"/>
                </Row>
            </Container>
        )
    }
}
