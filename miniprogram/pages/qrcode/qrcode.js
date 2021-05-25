// miniprogram/pages/qrcode/qrcode.js
import qrcode from './js/artqrcoed.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        styleInfo: null,
        imginfo: null,
        qrinfo: {
            canvasid: 'qrcode',
            size: 200,
            text: '',
            img: ''
        },
        pbtxt: false,
        pbimg: false,
        pbqr: false
    },
    gettxt(e) {
        var txt = `qrinfo.text`;
        this.setData({
            [txt]: e.detail.value
        })
    },
    showpbtxt() {
        this.setData({
            pbtxt: true
        })
    },
    showpbqr() {
        this.setData({
            pbqr: true
        })
    },
    showpbimg() {
        this.setData({
            pbimg: true
        })
    },
    madeTxt() {
        this.setData({
            pbtxt: false,
            pbqr: true
        })
        this.addlikenum(this.data.styleInfo._id);
        qrcode.getqrcode(this.data.qrinfo, this.data.imginfo);
    },
    madeImg() {
        this.addlikenum(this.data.styleInfo._id);
        qrcode.changeqrcode(qrinfo, imginfo);
    },
    addlikenum(id) {
        wx.cloud.callFunction({
            // 需调用的云函数名
            name: 'reportQRLike',
            // 传给云函数的参数
            data: {
                qr_id: id
            },
            // 成功回调
            complete: (res) => {
                console.log("add 1")
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var info = JSON.parse(options.info);
        var imgs = {
            eye: info.eye,
            one: info.one,
            tian: info.tian,
            col2: info.col2,
            col3: info.col3,
            col4: info.col4,
            row2: info.row2,
            row3: info.row3,
            row4: info.row4,
        }
        this.setData({
            styleInfo: info,
            imginfo: imgs
        })
    }
})