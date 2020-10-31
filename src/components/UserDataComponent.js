import React, { Component, Fragment } from 'react'
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react'
import { InputGroup, Form, Button, Alert, Card, Lead, Row, Col } from 'bootstrap-4-react'
import geocodingApi from '../api/GeocodingApi'
import backendApi from '../api/BackendApi'

export class UserDataComponent extends Component {

    constructor(prps) {
        super(prps)
        this.state = {
            query: '',
            points: [],
            error: undefined,
            selectedAddress: undefined,
            stage: 'map', // can be map and age
            age: 23,
            loading: undefined,
            message: undefined
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
        this.handleSuccess(undefined)
        this.setState(state => {
            return {
                ...state,
                selectedAddress: address,
                stage: 'age'
            }
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
        this.handleLoading("Ищем возможные результаты")
        geocodingApi.getPositionByAddress(this.state.query)
            .then(data => {
                if (data.status === "OK") {
                    this.handleSuccess("Нашлось " + data.results.length + " результатов")
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

    handleError(message) {
        this.setState(state => {
            return { ...state, error: message, loading: undefined, message: undefined }
        })
    }

    handleLoading(message) {
        this.setState(state => {
            return { ...state, loading: message, error: undefined, message: undefined }
        })
    }

    handleSuccess(message) {
        this.setState(state => {
            return { ...state, message: message, error: undefined, loading: undefined }
        })
    }

    sendDataToServer() {
        this.handleLoading("Сохраняем данные на сервере")
        backendApi.saveUserData({
            age: this.state.age,
            location: this.state.selectedAddress.location,
            address: this.state.selectedAddress.address})
            .then(data => {
                console.log(data)
                this.handleSuccess("Данные успешно сохранены")
            })
            .catch(err => {
                console.log(err)
                this.handleError("Что-то пошло не так((")
            })
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
                    {this.state.message && <Alert success>{this.state.message}</Alert>}
                    {this.state.loading && <Alert info>{this.state.loading}</Alert>}
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
                            {this.state.error && <Alert warning>{this.state.error}</Alert>}
                            {this.state.message && <Alert success>{this.state.message}</Alert>}
                            {this.state.loading && <Alert info>{this.state.loading}</Alert>}
                        </Col>
                    </Row>
                    <div style={{width: '100%'}}>
                        <Button
                            style={{margin: '0 auto', display: 'block'}}
                            onClick={this.sendDataToServer.bind(this)}
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
