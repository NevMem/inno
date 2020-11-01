import React, { Component } from 'react'
import SearchComponent from '../components/SearchComponent'
import { Container } from 'bootstrap-4-react'
import Sidebar from '../components/SIdebar'

export default class SearchPage extends Component {
    render() {
        return (
            <Container style={{padding: '50px'}}>
                <Sidebar />
                <SearchComponent />
            </Container>
        )
    }
}
