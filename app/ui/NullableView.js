// @flow

import React, {Component} from 'react';

type Props = {
    isShowing: boolean
}

type State = {}

export default class NullableView extends Component<Props, State>{
    render() {
        const {isShowing} = this.props
        if (!isShowing || !this.props.children) return null

        return this.props.children
    }
}