import React, { Component, Fragment } from 'react'
import LentaElement from './LentaElement.js'
import { Lead, Card, Row, Col } from 'bootstrap-4-react'
import Chip from './Chip.js'
import Loader from './Loader.js'
import { Link } from 'react-router-dom'

export default class Lenta extends Component {
    constructor(prps) {
        super(prps)
        this.state = {
            filters: []
        }
    }

    toggled(type, value) {
        this.setState(state => {
            let filters = []
            state.filters.forEach(elem => { filters.push(elem) })
            if (value) {
                filters.push(type)
            } else {
                filters.splice(filters.indexOf(type), 1)
            }
            return {
                ...state,
                filters: filters
            }
        })
    }

    filteredRows() {
        return this.props.rows.filter(elem => {
            if (this.state.filters.length === 0) {
                return true
            }
            return this.state.filters.indexOf(elem.type) !== -1
        })
    }

    generateLenta() {
        if (this.props.loaded) {
            if (this.props.rows.length > 0) {
                return (
                    <Fragment>
                        <div style={{marginBottom: '20px'}}>
                            <Chip value='Что почитать' onToggle={this.toggled.bind(this, 'book')} />
                            <span> </span>
                            <Chip style={{marginLeft: '20px'}} value='Куда сходить' onToggle={this.toggled.bind(this, 'event')} />
                        </div>
                        { this.filteredRows().map((elem, index) => {
                            return <LentaElement key={index + elem.name} data={elem} />
                        })}
                    </Fragment>
                )
            } else {
                return (
                    <Card>
                        <Card.Body>
                            <Lead style={{textAlign: 'center', fontSize: '24px'}}>
                                Мало информации о ваших предпочтениях
                                Пожалуйста добавьте чуть больше данных
                            </Lead>
                            <Row style={{display: 'flex', justifyContent: 'center'}}>
                                <Col style={{display: 'flex', justifyContent: 'center'}}>
                                    <Link className="as-button" to="/userData">Мои данные!</Link>
                                    <Link className="as-button" style={{marginLeft: '20px'}} to="/search">Еще книги!</Link>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                )
            }
        } else if (this.props.loading) {
            return (
                <Card>
                    <Card.Body>
                        <Lead style={{textAlign: 'center', fontSize: '24px'}}>Подбираем рекомендации на основе ваших предпочтений</Lead>
                        <Loader />
                    </Card.Body>
                </Card>
            )
        }
    }

    render() {
        return (
            <Fragment>
                <Lead style={{marginTop: '20px'}}>Ваша персональная лента:</Lead>
                {this.generateLenta()}
            </Fragment>
        )
    }
}
