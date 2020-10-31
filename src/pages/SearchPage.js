import React, { Component } from 'react'
import SearchComponent from '../components/SearchComponent'
import { Container } from 'bootstrap-4-react'

export default class SearchPage extends Component {
    render() {
        return (
            <Container style={{padding: '50px'}}>
                <SearchComponent />
            </Container>
        )
    }
}
