import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';

export const initialState = Immutable({
    projects: [],
    activeProject: null,
    tasklists: [],
    activeTasklist: null,
    tasks: [],
    activeTask: null,
    comments: [],
    activeComment: null,
    activities: [],
    activeActivity: null,
    files: [],
    activeFile: null,
    filePageIndex: -1,
    fileTotalPages: -1
});

const setProjects = (state, action) => ({
    ...state,
    projects: action.projects,
    activeProject: null
});
const setActiveProject = (state, action) => ({
    ...state,
    activeProject: state.projects[action.index]
});
const setTasklists = (state, action) => ({
    ...state, 
    tasklists: action.tasklists,
    activeTasklist: null
});
const setActiveTasklist = (state, action) => ({
    ...state,
    activeTasklist: state.tasklists[action.index]
});
const setTasks = (state, action) => ({
    ...state,
    tasks: action.tasks,
    activeTask: null
});
const setActiveTask = (state, action) => ({
    ...state,
    activeTask: state.tasks[action.index]
});
const setComments = (state, action) => ({
    ...state,
    comments: action.comments,
    activeComment: null
});
const setActiveComment = (state, action) => ({
    ...state,
    activeComment: state.comments[action.index]
});
const setActivities = (state, action) => ({
    ...state,
    activities: action.activities,
    activeActivity: null
});
const setActiveActivity = (state, action) => ({
    ...state,
    activeActivity: state.activities[action.index]
});
const setFiles = (state, action) => ({
    ...state,
    files: action.files,
    filePageIndex: action.pageIndex,
    fileTotalPages: action.totalPages,
    activeFile: null
});
const setActiveFile = (state, action) => ({
    ...state,
    activeFile: state.activeFile[action.index]
});

const actionHandlers = {
    ['SET_PROJECTS']: setProjects,
    ['SET_ACTIVE_PROJECT']: setActiveProject,
    ['SET_TASKLISTS']: setTasklists,
    ['SET_ACTIVE_TASKLIST']: setActiveTasklist,
    ['SET_TASKS']: setTasks,
    ['SET_ACTIVE_TASK']: setActiveTask,
    ['SET_COMMENTS']: setComments,
    ['SET_ACTIVE_COMMENT']: setActiveComment,
    ['SET_ACTIVITIES']: setActivities,
    ['SET_ACTIVE_ACTIVITIES']: setActiveActivity,
    ['SET_FILES']: setFiles,
    ['SET_ACTIVE_FILE']: setActiveFile
};

export default createReducer(initialState, actionHandlers);