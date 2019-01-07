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
  Right,
  List,
  ListItem
} from "native-base";
import { Grid, Row } from "react-native-easy-grid";
import HTMLView from 'react-native-htmlview';
import styles from "./styles";

class ProjectActivities extends Component {
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
              onPress={() => { this.props.navigation.goBack() }}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>{'Activities'}</Title>
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
              this.props.project.activities.map((comment, index) => {

                return (
                  <ListItem avatar
                    key={comment.comment_ID}
                  >
                    {
                      (comment.comment_author_url == '') ? (<Icon name="contact" style={{ fontSize: 24 }} />) : (<Thumbnail source={{ uri: comment.comment_author_url }} />)
                    }
                    <Body>
                      {/* <Text style={{ fontWeight: 'bold' }}>{comment.comment_author}</Text> */}
                      <HTMLView
                        value={comment.comment_content.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").trim()}
                      />
                      {/* <Text>{comment.comment_content}</Text> */}
                      {/* <Text note>{comment.comment_date}</Text> */}
                    </Body>
                  </ListItem>
                );
              })
            }
          </List>
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
  project: state.projects
});

const ProjectActivitiesSwagger = connect(mapStateToProps, bindAction)(ProjectActivities);
export default ProjectActivitiesSwagger;
