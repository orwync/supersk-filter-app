import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import DisplayData from './DisplayData';
import Icon from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native-gesture-handler';

let db;

export default class Home extends Component {
  constructor(props) {
    super(props);
    db = SQLite.openDatabase(
      {
        name: 'tester.db',
        createFromLocation: '~tester.db',
      },
      this.successDb,
      this.failDb,
    );
    this.state = {
      courseList: [],
    };
    this.successDb.bind(this);
    this.failDb.bind(this);
  }

  successDb = () => {
    db.transaction((tx) => {
      tx.executeSql('select * from course', [], (tx, results) => {
        let bufferArray = [];
        let dataLen = results.rows.length;
        if (dataLen > 0) {
          for (let i = 0; i < dataLen; i++) {
            bufferArray.push(results.rows.item(i));
          }
          this.setState({courseList: bufferArray});
        }
      });
    });
  };

  failDb = (err) => {
    alert('failed to connect to database!');
  };

  render() {
    let level = '',
      lang = '',
      quality = '';
    if (this.props?.route?.params?.filter) {
      level = this.props.route.params.filter[0];
      lang = this.props.route.params.filter[1];
      quality = this.props.route.params.filter[2];
    }
    return (
      <View style={styles.main}>
        <View style={styles.header}>
          <Text style={styles.headerText}>SuperSkool</Text>
        </View>
        <TouchableOpacity style={styles.iconView}>
          <Icon
            name="filter"
            size={30}
            color="#fff"
            onPress={() => {
              this.props.navigation.navigate('FilterScreen', {
                filter: [level, lang, quality],
              });
            }}
          />
        </TouchableOpacity>
        <ScrollView>
          {this.state.courseList.map((courseData, index) => {
            let tempLevel = level != '' ? level : courseData.Level;
            let tempLang = lang != '' ? lang : courseData.Language;
            let tempQuality = quality != '' ? quality : courseData.Quality;

            if (
              courseData.Level == tempLevel &&
              courseData.Language == tempLang &&
              courseData.Quality == tempQuality
            )
              return <DisplayData key={index} courseData={courseData} />;
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#03befc',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  main: {
    backgroundColor: '#03befc',
    flex: 1,
  },
  iconView: {
    backgroundColor: '#03befc',
    padding: 6,
    flexDirection: 'row-reverse',
  },
});
