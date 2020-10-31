import React, { Component } from 'react'
import { InputGroup, Form, Button, Dropdown } from 'bootstrap-4-react'
import Loader from './Loader';

export default class SearchField extends Component {
    constructor(prps) {
        super(prps)
        this.state = {
            query: '',
            loading: false,
            suggests: [],
            requestCounter: 0
        }
    }

    handleQueryChange(event) {
        if (event.target.value === undefined) {
            return
        }
        this.setState(state => { 
            return { ...state, query: event.target.value }
        }, () => { this.querySuggests() })
    }

    handleLoading(value) {
        this.setState(state => { return { ...state, loading: value } })
    }

    querySuggests() {
        if (this.state.query.length !== 0) {
            const currentIndex = this.state.requestCounter + 1
            this.setState({...this.state, requestCounter: currentIndex})
            this.handleLoading(true)
            this.props.provider.querySuggests(this.state.query)
                .then(suggests => {
                    if (currentIndex === this.state.requestCounter) {
                        this.handleLoading(false)
                        this.setState(state => { return { ...state, suggests: suggests } })
                    }
                })
        } else {
            const currentIndex = this.state.requestCounter + 1
            this.setState({...this.state, requestCounter: currentIndex})
            this.setState(state => { return { ...state, suggests: [] } })
            this.handleLoading(false)
        }
    }

    hasSuggests() {
        return this.state.suggests.length !== 0 || this.state.loading
    }

    handleAddFromSuggest(book) {
        this.props.provider.saveBook(book)
            .then(() => {
                this.setState(state => {
                    return { ...state, query: '' }
                }, () => { this.querySuggests() })
            })
    }

    generateDropdownContent() {
        if (this.state.loading) {
            return <Loader />
        }
        return (
            this.state.suggests.map((elem, index) => {
                return <Dropdown.Item
                        onClick={this.handleAddFromSuggest.bind(this, elem)}
                        className="m-dropdown-item"
                        key={index}>
                        {elem.name} {elem.author && <span style={{color: '#909090'}}>{elem.author}</span>}
                    </Dropdown.Item>
            })
        )
    }

    render() {
        return (
            <Dropdown>
                <InputGroup mb="3" id="search">
                    <Form.Input value={this.state.query} onChange={this.handleQueryChange.bind(this)} type="text" placeholder="Название книги" />
                    <InputGroup.Append>
                        <Button warning>Поиск</Button>
                    </InputGroup.Append>
                </InputGroup>
                {this.hasSuggests() &&
                    <Dropdown.Menu className="m-dropdown-menu" style={{display: 'block', width: '100%'}} aria-labelledby="search">
                        {this.generateDropdownContent()}
                    </Dropdown.Menu>
                }
            </Dropdown>
        )
    }
}
