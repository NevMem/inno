import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Container } from 'bootstrap-4-react'

export default class MainPage extends Component {
    render() {
        return (
            <Container>
                <hr/>
                <Link to="/lenta">Show lenta</Link>
                <hr />
                <Link to="/search">Show search</Link>
                <hr/>
                <Link to="/userData">Ввести данные</Link>
            </Container>
        )
    }
}
