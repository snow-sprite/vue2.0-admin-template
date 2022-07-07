export default {
  status: 100,
  msg: '',
  detailMsg: '',
  data: [
    {
      level: 1,
      pageRouting: '/projectLine/script/index',
      menuName: '剧本',
      id: 196,
      leaf: 0,
      name: 'Script'
    },
    {
      level: 1,
      pageRouting: '/projectLine/episode/index',
      menuName: '集数',
      id: 46,
      leaf: 0,
      name: 'Episode'
    },
    {
      level: 1,
      pageRouting: '/statistics/index',
      menuName: '数据统计',
      id: 193,
      leaf: 0,
      name: 'Statistics',
      child: [
        {
          level: 2,
          pageRouting: '/statistics/overview/index',
          menuName: '数据总览',
          id: 261,
          leaf: 0,
          name: 'Overview'
        },
        {
          level: 2,
          pageRouting: '/statistics/task/index',
          menuName: '项目任务',
          id: 195,
          leaf: 0,
          name: 'Taskview'
        }
      ]
    }
  ]
}
