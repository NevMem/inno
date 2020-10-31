import React, { Component, Fragment } from 'react'
import SearchField from './SearchField'
import SavedResults from './SavedResults'
import searchData from '../data/SearchDataProvider';

export default class SearchComponent extends Component {

    constructor(prps) {
        super(prps)
        this.state = {
            data: searchData
        }
    }

    render() {
        return (
            <Fragment>
                <SearchField provider={this.state.data} />
                <SavedResults provider={this.state.data} />
            </Fragment>
        )
    }
}
