import React, { Component } from "react";
import { TouchableOpacity, View, WebView } from "react-native";
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
    List,
    ListItem,
    Thumbnail,
    Item,
    Label
} from "native-base";
import { RichTextEditor, RichTextToolbar } from 'react-native-zss-rich-text-editor';

import { Grid, Row } from "react-native-easy-grid";
import HTMLView from 'react-native-htmlview';
import OverlaySpinner from '@components/OverlaySpinner';
import styles from "./styles";
import { setComments, setActiveComment } from '@actions/projects';

function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

class Task extends Component {
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
            comments: [],
            assignee: null,
            spinnerVisible: false
        };
    }
    _getUser(userId) {
        var users = this.props.projects.activeProject.users;
        for (var i = 0; i < users.length; i++) {
            if (users[i].id == userId) {
                this.setState({ assignee: users[i] });
                break;
            }
        }
    }

    componentDidMount() {
        this._fetchComments();
        this._getUser(this.props.projects.activeTask.assigned_to[0]);
    }
    _fetchComments() {
        var _this = this;
        this.setState({ spinnerVisible: true });
        var request = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'cpmkey': this.props.user.cpmkey,
                'cpmsecret': this.props.user.cpmsecret
            }
        };
        var url = Constants.API_BASE_URL + '/projects/' + this.props.projects.activeProject.ID + '/task/' + this.props.projects.activeTask.ID + '/comments';
        fetch(url, request)
            .then((res) => res.json())
            .then((res) => {
                this.props.setComments(res);
                this.setState({ spinnerVisible: false, comments: res });
            })
            .catch((err) => {
                this.setState({ spinnerVisible: false });
            });
    }

    async _createComment() {
        var _this = this;
        this.setState({ spinnerVisible: true });
        var contentHtml = await this.richtext.getContentHtml();
        var request = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'cpmkey': this.props.user.cpmkey,
                'cpmsecret': this.props.user.cpmsecret
            },
            body: JSON.stringify({
                comment_content: escapeHtml(contentHtml)
            })
        };
        var url = Constants.API_BASE_URL + '/projects/' + this.props.projects.activeProject.ID + '/task/' + this.props.projects.activeTask.ID
            + '/comments';
        fetch(url, request)
            .then((res) => res.json())
            .then((res) => {
                _this.setState({ spinnerVisible: false });
                var comments = _this.props.projects.comments;
                comments.push(res);
                // this.setState({ tasklists: tasklists });
                _this.props.setComments(comments);
                _this.richtext.setContentHTML('');
            })
            .catch((error) => {
                console.log('error:', error);
                _this.setState({ spinnerVisible: false });
            });
    }

    render() {
        var task = this.props.projects.activeTask;
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
                <Content>
                    <ListItem>
                        <Text style={{ fontSize: 12, color: '#888' }}>{this.props.projects.activeTasklist.post_title} > </Text>
                        <Text>{this.props.projects.activeTask.post_title}</Text>
                    </ListItem>
                    <ListItem>
                        <Label style={{ flex: 1 }}>Assigned to</Label>
                        <Text style={{ flex: 2 }}>{this.state.assignee ? this.state.assignee.name : ''}</Text>
                    </ListItem>
                    {(task.start_date) ? (
                        <ListItem>
                            <Label style={{ flex: 1 }}>Start on</Label>
                            <Text style={{ flex: 2 }}>{task.start_date}</Text>
                        </ListItem>
                    ) : null}
                    {(task.due_date) ? (
                        <ListItem>
                            <Label style={{ flex: 1 }}>Due on</Label>
                            <Text style={{ flex: 2 }}>{task.due_date}</Text>
                        </ListItem>
                    ) : null}
                    <View>
                        <RichTextEditor
                            style={styles.editor}
                            ref={(r) => this.richtext = r}
                            editorInitializedCallback={() => this.onEditorInitialized()}
                            hiddenTitle={true}
                        />
                        <RichTextToolbar
                            getEditor={() => this.richtext}
                        />
                        <Button border
                            style={{marginVertical: 8, alignSelf: 'center'}}
                            onPress={() => this._createComment()}
                        >
                            <Text>Submit</Text>
                        </Button>
                    </View>
                    <List>
                        {
                            this.state.comments.map((comment, index) => {

                                return (
                                    <ListItem avatar
                                        key={comment.comment_ID}
                                    >
                                        {
                                            (comment.comment_author_url == '') ? (<Icon name="contact" style={{ fontSize: 24 }} />) : (<Thumbnail source={{ uri: comment.comment_author_url }} />)
                                        }
                                        <Body>
                                            <Text style={{ fontWeight: 'bold' }}>{comment.comment_author}</Text>
                                            <HTMLView
                                                value={comment.comment_content.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").trim()}
                                            />
                                            <Text note>{comment.comment_date}</Text>
                                        </Body>
                                    </ListItem>
                                );
                            })
                        }
                    </List>
                </Content>
                <OverlaySpinner visible={this.state.spinnerVisible} />
            </Container>
        );
    }
}

function bindAction(dispatch) {
    return {
        setComments: (comments) => dispatch(setComments(comments)),
        setActiveComment: (index) => dispatch(setActiveComment(index))
    };
}
const mapStateToProps = state => ({
    user: state.user,
    projects: state.projects
});

const TaskSwagger = connect(mapStateToProps, bindAction)(Task);
export default TaskSwagger;
