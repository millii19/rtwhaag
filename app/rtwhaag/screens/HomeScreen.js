import * as React from 'react';
import { Slider, Platform, StyleSheet, Text, View } from 'react-native';
//import Slider from '@react-native-community/slider';
import Pedal from '../components/Pedal';
import SSButton from '../components/SSButton';
import connectAPI from '../api';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      connected: false
    }
    this.ping = this.ping.bind(this)
    this.ping_timer = setInterval(this.ping, 1000)
    this.steer = this.steer.bind(this)
    this.accelerate = this.accelerate.bind(this)
    console.log(this.props)
  }

  componentWillUnmount() {
    clearInterval(this.ping_timer)
  }

  componentDidUpdate() {
    clearInterval(this.ping_timer)
    this.ping_timer = setInterval(this.ping, 1000)
  }

  async ping() {
    try {
      const reachable = await this.props.API.reachable()
      if (reachable !== this.state.reachable) {
        this.setState({
          connected: reachable
        })
      }
    } catch {}
  }

  steer(val) {
    this.props.API.steer(Math.round(val*100))
  }

  accelerate(val) {
    this.props.API.accelerate(Math.round(val*100))
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.cockpitContainer}>
          <SSButton API={this.props.API} style={{width:100, height: 100}} />
          <Slider 
              style={{width: '100%', height: 50}}
              minimumTrackTintColor="#CFCFCF"
              maximumTrackTintColor="#0f0f0f"
              value={0.5}
              step={0.05} // so the server won't lag behind the amount of requests
              onValueChange={this.steer} />
        </View>
        
        <View style={styles.controlContainer}>
          <Pedal API={this.props.API} style={{...styles.pedalImage, flex:5}} type='break' />
          { /* <Pedal API={this.props.API} style={styles.pedalImage} type='gas' /> */ }
          <Slider style={{
                width: 300, height: 50, flex:1, 
                transform: [{rotate: '270deg'}],
                paddingBottom: 200
              }}
              maximumTrackTintColor="#CFCFCF"
              minimumTrackTintColor="#0f0f0f"
              
              value={0.5}
              step={0.05} // so the server won't lag behind the amount of requests
              onValueChange={this.accelerate} />
        </View>
        { ! this.state.connected 
          ? <View style={styles.tabBarInfoContainer}>
            <Text style={styles.tabBarInfoText}>Der RTW ist derzeit nicht verbunden</Text>

            
          </View>
          : <View></View>
        }
      </View>
    )
  }
}

export default connectAPI(HomeScreen)

HomeScreen.navigationOptions = {
  header: null,
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingLeft: 50
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  cockpitContainer: {
    flex: 3,
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 70,
    paddingLeft: 20,
    paddingRight: 20,
    borderWidth: 0
  },
  controlContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginTop: 10,
    marginBottom: 70,
    paddingLeft: 20,
    paddingRight: 20,
    borderWidth: 0
  },
  pedalImage: {
    width: 100,
    height: 180,
    resizeMode: 'contain',
    marginTop: 3,
    //marginLeft: -10,
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
});
