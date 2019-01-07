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
    ListItem,
    Input,
    Item,
    Label,
    Picker
} from "native-base";
import { Grid, Row } from "react-native-easy-grid";
import styles from "./styles";
import { setComments, setActiveComment } from '@actions/projects';
import { RichTextEditor, RichTextToolbar } from 'react-native-zss-rich-text-editor';
import OverlaySpinner from '@components/OverlaySpinner';
function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

class CreateComment extends Component {
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
            comment_content: '',
            spinnerVisible: false
        };
    }
    componentDidMount() {
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
                _this.props.navigation.goBack();
            })
            .catch((error) => {
                console.log('error:', error);
                _this.setState({ spinnerVisible: false });
            });
    }

    render() {
        return (
            <Container style={styles.container}>
                <Header>
                    <Left>
                        <Button
                            transparent
                            onPress={() => { this.props.navigation.goBack() }}
                        >
                            <Text>CANCEL</Text>
                        </Button>
                    </Left>
                    <Body>
                        <Title>{this.props.projects.activeProject.post_name}</Title>
                    </Body>
                    <Right>
                        <Button
                            transparent
                            onPress={() => { this._createComment() }}
                        >
                            <Text>ADD COMMENT</Text>
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <RichTextEditor
                        style={styles.editor}
                        ref={(r) => this.richtext = r}
                        editorInitializedCallback={() => this.onEditorInitialized()}
                        hiddenTitle={true}
                    />
                    <RichTextToolbar
                        getEditor={() => this.richtext}
                    />
                </Content>
                <OverlaySpinner visible={this.state.spinnerVisible} />
            </Container>
        );
    }
}

function bindAction(dispatch) {
    return {
        setComments: (tasks) => dispatch(setComments(tasks)),
        setActiveComment: (index) => dispatch(setActiveComment(index))
    };
}
const mapStateToProps = state => ({
    user: state.user,
    projects: state.projects
});

const CreateCommentSwagger = connect(mapStateToProps, bindAction)(CreateComment);
export default CreateCommentSwagger;
