Page({
    onTap:function(event){
        // wx.navigateTo({
        //   url: '../posts/post',
        //   success: function(res){
        //     console.log("dsfasfasdf");
        //   },
        //   fail: function() {
        //     // fail
        //   },
        //   complete: function() {
        //     // complete
        //   }
        // })

        wx.redirectTo({
          url: '../posts/post',
          success: function(res){
            // success
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        });

    },

})