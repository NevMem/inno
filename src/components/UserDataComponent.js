import React, { Component, Fragment } from 'react'
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react'
import { InputGroup, Form, Button, Alert, Card, Lead, Row, Col } from 'bootstrap-4-react'
import geocodingApi from '../api/GeocodingApi'

export class UserDataComponent extends Component {

    constructor(prps) {
        super(prps)
        this.state = {
            query: '',
            points: [],
            error: undefined,
            selectedAddress: undefined,
            stage: 'map', // can be map and age
            age: 23
        }
    }

    handleQueryChange(event) {
        if (event.target.value === undefined) {
            return
        }
        this.setState(state => { 
            return { ...state, query: event.target.value }
        })
    }

    onMarkerClick(address) {
        console.log(address)
        this.setState(state => {
            return {
                ...state,
                selectedAddress: address,
                stage: 'age'
            }
        })
    }

    handleError(message) {
        this.setState(state => {
            return { ...state, error: message }
        })
    }

    handleAdresses(result) {
        this.setState(state => {
            return {
                ...state,
                points: result.map(elem => {
                    return {
                        location: elem.geometry.location,
                        address: elem.formatted_address
                    }
                })
            }
        })
    }

    handleSearchClick() {
        geocodingApi.getPositionByAddress(this.state.query)
            .then(data => {
                if (data.status === "OK") {
                    this.handleError(undefined)
                    this.handleAdresses(data.results)
                } else {
                    this.handleError("Поиск не дал результатов")
                }
            })
    }

    moveBack() {
        this.setState(state => {
            return {
                ...state,
                stage: 'map'
            }
        })
    }

    generateSelectedAddressIfNeeded() {
        if (!this.state.selectedAddress) {
            return null
        }
        return (
            <Card style={{marginBottom: '20px', marginLeft: '100px', marginRight: '100px'}}>
                <Card.Header>Выбранный адрес</Card.Header>
                <Card.Body>
                    {this.state.selectedAddress.address}
                </Card.Body>
                <Card.Footer>
                    <Button secondary onClick={this.moveBack.bind(this)}>Я ошибся</Button>
                </Card.Footer>
            </Card>
        )
    }

    handleAgeChange(event) {
        this.setState(state => {
            return {
                ...state,
                age: event.target.value | 0
            }
        })
    }

    fetchDataToServer() {

    }

    generateStageRelatedContent() {
        if (this.state.stage === 'map') {
            const containerStyle = {
                position: 'relative',  
                width: '100%',
                height: '400px'
            }
            return (
                <Fragment>
                    <InputGroup mb="3" id="search">
                        <Form.Input
                            value={this.state.query}
                            onChange={this.handleQueryChange.bind(this)}
                            type="text"
                            placeholder="Введите ваш адрес" />
                        <InputGroup.Append>
                            <Button onClick={this.handleSearchClick.bind(this)} warning>Поиск</Button>
                        </InputGroup.Append>
                    </InputGroup>
                    {this.state.error && <Alert warning>{this.state.error}</Alert>}
                    <Map
                        google={this.props.google}
                        zoom={12}
                        containerStyle={containerStyle}
                        initialCenter={{
                            lat: 55.751574,
                            lng: 37.573856
                        }}>
                            {this.state.points.map((elem, index) => {
                                return (
                                    <Marker
                                        key={index}
                                        position={elem.location}
                                        onClick={this.onMarkerClick.bind(this, elem)} />
                                )
                            })}
                    </Map>
                </Fragment>
            )
        } else {
            return (
                <Fragment>
                    {this.generateSelectedAddressIfNeeded()}
                    <Row style={{paddingLeft: '100px', paddingRight: '100px'}}>
                        <Col>
                            <InputGroup mb="3">
                                <InputGroup.PrependText>
                                Ваш возраст:
                                </InputGroup.PrependText>
                                <Form.Input
                                    type="number" 
                                    value={this.state.age}
                                    onChange={this.handleAgeChange.bind(this)}
                                    aria-label="Age" />
                            </InputGroup>
                        </Col>
                    </Row>
                    <div style={{width: '100%'}}>
                        <Button
                            style={{margin: '0 auto', display: 'block'}}
                            onClick={this.fetchDataToServer.bind(this)}
                            warning>
                                Сохранить!
                        </Button>
                    </div>
                </Fragment>
            )
        }
    }

    render() {
        return (
            <Fragment>
                <Lead>Для хороших предсказний нам нужно знать ваш возраст и адрес:</Lead>
                {this.generateStageRelatedContent()}
            </Fragment>
        )
    }
}

export default GoogleApiWrapper({apiKey: 'AIzaSyCXVILzctXz8Piwa_EASrbmCvHmQTUSy_4', language: 'ru'})(UserDataComponent)
