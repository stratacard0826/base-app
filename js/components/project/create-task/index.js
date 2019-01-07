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
import DatePicker from 'react-native-datepicker';
import styles from "./styles";
import Autocomplete from 'react-native-autocomplete-input';
import OverlaySpinner from '@components/OverlaySpinner';
import { setTasks, setActiveTask } from '@actions/projects';

class CreateTask extends Component {
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
            isPrivate: false,
            taskname: '',
            assigneeQuery: '',
            assigneeID: null,
            startDate: null,
            dueDate: null,
            spinnerVisible: false
        };
    }
    componentDidMount() {
    }

    _createTask() {
        var _this = this;
        this.setState({spinnerVisible: true});
        var request = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'cpmkey': this.props.user.cpmkey,
                'cpmsecret': this.props.user.cpmsecret
            },
            body: JSON.stringify({
                task_title: this.state.taskname,
                task_privacy: (this.state.isPrivate) ? 'yes' : 'no',
                task_start: this.state.startDate,
                task_due: this.state.dueDate,
                task_assign: [this.state.assigneeID]
            })
        };
        var url = Constants.API_BASE_URL + '/projects/' + this.props.projects.activeProject.ID + '/lists/' + this.props.projects.activeTasklist.ID + '/tasks';
        fetch(url, request)
            .then((res) => res.json())
            .then((res) => {
                var tasks = _this.props.projects.tasks;
                tasks.unshift(res);
                _this.setState({ spinnerVisible: false });
                _this.props.setTasks(tasks);
                _this.props.navigation.goBack();
            })
            .catch((error) => {
                _this.setState({ spinnerVisible: false });                
                console.log('error:', error);
            });
    }

    _filterData(assigneeQuery) {
        if(assigneeQuery == '') return [];
        var filteredData = this.props.projects.activeProject.users.filter(function (user) {
            return user.name.toLowerCase().indexOf(assigneeQuery.toLowerCase()) > -1;
        });
        return filteredData;
    }
    render() {
        const { assigneeQuery, assigneeID } = this.state;
        var data = [];
        if (!assigneeID) data = this._filterData(assigneeQuery);
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
                            onPress={() => { this._createTask() }}
                        >
                            <Text>ADD TASK</Text>
                        </Button>
                    </Right>
                </Header>
                <Content padder keyboardShouldPersistTaps={true} >
                    <Text>Add to the list
                        <Text style={{ color: 'green' }}> {this.props.projects.activeTasklist.post_name}</Text>
                    </Text>
                    <View>
                        <Item floatingLabel>
                            <Label>Add a new task..</Label>
                            <Input
                                onChangeText={(text) => this.setState({ taskname: text })}
                            />
                        </Item>
                        <Label>Assign to..</Label>
                        <Autocomplete
                            style={{ flex: 1 }}
                            inputContainerStyle={{ borderColor: 'transparent' }}
                            data={data}
                            defaultValue={this.state.assigneeQuery}
                            onChangeText={(text) => this.setState({ assigneeQuery: text, assigneeID: null })}
                            renderItem={(userData) => (
                                <TouchableOpacity
                                    onPress={() => this.setState({ assigneeQuery: userData.name, assigneeID: userData.id })}
                                >
                                    <Text>{userData.name}</Text>
                                </TouchableOpacity>
                            )}
                        />
                        <Item>
                            <Label style={{ flex: 1 }}>Start date</Label>
                            <DatePicker
                                date={this.state.startDate}
                                showIcon={false}
                                confirmBtnText={'OK'}
                                cancelBtnText={'Cancel'}
                                style={{ flex: 2 }}
                                customStyles={{
                                    dateInput: {
                                        borderWidth: 0
                                    }
                                }}
                                placeholder=" "
                                onDateChange={(date) => this.setState({ startDate: date })}
                            />
                        </Item>
                        <Item>
                            <Label style={{ flex: 1 }}>Due date</Label>
                            <DatePicker
                                date={this.state.dueDate}
                                showIcon={false}
                                confirmBtnText={'OK'}
                                cancelBtnText={'Cancel'}
                                style={{ flex: 2 }}
                                customStyles={{
                                    dateInput: {
                                        borderWidth: 0
                                    }
                                }}
                                placeholder=" "
                                onDateChange={(date) => this.setState({ dueDate: date })}
                            />
                        </Item>
                        <ListItem style={{ borderWidth: 0 }}>
                            <CheckBox
                                onPress={() => this.setState({ isPrivate: !this.state.isPrivate })}
                                checked={this.state.isPrivate}
                            />
                            <Body>
                                <Text>Private</Text>
                            </Body>
                        </ListItem>
                    </View>
                </Content>
                <OverlaySpinner visible={this.state.spinnerVisible}/>
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

const CreateTaskSwagger = connect(mapStateToProps, bindAction)(CreateTask);
export default CreateTaskSwagger;
