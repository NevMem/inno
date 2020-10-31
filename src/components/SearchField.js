import React, { Component } from 'react'
import { InputGroup, Form, Button, Dropdown } from 'bootstrap-4-react'

export default class SearchField extends Component {
    constructor(prps) {
        super(prps)
        this.state = {
            query: '',
            suggests: []
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

    querySuggests() {
        this.props.provider.querySuggests(this.state.query)
            .then(suggests => {
                this.setState(state => { return { ...state, suggests: suggests } })
            })
    }

    hasSuggests() {
        return this.state.suggests.length !== 0
    }

    handleAddFromSuggest(book) {
        this.props.provider.saveBook(book)
            .then(() => {
                this.setState(state => {
                    return { ...state, query: '' }
                }, () => { this.querySuggests() })
            })
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
                    <Dropdown.Menu style={{display: 'block', width: '100%'}} aria-labelledby="search">
                        {this.state.suggests.map((elem, index) => {
                            return <Dropdown.Item
                                    onClick={this.handleAddFromSuggest.bind(this, elem)}
                                    key={index}>
                                    {elem.name}
                                </Dropdown.Item>
                        })}
                    </Dropdown.Menu>
                }
                
            </Dropdown>
        )
    }
}
