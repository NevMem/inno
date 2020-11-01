import React, { Component } from 'react'

export default class Chip extends Component {
    constructor(prps) {
        super(prps)
        this.state = {
            enabled: false
        }
    }

    toggle() {
        this.setState(state => {
            return { ...state, enabled: !state.enabled }
        }, () => {
            this.props.onToggle(this.state.enabled)
        })
    }

    render() {
        return <span
                className={'chip' + (this.state.enabled ? ' chip-enabled' : '')}
                onClick={this.toggle.bind(this)}>
                    {this.props.value}
            </span>
    }
}
