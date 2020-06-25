import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import CarAPI from '../api/CarApi';

class LinksScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      host: '192.168.50.5',
      port: '5000'
    }
    this.changeAddress = this.changeAddress.bind(this)
    this.changePort = this.changePort.bind(this)
    this.submit = this.submit.bind(this)
    this.shutdown_server = this.shutdown_server.bind(this)
  }

  changeAddress(val) {
    this.setState({
      host: val
    })
  }

  changePort(val) {
    this.setState({
      port: val
    })
  }

  submit() {
    console.log({
      host: this.state.host,
      port: this.state.port
    })
    const { navigate } = this.props.navigation
    navigate('Home', {
      host: this.state.host,
      port: this.state.port
    })
  }

  shutdown_server() {
    const API = new CarAPI({
      protocol: 'http',
      host: this.state.host,
      port: this.state.port
    })
    API.shutdown()
  }

  render() {
     
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Option label='Host' onChange={this.changeAddress} value={this.state.host} />
        <Option label='Port' onChange={this.changePort} value={this.state.port} />
        <View style={styles.option}>
          <TouchableOpacity 
            style={{
              ...styles.option,
              backgroundColor: '#ff5555'
            }}
            onPress={this.shutdown_server} >
            <Text style={{ color: '#ffffff' }} >Ausschalten</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={{
              ...styles.option,
              backgroundColor: '#eeeeee'
            }}
            onPress={this.submit} >
            <Text>Speichern</Text>
          </TouchableOpacity>
          
        </View>
        
      </ScrollView>
    );
  }
}

export default LinksScreen

function Option(props) {
  return (
    <View style={styles.optionContainer} >
      <Text>{props.label}</Text>
      <TextInput onChangeText={props.onChange}
        value={props.value}
        style={{
          width:'80%',
          height: 30,
          borderWidth: 1,
          borderRadius: 8,
          borderColor: '#cccccc',
          paddingLeft: 5,
          marginLeft: 20
        }} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  optionContainer: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'flex-end',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    paddingRight: 30,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
});
