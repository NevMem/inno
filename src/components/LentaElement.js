import React, { Component } from 'react'
import { Card, Row, Col } from 'bootstrap-4-react'
import like from '../like.svg'
import likeSet from '../like_set.svg'
import dislike from '../dislike.svg'
import dislikeSet from '../dislike_set.svg'

export default class LentaElement extends Component {
    
    constructor(prps) {
        super(prps)
        this.state = {
            likeState: 'none' // can be 'none', 'like', 'dislike'
        }
    }

    getLikeImage() {
        if (this.state.likeState === 'like') {
            return likeSet
        }
        return like
    }

    getDislikeImage() {
        if (this.state.likeState === 'dislike') {
            return dislikeSet
        }
        return dislike
    }

    handleLikeClick() {
        this.setState({ ...this.state, likeState: 'like' })
    }

    handleDislikeClick() {
        this.setState({ ...this.state, likeState: 'dislike' })
    }

    generateLikeDislikeBlock() {
        return (
            <Row>
                <Col onClick={this.handleLikeClick.bind(this)}>
                    <img
                        style={{width: '26px', display: 'block', margin: 'auto'}}
                        alt='like'
                        src={this.getLikeImage()} />
                </Col>
                <Col onClick={this.handleDislikeClick.bind(this)}>
                    <img
                        style={{width: '26px', display: 'block', margin: 'auto'}}
                        alt='dislike'
                        src={this.getDislikeImage()} />
                </Col>
            </Row>
        )
    }

    createImageBlockIfNeeded() {
        const data = this.props.data
        if (data.imgUrl) {
            return <img
                style={{marginLeft: '-20px', height: '320px', width: 'calc(100% + 40px)', objectFit: 'cover', marginBottom: '-20px'}}
                src={data.imgUrl}
                alt={data.description} />
        }
        return null
    }

    render() {
        const data = this.props.data
        return (
            <Card style={{marginTop: '10px'}}>
                <Card.Body>
                    <Card.Title>{data.name}</Card.Title>
                    <Card.Text>{data.description}</Card.Text>
                    {this.createImageBlockIfNeeded()}
                </Card.Body>
                <Card.Footer>
                    {this.generateLikeDislikeBlock()}
                </Card.Footer>
            </Card>
        )
    }
}
