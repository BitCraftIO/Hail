import React from 'react';
import PropTypes from 'prop-types';
import { LineChart } from 'react-native-svg-charts'
import * as shape from 'd3-shape';

export default class CoinLineChart extends React.Component {

    static propTypes = {
        dates: PropTypes.array.isRequired,
        values: PropTypes.array.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number,
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

    // https://github.com/JesperLekland/react-native-svg-charts#extras
    // https://medium.com/the-react-native-log/animated-charts-in-react-native-using-d3-and-art-21cd9ccf6c58
    // http://hswolff.com/blog/react-native-art-and-d3/
    // https://github.com/hswolff/BetterWeather/blob/master/js/weather/WeatherGraph.js
    // https://cmichel.io/charts-in-react-native-svg-and-d3-js/

    render() {
        const renderingColor = this.state.isIncreasing ? "#02c9a1" : "#d25035";
        const shadowColor = this.state.isIncreasing ? "#028a6c" : "#9E452A";
        return (
            <LineChart
                style={{ height: this.state.height || 100, width:this.props.width}}
                dataPoints={ this.props.values }
                showGrid={false}
                fillColor={ renderingColor }
                svg={ {
                    stroke: renderingColor,
                }}
                // shadowSvg={{
                //     stroke: shadowColor
                // }}
                // shadowOffset={2}
                curve={shape.curveLinear}
            />
        );
    }
}