type InitialData = {
    tasks: {
        [taskId: string]: {
            id: string;
            content: string;
        };
    };
    columns: {
        [cloumnId: string]: {
            id: string;
            title: string;
            taskIds: string[];
        };
    };
    columnOrder: string[];
}

const initialData: InitialData = {
    tasks: {
        'task1' : { id: 'task-1', content: 'Todo' },
        'task2' : { id: 'task-2', content: 'in-process' },
        'task3' : { id: 'task-3', content: 'done' },
        'task4' : { id: 'task-4', content: 'bug' },
    },
    columns: {
        'column1': {
            id: 'column-1',
            title: 'Column 1',
            taskIds: ['task-1', 'task-2', 'task-3', 'task-4']
        },

    },
    columnOrder: ['cloumn-1']
}

export default initialData