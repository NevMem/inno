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

    filteredRows() {
        return this.props.rows.filter(elem => {
            if (this.state.filters.length === 0) {
                return true
            }
            return this.state.filters.indexOf(elem.type) !== -1
        })
    }

    render() {
        return (
            <Fragment>
                <Lead style={{marginTop: '20px'}}>Ваша персональная лента:</Lead>
                <div style={{marginBottom: '20px'}}>
                    <Chip value='Что почитать' onToggle={this.toggled.bind(this, 'book')} />
                    <span> </span>
                    <Chip style={{marginLeft: '20px'}} value='Куда сходить' onToggle={this.toggled.bind(this, 'event')} />
                </div>
                { this.filteredRows().map((elem, index) => {
                    return <LentaElement key={index + elem.name} data={elem} />
                })}
            </Fragment>
        )
    }
}
