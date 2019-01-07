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
    Input,
    ListItem
} from "native-base";
import { Grid, Row } from "react-native-easy-grid";
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import styles from "./styles";

import { setTasklists, setActiveTasklist } from '@actions/projects';

class ProjectTasklists extends Component {
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
            tasklists: this.props.projects.tasklists,
            addViewVisible: false,
            newTasklistName: ''
        };
    }
    componentDidMount() {
        // this._fetchTasklists();
    }
    _closeAddView() {
        this.setState({
            addViewVisible: false,
            newTasklistName: ''
        })
    }
    _createTasklist() {
        var request = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'cpmkey': this.props.user.cpmkey,
                'cpmsecret': this.props.user.cpmsecret
            },
            body: JSON.stringify({
                tasklist_name: this.state.newTasklistName
            })
        };
        fetch(Constants.API_BASE_URL + '/projects/' + this.props.projects.activeProject.ID + '/lists', request)
            .then((res) => res.json())
            .then((res) => {
                console.log("res:", res);
                var tasklists = this.state.tasklists;
                tasklists.unshift(res);
                this.setState({ tasklists: tasklists });
                this.props.setTasklists(tasklists);
            })
            .catch((error) => {
                console.log('error:', error);
            });
        this.setState({ addViewVisible: false, newTasklistName: '' });
    }
    _fetchTasklists() {
        var _this = this;
        var request = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'cpmkey': this.props.user.cpmkey,
                'cpmsecret': this.props.user.cpmsecret
            }
        };
        fetch(Constants.API_BASE_URL + '/projects/' + this.props.projects.activeProject.ID + '/lists', request)
            .then((res) => res.json())
            .then((res) => {
                this.setState({ tasklists: res });
                this.props.setTasklists(res);
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
                                this.props.navigation.goBack();
                            }}
                        >
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>{'Tasklists'}</Title>
                    </Body>
                    <Right>
                        <Button
                            transparent
                            onPress={() => { }}
                        >
                        </Button>
                    </Right>
                </Header>
                <Content style={[styles.content]}>
                    {
                        this.state.addViewVisible ?
                            (
                                <View style={styles.addView}>
                                    <TouchableOpacity onPress={() => this._closeAddView()}>
                                        <Icon name="md-close-circle" style={{ color: '#444' }} />
                                    </TouchableOpacity>
                                    <Input
                                        autoFocus={true}
                                        onChangeText={(name) => { this.setState({ newTasklistName: name }) }}
                                        style={styles.addViewInput} />
                                    <TouchableOpacity onPress={() => this._createTasklist()}>
                                        <Icon name="md-add-circle" style={{ color: 'green' }} />
                                    </TouchableOpacity>
                                </View>
                            ) : null
                    }
                    {this.state.tasklists.map((tasklist, index) => {
                        return (
                            <ListItem
                                key={tasklist.ID}
                                onPress={() => {
                                    this.props.setActiveTasklist(index);
                                    this.props.navigation.navigate('Tasklist');
                                }}
                            >
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
                                <TouchableOpacity>
                                    <Icon name={'md-menu'} />
                                </TouchableOpacity>
                            </ListItem>
                        );
                    })}
                </Content>
                <View style={[styles.bottomBar]}>
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({ addViewVisible: true });
                        }}>
                        <View style={[styles.bottomBarContent]}>
                            <Icon name={'md-add-circle'} />
                            <Text>{' MAKE ANOTHER LIST'}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </Container>
        );
    }
}

function bindAction(dispatch) {
    return {
        setTasklists: (tasks) => dispatch(setTasklists(tasks)),
        setActiveTasklist: (index) => dispatch(setActiveTasklist(index))
    };
}
const mapStateToProps = state => ({
    user: state.user,
    projects: state.projects
});

const ProjectTasklistsSwagger = connect(mapStateToProps, bindAction)(ProjectTasklists);
export default ProjectTasklistsSwagger;
