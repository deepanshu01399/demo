import React from 'react';
import {
  ScrollView, StyleSheet,  View, processColor, ProcessedColorValue
} from 'react-native';
import { connect } from 'react-redux';
import MainView from '../MainView';
import { BarChart, LineChart, PieChart } from 'react-native-charts-wrapper';

const LineCharts = (props: any) => {
 
  let line= {
    title: 'Development smartphone in Indonesia',
    detail: { 
      time_value_list: ['2011', '2012', '2013', '2014', '2015', '2016','2017'],
      legend_list: ['Samsung', 'Apple', 'Sony','mi'],
      dataset: {
        Samsung: {
          '2011': 371,
          '2012': 8112,
          '2013': 8806,
          '2014': 6954,
          '2015': 1097,
          '2016': 8332,
          '2017':9999,
        },
        Apple: {
          '2011': 7151,
          '2012': 5664,
          '2013': 2404,
          '2014': 3744,
          '2015': 2832,
          '2016': 5539,
          '2017':9999,

        },
        Sony: {
          '2011': 7564,
          '2012': 2172,
          '2013': 1167,
          '2014': 3844,
          '2015': 759,
          '2016': 5752,
          '2017':9999,

        },
        mi: {
          '2011': 2222,
          '2012': 3333,
          '2013': 4444,
          '2014': 6954,
          '2015': 1097,
          '2016': 8332,
          '2017':9999,
        },
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
  const time =line.detail.time_value_list
  const legend =line.detail.legend_list
  const dataset:any =line.detail.dataset

  var dataSetsValue:any[] = []
  var dataStyle = {}
  var legendStyle = {}
  var descStyle = {}
  var xAxisStyle = {}
  var chooseStyle = {}
  var valueLegend = []
  var colorLegend = []

  legend.map((legendValue) => {
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
        lineWidth: 1,
        drawCubicIntensity: 0.4,
        circleRadius: 5,
        drawHighlightIndicators: false,
        color: processColor(getRandomColor()),
        drawFilled: true,
        fillColor: processColor(getRandomColor()),
        fillAlpha: 45,
        circleColor: processColor(getRandomColor()),
        drawValues: false
      }
    }
    dataSetsValue.push(datasetObject)
  })

  legendStyle = {
    enabled: true,
    textColor: processColor('blue'),
    textSize: 12,
    position: 'BELOW_CHART_RIGHT',
    form: 'SQUARE',
    formSize: 14,
    xEntrySpace: 10,
    yEntrySpace: 5,
    formToTextSpace: 5,
    wordWrapEnabled: true,
    maxSizePercent: 0.5
  }
  dataStyle = {
    dataSets: dataSetsValue
  }
  xAxisStyle = {
    valueFormatter: time
  }
  const markers = {
    enabled: true,
    digits: 2,
    backgroundTint: processColor('teal'),
    markerColor: processColor('#F0C0FF8C'),
    textColor: processColor('white')
  }


  return (
    <MainView>
      <View style={{flex:1, marginBottom: 20 }}>

      <LineChart
        style={{flex:1}}
        data={dataStyle}
        chartDescription={{text: ''}}
        legend={legendStyle}
        marker={markers}
        xAxis={xAxisStyle}
        drawGridBackground={false}
        borderColor={processColor('teal')}
        borderWidth={1}
        drawBorders
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
