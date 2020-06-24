import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler';

export default class LinksScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      host: '192.168.1.254',
      port: '5000'
    }
    this.changeAddress = this.changeAddress.bind(this)
    this.changePort = this.changePort.bind(this)
    this.submit = this.submit.bind(this)
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

  render() {
     
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Option label='Host' onChange={this.changeAddress} value={this.state.host} />
        <Option label='Port' onChange={this.changePort} value={this.state.port} />
        <TouchableOpacity 
          style={styles.option}
          onPress={this.submit} >
          <Text>Speichern</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

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
    justifyContent: 'flex-end'
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
