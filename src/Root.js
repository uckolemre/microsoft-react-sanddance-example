import React from 'react';
import * as deck from '@deck.gl/core';
import * as layers from '@deck.gl/layers';
import * as luma from 'luma.gl';
import * as vega from 'vega-lib';
import { SandDance, SandDanceReact } from '@msrvida/sanddance-react';
import SandDanceChart from "./sanddance/SandDanceChart";
SandDance.use(vega, deck, layers, luma);

function getValue(i) {
    if (i < 200) return 0;
    if (i < 250) return 1;
    if (i < 350) return 2;
    return 3;
}
let data = [];
for (let i = 0; i < 700; i++) {
    let v = getValue(i);
    data.push({
        myUid: i,
        myX: v,
        myY: i,
        myZ: i,
        myColor: v,
        mySort: i,
    });
}
let insight = {
    columns: {
        color: 'myColor',
        sort: 'mySort',
        uid: 'myUid',
        x: 'myX',
        y: 'myY',
        z: 'myZ',
    },
    scheme: 'redblue',
    size: {
        height: 500,
        width: 500,
    },
    chart: 'barchart',
    view: '2d',
};

class Root extends React.Component {


    constructor(props) {
        super(props);


    }

    render() {

        console.log(insight)
        console.log(data)

        return (
            <div>
                <SandDanceChart/>
            </div>


        )
    }

}

export default Root;