import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Meta, Story} from '@storybook/react/types-6-0';
import {action} from "@storybook/addon-actions";
import {Task, TaskPropsType} from "./Task";
import {ReduxStoreProviderDecorator} from "./stories/ReduxStoreProviderDecorator";


export default {
    title: 'Todolists/Task',
    component: Task,
    argTypes: {},
    decorators: [ReduxStoreProviderDecorator]
} as Meta;


const changeTaskStatusCallback = action( 'Status changed inside Task' )
const changeTaskTitleCallback = action( "Title changed inside Task")
const removeTaskCallback = action( "Remove Button inside Task")

const Template: Story<TaskPropsType> = (args) => <Task {...args} />;


const argBase = {
    removeTask: removeTaskCallback,
    changeTaskStatus: changeTaskStatusCallback,
    changeTaskTitle: changeTaskTitleCallback
}

export const TaskIsDoneExample = Template.bind({});
// TaskIsDoneExample.args = {
//     ...argBase,
//     task: {id: '1', isDone: true, title: 'JS'},
//     // todolistId: '1
// };

export const TaskIsNotDoneExample = Template.bind({});
// TaskIsNotDoneExample.args = {
//     ...argBase,
//     task: {id: '2', isDone: false, title: 'JS'},
//     // todolistId: '2'
// };









