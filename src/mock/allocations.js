export default [
  {
    _id: '001',
    userId: '2',
    taskId: '001',
    taskTitle: 'Just task',
    projectId: 'pr_001',
    projectTitle: 'The best project',
    startTime: new Date(),
    endTime: new Date(new Date().setDate(new Date().getDate() + 12)),
    hoursPerDay: '4.0',
    taskCalDays: 12,
    notes: 'some note',
    createAt: new Date(),
    createBy: '1',
  },
  {
    _id: '002',
    userId: '6',
    taskId: '002',
    taskTitle: 'Hard task',
    projectId: 'pr_003',
    projectTitle: 'The best project',
    startTime: new Date(),
    endTime: new Date(new Date().setDate(new Date().getDate() + 3)),
    hoursPerDay: '2.0',
    taskCalDays: 3,
    notes: 'High priority',
    createAt: new Date(),
    createBy: '1',
  },
  {
    _id: '003',
    userId: '34',
    taskId: '003',
    taskTitle: ' task',
    projectId: 'pr_002',
    projectTitle: 'The best project',
    startTime: new Date(),
    endTime: new Date(new Date().setDate(new Date().getDate() + 5)),
    hoursPerDay: '2.0',
    taskCalDays: 3,
    notes: 'High priority',
    createAt: new Date(),
    createBy: '1',
  },
];
