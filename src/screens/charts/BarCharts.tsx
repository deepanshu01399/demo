import React from 'react';
import {
  ScrollView, StyleSheet,  View, processColor, ProcessedColorValue
} from 'react-native';
import { connect } from 'react-redux';
import MainView from '../MainView';
import { BarChart, LineChart, PieChart } from 'react-native-charts-wrapper';

const LineCharts = (props: any) => {
 
  let bar={
    title: 'Sales motor in Indonesia',
    detail: { 
      time_value_list: ['2010', 
      '2011', '2012', '2013', '2014', '2015', '2016', '2017'],
      legend_list: ['Honda', 'Yamaha', 'Suzuki', 'Kawasaki'],
      dataset: {
        Honda: {
          '2010': 3800,
          '2011': 4500,
          '2012': 5400,
          '2013': 6000,
          '2014': 7000,
          '2015': 7800,
          '2016': 8600,
          '2017': 9000
        },
        Yamaha: {
          '2010': 3500,
          '2011': 4000,
          '2012': 4600,
          '2013': 5000,
          '2014': 5600,
          '2015': 6700,
          '2016': 7700,
          '2017': 8900,
        },
        Suzuki: {
          '2010': 4500,
          '2011': 5000,
          '2012': 5600,
          '2013': 6600,
          '2014': 7400,
          '2015': 8000,
          '2016': 8500,
          '2017': 9100
        },
        Kawasaki: {
          '2010': 3000,
          '2011': 3500,
          '2012': 4100,
          '2013': 4900,
          '2014': 5600,
          '2015': 6500,
          '2016': 7600,
          '2017': 8500
        }
      }
    }
  }

  
  
  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  
    const style1 = {
      barWidth: 0.1,
      groupSpace: 0.2
    }
    const style2 = {
      barWidth: 0.2,
      groupSpace: 0.1
    }
    const style3 = {
      barWidth: 0.3,
      groupSpace: 0.2
    }

    const time = bar.detail.time_value_list
    const legend = bar.detail.legend_list
    const dataset:any = bar.detail.dataset

    var dataSetsValue: { values: number[]; label: string; config: { drawValues: boolean; colors: (ProcessedColorValue | null | undefined)[]; }; }[] = []
    var dataStyle = {}
    var legendStyle = {}
    var descStyle = {}
    var xAxisStyle = {}
    var chooseStyle:any = {}
    var valueLegend = []
    var colorLegend = []

    if (legend.length === 4) {
      chooseStyle = style1
    } else if (legend.length === 3) {
      chooseStyle = style2
    } else if (legend.length === 2) {
      chooseStyle = style3
    }

    legend.map((legendValue:any) => {
      var valueLegend: number[] = []

      time.map((timeValue) => {
        const datasetValue = dataset[legendValue]
        const datasetTimeValue = datasetValue[timeValue]

        valueLegend.push(parseInt(datasetTimeValue))
      })

      const datasetObject = {
        values: valueLegend,
        label: legendValue,
        config: {
          drawValues: false,
          colors: [processColor(getRandomColor())]
        }
      }
      dataSetsValue.push(datasetObject)
    })

    legendStyle = {
      enabled: true,
      textSize: 14,
      form: 'SQUARE',
      formSize: 14,
      xEntrySpace: 10,
      yEntrySpace: 5,
      wordWrapEnabled: true
    }
    dataStyle = {
      dataSets: dataSetsValue,
      config: {
        barWidth: chooseStyle.barWidth, // 0.1
        group: {
          fromX: 0,
          groupSpace: chooseStyle.groupSpace, // 0.2
          barSpace: 0.1
        }
      }
    }
    xAxisStyle = {
      valueFormatter: time,
      granularityEnabled: true,
      granularity: 1,
      axisMaximum: 5,
      axisMinimum: 0,
      centerAxisLabels: true
    }

  return (
    <MainView>
      <View style={{flex:1, marginBottom: 20 }}>

      <BarChart
        style={{flex:1}}
        xAxis={xAxisStyle}
        chartDescription={{ text: '' }}
        data={dataStyle}
        legend={legendStyle}
        drawValueAboveBar={false}
      />
        
      </View>
    </MainView>
  );
};

interface stateProps {
  commonReducer: any;
  isLoading: boolean;
  error: string;
}

const mapStateToProps = (state: stateProps) => {
  return {
    isLoading: state.commonReducer.isLoading,
    error: state.commonReducer.error,

  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {

  };
};


export default connect(mapStateToProps, mapDispatchToProps)(LineCharts);

const styles = StyleSheet.create({
  constainerStyle: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    marginVertical: 3,
    borderRadius: 10,
  },

});
