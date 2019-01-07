import React, { Component } from "react";
import { TouchableOpacity, Linking } from "react-native";
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
    List,
    ListItem,
    Thumbnail
} from "native-base";
import { Grid, Row } from "react-native-easy-grid";
import OverlaySpinner from '@components/OverlaySpinner';
import { setFiles } from '@actions/projects';

import styles from "./styles";

class ProjectFiles extends Component {
    static navigationOptions = {
        header: null,
        tabBarIcon: ({ tintColor }) => (<Icon name="md-contact" style={{ color: tintColor }} />)
    };
    static propTypes = {
        name: React.PropTypes.string,
        setFiles: React.PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            filesLoading: false
        }
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

        fetch(Constants.API_BASE_URL + '/projects/' + this.props.project.activeProject.ID + '/files?page=' + (this.props.project.filePageIndex + 1), request)
            .then((res) => res.json())
            .then((res) => {
                var files = this.props.project.files;
                files = files.concat(res.items);
                _this.props.setFiles(files, res.pageIndex, res.totalPages);
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
                            onPress={() => { this.props.navigation.goBack() }}
                        >
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Files</Title>
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
                    <List>
                        {
                            this.props.project.files.map((file, index) => {
                                return (
                                    <ListItem
                                        key={file.id}
                                    >
                                        <Thumbnail square source={{ uri: file.thumb }} />
                                        <Body>
                                            <Text onPress={() => { Linking.openURL(file.url) }}>{file.name}</Text>
                                        </Body>
                                    </ListItem>
                                );
                            })
                        }
                    </List>
                    {
                        (this.props.project.filePageIndex < this.props.project.fileTotalPages)? (
                            <Button transparent onPress={()=>this._fetchFiles()}
                                style={{alignSelf: 'center'}}
                            >
                                <Text>Load more..</Text>
                            </Button>
                        ) : null
                    }   
                    <OverlaySpinner visible={this.state.filesLoading}/>
                </Content>
            </Container>
        );
    }
}

function bindAction(dispatch) {
    return {
        setFiles: (files, pageIndex, totalPages) => dispatch(setFiles(files, pageIndex, totalPages))
    };
}
const mapStateToProps = state => ({
    project: state.projects,
    user: state.user
});

const ProjectFilesSwagger = connect(mapStateToProps, bindAction)(ProjectFiles);
export default ProjectFilesSwagger;
