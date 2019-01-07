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
    CardItem
} from "native-base";
import { Grid, Row, Col } from "react-native-easy-grid";
import { setActivities, setTasklists, setFiles } from '@actions/projects';
import { NavigationActions } from 'react-navigation';
import HTMLView from 'react-native-htmlview';
import OverlaySpinner from '@components/OverlaySpinner';
import styles from "./styles";

class Project extends Component {
    static navigationOptions = {
        header: null,
    };
    static propTypes = {
        name: React.PropTypes.string,
        setActivities: React.PropTypes.func.isRequired,
        setTasklists: React.PropTypes.func.isRequired,
        setFiles: React.PropTypes.func.isRequired
    };
    constructor(props) {
        super(props);
        this.state = {
            tasklists: [],
            activities: [],
            files: [],
            project: this.props.projects.activeProject,
            activitiesLoading: false,
            tasklistsLoading: false,
            filesLoading: false
        }
    }
    componentDidMount() {
        this._fetchActivities();
        this._fetchTasklists();
        this._fetchFiles();
    }

    _fetchActivities() {
        var _this = this;
        this.setState({activitiesLoading: true});
        var request = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'cpmkey': Constants.CPM_KEY,
                'cpmsecret': Constants.CPM_SECRET
            }
        };
        fetch(Constants.API_BASE_URL + '/projects/' + this.props.projects.activeProject.ID + '/activity', request)
            .then((res) => res.json())
            .then((res) => {
                _this.props.setActivities(res);
                _this.setState({activitiesLoading: false, activities: res});
            })
            .catch((err) => {
                _this.setState({activitiesLoading: false});                
            });

    }
    _fetchTasklists() {
        var _this = this;
        this.setState({tasklistsLoading: true});
        var request = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'cpmkey': Constants.CPM_KEY,
                'cpmsecret': Constants.CPM_SECRET
            }
        };
        fetch(Constants.API_BASE_URL + '/projects/' + this.props.projects.activeProject.ID + '/lists', request)
            .then((res) => res.json())
            .then((res) => {
               _this.props.setTasklists(res);
               _this.setState({tasklistsLoading: false, tasklists: res});
            })
            .catch((err) => {
                _this.setState({tasklistsLoading: false});                
            });
    }
    _fetchFiles() {
        var _this = this;
        this.setState({filesLoading: true});
        var request = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'cpmkey': this.props.user.cpmkey,
                'cpmsecret': this.props.user.cpmsecret
            }
        };
        fetch(Constants.API_BASE_URL + '/projects/' + this.props.projects.activeProject.ID + '/files', request)
            .then((res) => res.json())
            .then((res) => {
                _this.props.setFiles(res.items, res.pageIndex, res.totalPages);
                _this.setState({filesLoading: false, files: res.items});
            })
            .catch((err) => {
                _this.setState({filesLoading: false});                
            });

    }

    render() {
        return (
            <Container style={styles.container}>
                <Header>
                    <Left>
                        <Button
                            transparent
                            onPress={() => {
                                this.props.navigation.dispatch(NavigationActions.back());
                            }}
                        >
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>{this.props.projects.activeProject.post_name}</Title>
                    </Body>
                    <Right>
                        <Button
                            transparent
                            onPress={() => { }}
                        >
                        </Button>
                    </Right>
                </Header>
                <Content style={styles.content}>
                    <Grid>
                        <Row>
                            <Col>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('ProjectActivities')}>
                                    <Card style={[styles.card]}>
                                        <CardItem header style={[styles.cardHeader]}>
                                            {/* <Icon name={'md-time'} style={{ fontSize: 20 }} /> */}
                                            <Text style={[styles.cardTitle]}>Activities</Text>
                                        </CardItem>
                                        <View style={[styles.cardBody]}>
                                            {this.state.activities.map((activity, index) => {
                                                return (
                                                    <HTMLView
                                                        style={[styles.cardListItem]}
                                                        key={index}
                                                        value={activity.comment_content.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").trim()}
                                                    />
                                                );
                                            })}
                                        </View>
                                    </Card>
                                </TouchableOpacity>
                            </Col>
                            <Col>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('ProjectTasklists')}>
                                    <Card style={[styles.card]}>
                                        <CardItem header style={[styles.cardHeader]}>
                                            {/* <Icon name={'checkmark-circle'} style={{ fontSize: 20 }} /> */}
                                            <Text style={[styles.cardTitle]}>Tasks</Text>
                                        </CardItem>
                                        <View style={[styles.cardBody]}>
                                            {this.state.tasklists.map((tasklist, index) => {
                                                return (<Text style={[styles.cardListItem]} key={index}>{tasklist.post_title}</Text>)
                                            })}
                                        </View>
                                    </Card>
                                </TouchableOpacity>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('ProjectFiles')}>
                                    <Card style={[styles.card]}>
                                        <CardItem header style={[styles.cardHeader]}>
                                            {/* <Icon name={'md-folder'} style={{ fontSize: 20 }} /> */}
                                            <Text style={[styles.cardTitle]}>Files</Text>
                                        </CardItem>
                                        <View style={[styles.cardBody]}>
                                            {this.state.files.map((file, index) => {
                                                return (<Text style={[styles.cardListItem]} key={index}>{file.name}</Text>)
                                            })}
                                        </View>
                                    </Card>
                                </TouchableOpacity>
                            </Col>
                            <Col>
                                {/* <TouchableOpacity>
                                    <Card style={[styles.card]}>
                                        <CardItem header style={[styles.cardHeader]}>
                                            <Text style={[styles.cardTitle]}>My Tasks</Text>
                                        </CardItem>
                                        <CardItem>
                                        </CardItem>
                                    </Card>
                                </TouchableOpacity> */}
                            </Col>
                        </Row>
                    </Grid>
                </Content>
                <OverlaySpinner visible={this.state.activitiesLoading||this.state.tasklistsLoading||this.state.filesLoading}/>
            </Container>
        );
    }
}

function bindAction(dispatch) {
    return {
        setActivities: (activities) => dispatch(setActivities(activities)),
        setTasklists: (tasklists) => dispatch(setTasklists(tasklists)),
        setFiles: (files, pageIndex, totalPages) => dispatch(setFiles(files, pageIndex, totalPages))
    };
}
const mapStateToProps = state => ({
    user: state.user,
    projects: state.projects
});

const ProjectSwagger = connect(mapStateToProps, bindAction)(Project);
export default ProjectSwagger;
