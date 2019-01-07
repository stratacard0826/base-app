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

import { setIndex } from "../../actions/list";
import styles from "./styles";

class Activity extends Component {
  static navigationOptions = {
    header: null,
    tabBarIcon: ({tintColor}) => (<Icon name="md-time" style={{color: tintColor}}/>)
  };
  static propTypes = {
    name: React.PropTypes.string,
    list: React.PropTypes.array,    
    setIndex: React.PropTypes.func
  };

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>

            <Button
              transparent
              onPress={() => {}}
            >
            </Button>
          </Left>

          <Body>
            <Title>Activity</Title>
          </Body>

          <Right>
            <Button
              transparent
              onPress={() => {}}
            >
            </Button>
          </Right>
        </Header>
        <Content>
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    setIndex: index => dispatch(setIndex(index)),
  };
}
const mapStateToProps = state => ({
  name: state.user.name,
  list: state.list.list
});

const ActivitySwagger = connect(mapStateToProps, bindAction)(Activity);
export default ActivitySwagger;
