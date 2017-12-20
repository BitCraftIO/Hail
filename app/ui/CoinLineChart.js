import React from 'react';
import PropTypes from 'prop-types';
import { VictoryLine } from "victory-native";

export default class CoinLineChart extends React.Component {

    static propTypes = {
        dates: PropTypes.array.isRequired,
        values: PropTypes.array.isRequired
    }

    constructor(props) {
        super();

        const vals = props.values;
        const increasing = (vals[0] - vals[vals.length -1]) > 0;

        const data = props.dates.map((item, index) => {
            return {x: props.values[index], y: item};
        });

        this.state = {
            data: data,
            isIncreasing: increasing
        }
    }

    render() {
        const renderingColor = this.state.isIncreasing ? "#02c9a1" : "#d25035";
        return (
            <VictoryLine
                scale={{y:"time", x: "log"}}
                style={{data: { stroke: renderingColor }}}
                data={this.state.data}/>
        );
    }
}