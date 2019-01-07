import React, { Component } from "react";
import { Image } from "react-native";
import { connect } from "react-redux";
import {
  Container,
  Content,
  Item,
  Input,
  Button,
  Icon,
  View,
  Text,
  Label
} from "native-base";
import OverlaySpinner from '@components/OverlaySpinner'
import { Field, reduxForm } from "redux-form";
import { setUser } from "@actions/user";
import styles from "./styles";
const background = require("../../../images/shadow.png");


class Login extends Component {
  static propTypes = {
    setUser: React.PropTypes.func.isRequired
  };
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: 'andre.applaunch@gmail.com',
      password: 'w5cRMI4P!ZqTNOW(',
      spinnerVisible: false
    };
  }

  setUser(name) {
    this.props.setUser(name);
  }

  _login() {
    var _this = this;
    this.setState({ spinnerVisible: true });
    var request = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    };
    fetch(Constants.API_BASE_URL + '/user/login', request)
      .then((res) => {
        if(!res.ok) throw Error(res.json());
        return res.json();
      })
      .then((res) => {
        console.log('res', res);
        _this.setState({ spinnerVisible: false });
        _this.props.setUser(res.cpmkey, res.cpmsecret);
        _this.props.navigation.navigate('Main');
        // _this.props.navigation.navigate('Main');
        // this.props.setProjects(res);
      })
      .catch((err) => {
        console.log('error: ', err);
        _this.setState({ spinnerVisible: false });
        // alert(JSON.stringify(err));
      });
  }

  render() {
    return (
      <Container>
        <Content>
          <Item style={{marginTop: 200}} floatingLabel>
            <Label>Email</Label>
            <Input
              value={this.state.email}
              autoCapitalize={'none'}
              onChangeText={(text) => this.setState({ email: text })}
            />
          </Item>
          <Item floatingLabel style={{ marginTop: 20 }}>
            <Label>Password</Label>
            <Input
              value={this.state.password}
              secureTextEntry={true}
              onChangeText={(text) => this.setState({ password: text })}
            />
          </Item>
          <Button
            style={styles.btn}
            onPress={() => this._login()}
          >
            <Text>Login</Text>
          </Button>
        </Content>
        <OverlaySpinner visible={this.state.spinnerVisible} />
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
      setUser: (cpmkey, cpmsecret) => dispatch(setUser(cpmkey, cpmsecret))
  };
}
const mapStateToProps = state => ({
});

const LoginSwagger = connect(mapStateToProps, bindAction)(Login);
export default LoginSwagger;