import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class DisplayData extends Component {
  constructor(props) {
    super(props);
    this.state = {courseData: this.props.courseData};
  }
  render() {
    return (
      <View style={styles.tileView}>
        <Text style={styles.title}>{this.state.courseData.Title}</Text>
        <Text style={styles.level}>{this.state.courseData.Level}</Text>
        <View style={{flexDirection: 'row'}}>
          <Icon name="language-outline" size={13} color="#545454" />
          <Text style={styles.lang}>{this.state.courseData.Language}</Text>
        </View>
        <Text style={styles.quality}>
          {this.state.courseData.Quality} Quality
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tileView: {
    padding: 8,
    marginVertical: 1,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  title: {
    fontSize: 15,
    paddingBottom: 2,
    fontWeight: 'bold',
  },
  level: {
    fontSize: 12,
    color: '#8a8a8a',
    paddingBottom: 8,
  },
  quality: {
    fontSize: 13,
    color: '#545454',
  },
  lang: {
    fontSize: 13,
    color: '#545454',
    paddingLeft: 4,
  },
});
