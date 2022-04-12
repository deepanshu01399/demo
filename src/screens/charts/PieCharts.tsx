import React from 'react';
import {
  ScrollView, StyleSheet,  View, processColor, ProcessedColorValue
} from 'react-native';
import { connect } from 'react-redux';
import MainView from '../MainView';
import { LineChart, PieChart } from 'react-native-charts-wrapper';

const LineCharts = (props: any) => {

  
  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

 let pie={
    title: 'Favorite Food in India',
    detail: { 
      time_value_list: [2017],
      legend_list: ['Hamburger', 'Steak', 'Pecel', 'Magelangan'],
      dataset: {
        Hamburger: { '2017': 9 },
        Steak: { '2017': 17 },
        Pecel: { '2017': 29 },
        Magelangan: { '2017': 45 }
      }
    }
  }

  const time = pie.detail.time_value_list
  const legend = pie.detail.legend_list
  const dataset:any = pie.detail.dataset
  let COLOR= ['green', 'cyan', 'red', 'black']


  var dataSetsValue = []
  var dataStyle = {}
  var legendStyle = {}
  var descStyle = {}
  var xAxisStyle = {}
  var chooseStyle = {}
  var valueLegend: { value: number; label: any; }[] = []
  var colorLegend: (ProcessedColorValue | null | undefined)[] = []

  legend.map((legendValue: any,index) => {
    time.map((timeValue: any) => {
      const datasetValue = dataset[legendValue]
      const datasetTimeValue = datasetValue[timeValue]

      valueLegend.push({ value: parseInt(datasetTimeValue), label: legendValue })
    })
    colorLegend.push(processColor(COLOR[index]))
  })

  const datasetObject = {
    values: valueLegend,
    label: '',
    config: {
      colors: colorLegend,
      valueTextSize: 20,
      valueTextColor: processColor('black'),
      sliceSpace: 5,
      selectionShift: 13,
      
    }
  }

  dataSetsValue.push(datasetObject)

  legendStyle = {
    enabled: true,
    textSize: 12,
    form: 'SQUARE',
    position: 'ABOVE_CHART_LEFT',
    wordWrapEnabled: true
  }
  dataStyle = {
    dataSets: dataSetsValue
  }
  descStyle = {
    text: 'this is for description',
    textSize: 15,
    textColor: processColor('black')
  }


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
  
 let line= {
    title: 'Development smartphone in Indonesia',
    detail: { 
      time_value_list: ['2011', '2012', '2013', '2014', '2015', '2016'],
      legend_list: ['Samsung', 'Apple', 'Sony'],
      dataset: {
        Samsung: {
          '2011': 371,
          '2012': 8112,
          '2013': 8806,
          '2014': 6954,
          '2015': 1097,
          '2016': 8332
        },
        Apple: {
          '2011': 7151,
          '2012': 5664,
          '2013': 2404,
          '2014': 3744,
          '2015': 2832,
          '2016': 5539
        },
        Sony: {
          '2011': 7564,
          '2012': 2172,
          '2013': 1167,
          '2014': 3844,
          '2015': 759,
          '2016': 5752
        }
      }
    }
  }


  return (
    <MainView>
      <View style={{flex:1, marginBottom: 20 }}>

      
           <PieChart
        style={{flex:1}}
        chartDescription={descStyle}
        data={dataStyle}
        legend={legendStyle}
        drawEntryLabels={true}
        highlights={[{ x: 4 }]} />
    
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
