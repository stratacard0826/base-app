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
  Right,
  Card,
  CardItem,
  Spinner
} from "native-base";
import { Grid, Row, Col } from "react-native-easy-grid";
import OverlaySpinner from '@components/OverlaySpinner';

import { setProjects, setActiveProject } from "@actions/projects";
import styles from "./styles";
import Constants from '@src/constants';

class Home extends Component {
  static navigationOptions = {
    header: null,
    tabBarIcon: ({ tintColor }) => (<Icon name="home" style={{ color: tintColor }} />)
  };
  static propTypes = {
    name: React.PropTypes.string,
    projects: React.PropTypes.object,
    setProjects: React.PropTypes.func,
    setActiveProject: React.PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      spinnerVisible: false
    }
  }

  componentDidMount() {
    this._loadProjects();
  }

  _loadProjects() {
    var _this = this;
    this.setState({spinnerVisible: true});
    var request = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'cpmkey': this.props.user.cpmkey,
        'cpmsecret': this.props.user.cpmsecret
      }
    };
    fetch(Constants.API_BASE_URL + '/projects/', request)
      .then((res) => res.json())
      .then((res) => {
        this.props.setProjects(res);
        this.setState({spinnerVisible: false});
      })
      .catch((err) => {
        this.setState({spinnerVisible: false});        
      });
  }

  _onSelectProject(index) {
    this.props.setActiveProject(index);
    this.props.navigation.navigate('Project');
  }

  renderCard(project, index) {
    return (
      <TouchableOpacity
        key={project.ID}
        onPress={() => this._onSelectProject(index)}
      >
        <Card button>
          <CardItem header style={{ borderBottomWidth: 1, borderColor: '#EEE' }}>
            <Text style={{ flex: 1 }}>{project.post_title}</Text>
            <Icon name="settings" />
          </CardItem>
          <CardItem>
            <Grid>
              <Col>
                <Row style={styles.projectStatsItem}>
                  <View style={[styles.projectStatsItemMarker]} />
                  <Text style={[styles.projectStatsItemText]}>{`${project.info.discussion} Discussions`}</Text>
                </Row>
                <Row style={styles.projectStatsItem}>
                  <View style={[styles.projectStatsItemMarker]} />
                  <Text style={[styles.projectStatsItemText]}>{`${project.info.tasks} Tasks`}</Text>
                </Row>
                <Row style={styles.projectStatsItem}>
                  <View style={[styles.projectStatsItemMarker]} />
                  <Text style={[styles.projectStatsItemText]}>{`${project.info.files} Files`}</Text>
                </Row>
              </Col>
              <Col>
                <Row style={styles.projectStatsItem}>
                  <View style={[styles.projectStatsItemMarker]} />
                  <Text style={[styles.projectStatsItemText]}>{`${project.info.tasklist} Task lists`}</Text>
                </Row>
                <Row style={styles.projectStatsItem}>
                  <View style={[styles.projectStatsItemMarker]} />
                  <Text style={[styles.projectStatsItemText]}>{`${project.info.comments} Comments`}</Text>
                </Row>
                <Row style={styles.projectStatsItem}>
                  <View style={[styles.projectStatsItemMarker]} />
                  <Text style={[styles.projectStatsItemText]}>{`${project.info.milestone} Milestones`}</Text>
                </Row>
              </Col>
            </Grid>
          </CardItem>
        </Card>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left>
          </Left>
          <Body>
            <Title>Home</Title>
          </Body>

          <Right>
          </Right>
        </Header>
        <Content>
          {this.props.projects.projects.map((project, index) => {
            return this.renderCard(project, index)
          })}
        </Content>
        <OverlaySpinner visible={this.state.spinnerVisible}/>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    setProjects: (projects) => dispatch(setProjects(projects)),
    setActiveProject: (index) => dispatch(setActiveProject(index))
  };
}
const mapStateToProps = state => ({
  user: state.user,
  projects: state.projects
});

const HomeSwagger = connect(mapStateToProps, bindAction)(Home);
export default HomeSwagger;
