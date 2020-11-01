import React, { Component, Fragment } from 'react'
import LentaElement from './LentaElement.js'
import { Lead } from 'bootstrap-4-react'
import Chip from './Chip.js';

export default class Lenta extends Component {
    constructor(prps) {
        super(prps)
        this.state = {
            filters: []
        }
    }

    toggled(type, value) {
        this.setState(state => {
            let filters = []
            state.filters.forEach(elem => { filters.push(elem) })
            if (value) {
                filters.push(type)
            } else {
                filters.splice(filters.indexOf(type), 1)
            }
            return {
                ...state,
                filters: filters
            }
        })
    }

    render() {
        return (
            <Fragment>
                <Lead style={{marginTop: '20px'}}>Ваша персональная лента:</Lead>
                <div>
                    <Chip value='Что почитать' onToggle={this.toggled.bind(this, 'books')} />
                </div>
                { this.props.rows.map((elem, index) => {
                    return <LentaElement key={index + elem.name} data={elem} />
                })}
            </Fragment>
        )
    }
}
