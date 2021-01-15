// pages/effect/getExistence/index.js
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    existenceRule :[
      {
        keyWord:'单车',
        describe: '干的漂亮',
        tagCount:0,
        tagCourseList:[],
        list: ['12sd1', '1223ff', '1212fggg', '12dd4']
      },
      {
        keyWord: '瑜伽',
        describe: '无可匹敌的力量',
        tagCount: 0,
        tagCourseList: [],
        list: ['1221d1', '12263ff', '781212fggg']
      }
      //...
    ],
    courseCountData: [
      { courseId: "12263ff", courseName: '颠三倒四的', startTime: "2019-05-13", count: 18 },
      { courseId: "12dd4", courseName: '大家看手机电视', startTime: "2019-04-11", count: 4 },
      { courseId:"1223ff", courseName:'暴力单车', startTime:"2019-02-11", count:12},
      { courseId: "1212fggg", courseName: '反对开放看看', startTime: "2019-01-11", count: 1 },
    ],
    newCourseList:[]
  },
  //累计存在值key的tagCount
  getExistenceKey(value){
    for (let i in this.data.existenceRule) {
      for (let j = 0; j < this.data.existenceRule[i].list.length; j++){
        if (value.courseId == this.data.existenceRule[i].list[j]){
          this.data.existenceRule[i].tagCourseList.push(value)
          this.data.existenceRule[i].tagCount += value.count
        }
      }
    }

  },

  //用户下单标签课程总和最多，所对应的标签下该用户所有下单课程的排序
  getLastTagCourseSortList() {
    for (let j = 0; j < this.data.courseCountData.length; j++) {
      this.getExistenceKey(this.data.courseCountData[j])
    }
    // console.log(this.data.existenceRule, util.sortList(this.data.existenceRule, 'tagCount'))
    //获取最高次数标签对象
    let heighestTagCourse = util.sortList(this.data.existenceRule, 'tagCount')[0]
    //获取最高标签最高课程
    let firstCourse = util.sortList(heighestTagCourse.tagCourseList, 'count')[0]
    
    console.log(firstCourse, heighestTagCourse)
    this.setData({ newCourseList: heighestTagCourse})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getLastTagCourseSortList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
})