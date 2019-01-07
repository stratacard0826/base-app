import React, { Component } from "react";
import { StackNavigator } from "react-navigation";
import { Header, Left, Button, Icon, Body, Title, Right } from "native-base";

import Home from '@components/home';
import Project from '@components/project/main';
import ProjectActivities from '@components/project/activities';
import ProjectTasklists from '@components/project/tasklists';
import ProjectFiles from '@components/project/files';
import Tasklist from '@components/project/tasklist';
import CreateTask from '@components/project/create-task';
import Task from '@components/project/task';
import CreateComment from '@components/project/create-comment';
export default (StackNav = StackNavigator({
  ProjectMain: { screen: Project },
  ProjectActivities: { screen: ProjectActivities },
  ProjectTasklists: { screen: ProjectTasklists },
  ProjectFiles: { screen: ProjectFiles },
  Tasklist: {screen: Tasklist},
  CreateTask: {screen: CreateTask},
  Task: {screen: Task},
  CreateComment: {screen: CreateComment}
}));
