var postsData = require('../../data/posts-data.js')


Page({
  data: {
    //小程序總是會讀取data對象來處理數據綁定，綁定是在onload之後發生的
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载

    this.setData({
      posts_key: postsData.postList
    });
  },
  onPostTap: function (event) {
    var postId = event.currentTarget.dataset.postid;
    // console.log("postid is "+ postId);
  wx.navigateTo({
      url: 'post-detail/post-detail?id='+postId,
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },



/*
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成
    console.log("onready");
  },
  onShow: function () {
    // 生命周期函数--监听页面显示
    console.log("onshow");
  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏
    console.log("onhide");
  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载
    console.log("onunload");
  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作
    console.log("onpulldownrefresh");
  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数
    console.log("onReachBottom");
  },
  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
    
  }
  */
}) 