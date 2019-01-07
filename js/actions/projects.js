export const setProjects = (projects) => ({
    type: 'SET_PROJECTS',
    projects
});
export const setActiveProject = (index) => ({
    type: 'SET_ACTIVE_PROJECT',
    index
});
export const setTasklists = (tasklists) => ({
    type: 'SET_TASKLISTS',
    tasklists
})
export const setActiveTasklist = (index) => ({
    type: 'SET_ACTIVE_TASKLIST',
    index
});
export const setTasks = (tasks) => ({
    type: 'SET_TASKS',
    tasks
});
export const setActiveTask = (index) => ({
   type: 'SET_ACTIVE_TASK',
   index 
});
export const setComments = (comments) => ({
    type: 'SET_COMMENTS',
    comments
});
export const setActiveComment = (index) => ({
    type: 'SET_ACTIVE_COMMENT',
    index
});
export const setActivities = (activities) => ({
    type: 'SET_ACTIVITIES',
    activities
});
export const setActiveActivity = (index) => ({
    type: 'SET_ACTIVE_ACTIVITY',
    index
});
export const setFiles = (files, pageIndex, totalPages) => ({
    type: 'SET_FILES',
    files,
    pageIndex,
    totalPages
});
export const setActiveFile = (index) => ({
    type: 'SET_ACTIVE_FILE',
    index
});
