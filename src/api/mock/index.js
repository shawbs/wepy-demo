import Mock from 'mockjs'
import D from './data'

Mock.mock('/mock/index', 'get', D.list)