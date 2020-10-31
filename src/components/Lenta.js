import React, { Component } from 'react'
import LentaElement from './LentaElement.js'

export default class Lenta extends Component {
    constructor(prps) {
        super(prps)
        this.state = {}
    }

    render() {
        return (
            this.props.rows.map((elem, index) => {
                return <LentaElement key={index} data={elem} />
            })
        )
    }
}
