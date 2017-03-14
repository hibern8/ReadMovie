var postsData = require('../../../data/posts-data.js');
var app = getApp();
Page({
    data: {
        isPlayingMusic: false
    },
    onLoad: function (option) {
        var postId = option.id;
        this.data.currentPostId = postId;

        //获取引用的条目数据
        var postData = postsData.postList[postId];
        this.setData({
            postData: postData
        });

        var postsCollected = wx.getStorageSync('posts_collected');
        if (postsCollected) {
            var postCollected = postsCollected[postId];
            this.setData({
                collected: postCollected
            })
        } else {
            var postsCollected = {};
            postsCollected[postId] = false;
            wx.setStorageSync('posts_collected', postsCollected);
        }

        if(app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId
        === postId){
            this.setData({
                isPlayingMusic : true
            })
        }

        this.setMusicMonitor();

    },

    setMusicMonitor:function(){
        var that = this;
        wx.onBackgroundAudioPlay(function () {
            // callback
            that.setData({
                isPlayingMusic: true
            })
            app.globalData.g_isPlayingMusic = true;
            app.globalData.g_currentMusicPostId = that.data.currentPostId;
        })
        wx.onBackgroundAudioPause(function () {
            // callback
            that.setData({
                isPlayingMusic: false
            })
            app.globalData.g_isPlayingMusic = false;
            app.globalData.g_currentMusicPostId = null;
        })
    },

    onCollectionTap: function (event) {
        this.getPostsCollectedSyc();
        // this.getPostsCollectedAsy();
    },
    getPostsCollectedAsy: function () {
        var that = this;
        wx.getStorage({
            key: 'posts_collected',
            success: function (res) {
                // success
                var postsCollected = res.data;
                var postCollected = postsCollected[that.data.currentPostId];
                //收藏的取反操作
                postCollected = !postCollected;
                postsCollected[that.data.currentPostId] = postCollected;
                that.showToast(postCollected, postsCollected);
            }
        })
    },
    getPostsCollectedSyc: function () {
        var postsCollected = wx.getStorageSync('posts_collected');
        var postCollected = postsCollected[this.data.currentPostId];
        //收藏的取反操作
        postCollected = !postCollected;
        postsCollected[this.data.currentPostId] = postCollected;
        this.showToast(postCollected, postsCollected);
    },



    showModal: function (postCollected, postsCollected) {
        var that = this;
        wx.showModal({
            title: "收藏",
            content: postCollected ? "是否收藏该文章?" : "是否取消收藏?",
            showCancel: "true",
            cancelText: "取消",
            cancelColor: "#333",
            confirmText: "确认",
            confirmColor: "#405f80",
            success: function (res) {
                if (res.confirm) {
                    //更新文章是否收藏的缓存值
                    wx.setStorageSync('posts_collected', postsCollected);
                    //更新数据绑定变量，从而实现切换图片
                    that.setData({
                        collected: postCollected
                    })
                }
            }
        })
    },
    showToast: function (postCollected, postsCollected) {
        //更新文章是否收藏的缓存值
        wx.setStorageSync('posts_collected', postsCollected);
        //更新数据绑定变量，从而实现切换图片
        this.setData({
            collected: postCollected
        })

        wx.showToast({
            title: postCollected ? "收藏成功！" : "取消收藏！",
            duration: 1000,
            icon: "success"
        })
    },
    onShareTap: function (event) {
        var itemList = [
            "分享给微信好友",
            "分享到朋友圈",
            "分享到微博",
            "分享到QQ"
        ];
        wx.showActionSheet({
            itemList: itemList,
            itemColor: "#405f80",
            success: function (res) {
                //res.concel
                //res.tapIndex 数组元素，从0开始
                wx.showModal({
                    title: "用户" + itemList[res.tapIndex],
                    content: "用户是否取消？" + res.cancel + "现在还无法实现分享功能"
                })
            }
        })
    },

    onMusicTap: function (event) {
        var currentPostId = this.data.currentPostId;
        var postData = postsData.postList[currentPostId];
        var isPlayingMusic = this.data.isPlayingMusic;
        if (isPlayingMusic) {
            wx.pauseBackgroundAudio();
            this.setData({
                isPlayingMusic: false
            })

        } else {
            wx.playBackgroundAudio({
                dataUrl: postData.music.url,
                title: postData.music.title,
                coverImgUrl: postData.music.coverImg
            });
            this.setData({
                isPlayingMusic: true
            })
        }

    }
})