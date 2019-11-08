import React from 'react';
import * as d3 from "d3-request";
import * as deck from '@deck.gl/core';
import * as layers from '@deck.gl/layers';
import * as luma from 'luma.gl';
import * as vega from 'vega-lib';
import { SandDance, SandDanceReact } from '@msrvida/sanddance-react';
SandDance.use(vega, deck, layers, luma);


// SandDance.use(vega, deck, layers, luma);


const chartList = ['barchart', 'density', 'grid', 'scatterplot', 'stacks']

const viewerOptions = {
  language:{
      headers: {
          chart: 'Grafik',
          details: 'Detaylar',
          legend: 'Legend',
          selection: 'Seç && Filterele'
      },
      bing: 'bing',
      newColorMap: 'remap color to filtered items',
      oldColorMap: 'Aynı Renkleri Tut',
      deselect: 'deselect',
      exclude: 'çıkar',
      isolate: 'isole',
      legendOther: 'diğer',
      nextDetail: '>',
      previousDetail: '<',
      reset: 'reset',
      colorBinCount: 'Color bin count',
      colorReverse: 'Color reverse',
      count: 'Sayi',
      scatterPointSize: 'Point size',
      XBinSize: 'X axis bin size',
      YBinSize: 'Y axis bin size',
      XGridSize: 'X grid size',
      YGridSize: 'Y grid size',
      InnerPaddingSize: 'Inner padding size',
      OuterPaddingSize: 'Outer padding size',
      treeMapMethod: 'Method',
      facetColumns: 'Facet columns',
      facetRows: 'Facet rows',
      textScaleSignal: "Text scale",
      xAxisTextAngleSignal: "X axis text angle",
      yAxisTextAngleSignal: "Y axis text angle",
      zScaleProportion: "Z scale proportion to Y",
      selectionCount: count => `${count} items selected`
  },
};

class SandDanceChart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            chartData: [],
            csvData: [],
            insight: {
                columns: {
                    color: 'Renkler',
                    sort: 'mySort',
                    uid: 'myUid',
                    x: 'x',
                    y: 'y',
                    z: 'z'
                },
                scheme: 'redblue',
                size: {
                    height: 1000,
                    width: 1000
                },
                chart: "barchart",
                view: "2d",
                signalValues: {
                    RoleZ_ProportionSignal:  2
                }
            },
            columns: [],
        };

        d3.csv('iller_csv_p.csv', (error, csvData) => {
            if (error) throw error;
            this.setState({csvData, columns: Object.keys(csvData[0])})
        })

    }


    onClickChartList = (e) => {
        let {insight} = this.state;
        insight.chart = e.target.value
        this.setState({insight})
    };

    onClickDimenisonRadioBtn = (e) => {
        e.target.cheched = true
        let {insight} = this.state;
        insight.view = e.target.value
        this.setState({insight})
    };

    onClickXAxis = (e) => {
        if (e.target.value !== this.state.x)
            this.setState({x: e.target.value})
    }

    onClickYAxis = (e) => {
        if (e.target.value !== this.state.y)
            this.setState({y: e.target.value})
    }

    onClickZAxis = (e) => {
        if (e.target.value !== this.state.z)
            this.setState({z: e.target.value})
    }

    onClickColor = (e) => {
        if (e.target.value !== this.state.color)
            this.setState({color: e.target.value})
    };

    onMount = (e) =>{
        // const lastChild = e.parentElement.children[1];
        // lastChild.style.display = 'none';
    }


    render() {

        let test = 10;

        setTimeout(()=> test = 555,1000)
        let myData = [];
        // if (this.state.csvData.length && this.state.color) {
        if (this.state.csvData.length ) {
            this.state.csvData.map((item, index) => myData.push({
                myUid: index,
                x: item[this.state.x],
                y: item[this.state.y],
                z: item[this.state.z],
                Renkler: item[this.state.color],
                mySort: index
            }))
        }
        return (
            <div>

                <div className="sanddance-left-input-menu">
                    <div>
                        <div className="text-center"><span className="font-weight-bold">Grafikler</span></div>
                        <div>
                            <select className="form-control" id="sanddance-chart-list" onClick={this.onClickChartList}>
                                {chartList.map((item, index) => <option key={`chartList-${index}`}
                                                                        value={item}>{item}</option>)}
                            </select>
                        </div>

                    </div>
                    <div className="mt-2">
                        <div className="text-center"><span className="font-weight-bold">Boyut</span></div>
                        <select className="form-control" id="sanddance-chart-list"
                                onClick={this.onClickDimenisonRadioBtn}>
                            <option key="option-2d" value="2d">2 Boyuylu</option>
                            <option key="option-3d" value="3d">3 Boyutlu</option>
                        </select>
                    </div>

                    <div className="mt-2">
                        <div className="text-center"><span className="font-weight-bold">X ekseni</span></div>
                        <div>
                            <select className="form-control" id="sanddance-x-list" onClick={this.onClickXAxis}>
                                {this.state.columns.map((item, index) => <option key={`x-${index}`}
                                                                                 value={item}>{item}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="mt-2">
                        <div className="text-center"><span className="font-weight-bold">Y ekseni</span></div>
                        <div>
                            <select className="form-control" id="sanddance-y-list" onClick={this.onClickYAxis}>
                                {this.state.columns.map((item, index) => <option key={`y-${index}`}
                                                                                 value={item}>{item}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="mt-2">
                        <div className="text-center"><span className="font-weight-bold">Z ekseni</span></div>
                        <div>
                            <select className="form-control" id="sanddance-z-list" onClick={this.onClickZAxis}>
                                {this.state.columns.map((item, index) => <option key={`z-${index}`}
                                                                                 value={item}>{item}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="mt-2">
                        <div className="text-center"><span className="font-weight-bold">Renk</span></div>
                        <div>
                            <select className="form-control" id="sanddance-color-list" onClick={this.onClickColor}>
                                {this.state.columns.map((item, index) => <option key={`color-${index}`}
                                                                                 value={item}>{item}</option>)}
                            </select>
                        </div>
                    </div>
                    {this.state.test}
                    {test}

                </div>
                <div>
                    <SandDanceReact data={myData} insight={this.state.insight} viewerOptions={viewerOptions} onMount={this.onMount}/>
                </div>

            </div>


        )
    }

}

export default SandDanceChart;
