import React, { Component } from 'react'
import { InputGroup, Form, Button } from 'bootstrap-4-react'

export default class SearchField extends Component {
    constructor(prps) {
        super(prps)
        this.state = {
            query: ''
        }
    }

    handleQueryChange(event) {
        this.setState(state => { 
            return { ...state, query: event.value }
        }, () => { this.querySuggests() })
    }

    querySuggests() {
        
    }

    render() {
        return (
            <InputGroup mb="3">
                <Form.Input value={this.state.query} onChange={this.handleQueryChange.bind(this)} type="text" placeholder="Название книги" />
                <InputGroup.Append>
                    <Button warning>Поиск</Button>
                </InputGroup.Append>
            </InputGroup>
        )
    }
}
