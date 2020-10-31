import React, { Component, Fragment } from 'react'
import { List, Display4 } from 'bootstrap-4-react'

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

    render() {
        return (
            <Fragment>
                <Display4>Ваши добавленные книги:</Display4>
                <List unstyled>
                    { this.state.books.map((book, index) => {
                        return (
                            <List.Item key={index}>
                                {book.name}
                            </List.Item>
                        )
                    })}
                </List>
            </Fragment>
        )
    }
}
