import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right
} from "native-base";
import { Grid, Row } from "react-native-easy-grid";

import styles from "./styles";

class Me extends Component {
  static navigationOptions = {
    header: null,
    tabBarIcon: ({ tintColor }) => (<Icon name="md-contact" style={{ color: tintColor }} />)
  };
  static propTypes = {
    name: React.PropTypes.string,
  };

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => { }}
            >
            </Button>
          </Left>
          <Body>
            <Title>Me</Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => { }}
            >
            </Button>
          </Right>
        </Header>
        <Content>
          <Grid style={styles.mt}>
          </Grid>
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
  };
}
const mapStateToProps = state => ({
  name: state.user.name,
});

const MeSwagger = connect(mapStateToProps, bindAction)(Me);
export default MeSwagger;
