import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-community/picker';
import Icon from 'react-native-vector-icons/AntDesign';

export default class FilterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterLevel: props.route.params.filter[0],
      filterLang: props.route.params.filter[1],
      filterQuality: props.route.params.filter[2],
    };
  }

  updateLevel = (level) => {
    this.setState({filterLevel: level});
  };
  updateLang = (lang) => {
    this.setState({filterLang: lang});
  };
  updateQuality = (quality) => {
    this.setState({filterQuality: quality});
  };

  resetFilter = () => {
    this.setState({
      filterQuality: '',
      filterLang: '',
      filterLevel: '',
    });
  };

  goBack = () => {
    this.props.navigation.navigate('Home');
  };

  render() {
    return (
      <View style={styles.main}>
        <TouchableOpacity style={styles.header}>
          <Icon
            name="arrowleft"
            size={29}
            color="#03befc"
            onPress={() => {
              this.props.navigation.navigate('Home');
            }}
          />
          <Text style={styles.headerText}>Filters</Text>
        </TouchableOpacity>
        <View style={{paddingLeft: 10, marginTop: 10}}>
          <Text style={{paddingBottom: 20, fontWeight: 'bold'}}>
            Add Filters
          </Text>
          <Text style={styles.heading}>Level:</Text>
          <Picker
            selectedValue={this.state.filterLevel}
            onValueChange={this.updateLevel}>
            <Picker.Item label="None" value="" />
            <Picker.Item label="Beginner" value="Beginner" />
            <Picker.Item label="Intermediate" value="Intermediate" />
            <Picker.Item label="Advanced" value="Advanced" />
          </Picker>
          <Text style={styles.heading}>Language:</Text>
          <Picker
            selectedValue={this.state.filterLang}
            onValueChange={this.updateLang}>
            <Picker.Item label="None" value="" />
            <Picker.Item label="English" value="English" />
            <Picker.Item label="Hindi" value="Hindi" />
            <Picker.Item label="Tamil" value="Tamil" />
            <Picker.Item label="Arabic" value="Arabic" />
          </Picker>
          <Text style={styles.heading}>Quality:</Text>
          <Picker
            selectedValue={this.state.filterQuality}
            onValueChange={this.updateQuality}>
            <Picker.Item label="None" value="" />
            <Picker.Item label="High" value="High" />
            <Picker.Item label="Medium" value="Medium" />
            <Picker.Item label="Low" value="Low" />
          </Picker>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <TouchableOpacity style={styles.reset} onPress={this.resetFilter}>
            <Text style={{color: '#03befc'}}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.apply}
            onPress={() => {
              this.props.navigation.navigate('Home', {
                filter: [
                  this.state.filterLevel,
                  this.state.filterLang,
                  this.state.filterQuality,
                ],
              });
            }}>
            <Text style={{color: '#fff'}}>Apply Filter</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 7,
    flexDirection: 'row',
    paddingBottom: 15,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 8,
  },
  main: {
    paddingLeft: 10,
  },
  heading: {
    fontWeight: 'bold',
  },
  apply: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    height: 40,
    width: 150,
    marginRight: 10,
    backgroundColor: '#03befc',
  },
  reset: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    height: 40,
    width: 150,
    marginRight: 10,
    borderColor: '#03befc',
    borderWidth: 2,
    backgroundColor: '#fff',
  },
});
