import React, { Component } from "react";
import { TouchableOpacity, View } from "react-native";
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
  CheckBox,
  Right,
  ListItem
} from "native-base";
import { Grid, Row } from "react-native-easy-grid";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import OverlaySpinner from '@components/OverlaySpinner';
import styles from "./styles";
import { setTasks, setActiveTask } from '@actions/projects';

class Tasklist extends Component {
  static navigationOptions = {
    header: null,
    tabBarIcon: ({ tintColor }) => (<Icon name="md-contact" style={{ color: tintColor }} />)
  };
  static propTypes = {
    name: React.PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      tasksLoading: false
    };
  }
  componentDidMount() {
    this._fetchTasks();
  }
  _fetchTasks() {
    var _this = this;
    this.setState({tasksLoading: true});
    var request = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'cpmkey': this.props.user.cpmkey,
        'cpmsecret': this.props.user.cpmsecret
      }
    };
    fetch(Constants.API_BASE_URL + '/projects/' + this.props.projects.activeProject.ID + '/lists/' + this.props.projects.activeTasklist.ID + '/tasks', request)
      .then((res) => res.json())
      .then((res) => {
        this.setState({ tasks: res, tasksLoading: false, tasks: res });
        this.props.setTasks(res);
      })
      .catch((err) => {
        this.setState({tasksLoading: false});
      });
  }
  render() {
    var tasklist = this.props.projects.activeTasklist;
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => { this.props.navigation.goBack() }}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>{this.props.projects.activeTasklist.post_title}</Title>
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
          <ListItem>
            <AnimatedCircularProgress
              size={20}
              width={2}
              fill={(tasklist.completeness.total === 0) ? 0 : tasklist.completeness.completed * 100 / tasklist.completeness.total}
              tintColor="#00e0ff"
              backgroundColor="#3d5875" />
            <Body>
              <Text>{tasklist.post_title}</Text>
              <Text style={{ fontSize: 12 }}>
                {
                  (tasklist.completeness.total === 0) ?
                    ("No tasks yet") :
                    (tasklist.completeness.completed + "/" + tasklist.completeness.total + " completed")
                }
              </Text>
            </Body>
            <Button bordered rounded light small>
              <Text style={{fontSize: 12}}>Edit</Text>
            </Button>
          </ListItem>
          {this.state.tasks.map((task, index) => {
            return (
              <ListItem
                key={task.ID}
                onPress={() => {
                  this.props.setActiveTask(index);
                  this.props.navigation.navigate('Task');
                }}
              >
                <CheckBox
                  onPress={() => {

                  }}
                />
                <Body>
                  <Text>{task.post_title}</Text>
                </Body>
                <Icon name={'chatbubbles'} style={{ fontSize: 20, marginRight: 4 }} />
                <Text>{task.comment_count}</Text>
                {/* <TouchableOpacity>
                  <Icon name={'md-menu'} />
                </TouchableOpacity> */}
              </ListItem>
            );
          })}
        </Content>
        <View style={[styles.bottomBar]}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('CreateTask');
            }}>
            <View style={[styles.bottomBarContent]}>
              <Icon name={'md-add-circle'} />
              <Text>{' ADD A NEW TASK'}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <OverlaySpinner visible={this.state.tasksLoading}/>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    setTasks: (tasks) => dispatch(setTasks(tasks)),
    setActiveTask: (index) => dispatch(setActiveTask(index))
  };
}
const mapStateToProps = state => ({
  user: state.user,
  projects: state.projects
});

const TasklistSwagger = connect(mapStateToProps, bindAction)(Tasklist);
export default TasklistSwagger;
