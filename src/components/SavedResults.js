import React, { Component, Fragment } from 'react'
import { List, Display4, Row, Col, Card, Button } from 'bootstrap-4-react'
import cross from '../cross.svg'

class Book extends Component {

    createCover() {
        if (this.props.data.img) {
            return <img
                className="book-cover"
                src={this.props.data.img}
                alt={this.props.data.name} />
        }
        return <img
            className="book-cover"
            style={{height: '160px', objectFit: 'contain'}}
            src={"https://upload.wikimedia.org/wikipedia/commons/b/b9/No_Cover.jpg"}
            alt={this.props.data.name} />
    }

    render() {
        const book = this.props.data
        return (
            <Card style={{marginTop: '10px'}}>
                <Card.Body style={{paddingRight: '0px'}}>
                    <Row style={{width: '100%'}}>
                        <Col>{this.createCover()}</Col>
                        <Col col="col md-auto" style={{width: 'calc(100% - 200px)'}}>
                            <p className="book-name">{book.name} {book.author && <span style={{color: "#707070"}}>{book.author}</span>}</p>
                            { book.description && <p style={{color: "#707070"}}>{book.description}</p> }
                        </Col>
                        <Col>
                            <img onClick={this.props.delete} className="cross" style={{width: '16px', float: 'right'}} src={cross} alt="remove" />
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        )
    }
}

export default class SavedResults extends Component {
    constructor(prps) {
        super(prps)
        this.state = {
            books: []
        }
    }

    componentDidMount() {
        this.props.provider.addListener(this)
        this.updateSaved()
    }

    componentWillUnmount() {
        this.props.provider.removeListener(this)
    }

    savedUpdated() {
        this.updateSaved()
    }

    updateSaved() {
        this.props.provider.getSavedBooks()
            .then(data => {
                this.setState(state => { return { ...state, books: data } })
            })
    }

    removeBook(book) {
        this.props.provider.removeBook(book)
    }

    createNoBooksBlockIfNeeded() {
        if (this.state.books.length !== 0) {
            return null
        }
        return (
            <Card>
                <Card.Body>
                    <p style={{fontSize: '40px', textAlign: 'center', lineHeight: '150px'}}>=( Вы пока не добавили не одной книги</p>
                </Card.Body>
            </Card>
        )
    }

    sendBooksToServer() {

    }

    createGoToLentaButtonIfNeeded() {
        if (this.state.books.length === 0) {
            return null
        }
        return (
            <div style={{width: '100%'}}>
                <Button
                    style={{margin: '10px auto', display: 'block', fontSize: '20px'}}
                    onClick={this.sendBooksToServer.bind(this)}
                    warning>
                        Получить персонализированную выдачу!
                </Button>
            </div>
        )
    }

    render() {
        return (
            <Fragment>
                <Display4>Ваши добавленные книги:</Display4>
                <List unstyled>
                    { this.state.books.map((book, index) => {
                        return (
                            <List.Item key={index}>
                                <Book delete={this.removeBook.bind(this, book)} data={book} />
                            </List.Item>
                        )
                    })}
                    { this.createNoBooksBlockIfNeeded() }
                    { this.createGoToLentaButtonIfNeeded() }
                </List>
            </Fragment>
        )
    }
}
