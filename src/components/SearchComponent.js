import React, { Component, Fragment } from 'react'
import SearchField from './SearchField'
import SavedResults from './SavedResults'

export default class SearchComponent extends Component {

    render() {
        return (
            <Fragment>
                <SearchField />
                <SavedResults />
            </Fragment>
        )
    }
}
