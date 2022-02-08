var express = require('express')
const path = require('path')
require('dotenv').config();
var config = require(path.join(__dirname,'../config.js')).get(process.env.NODE_ENV);
const AxiosWrapper = require(path.join(__dirname,".././apiHandler/AxiosWrapper.js"))
const asyncHandler = require('express-async-handler')

var router = express.Router()

// =======================================================
// INITIALIZATION
const userHistoryService = config.ROUTE_URLS.userHistoryService;
const userHistoryAPI = AxiosWrapper(userHistoryService);
const radarService = config.ROUTE_URLS.radarService;
const radarAPI = AxiosWrapper(radarService);

// =======================================================
// SERVICE ROUTING
// router.post('/search/addsearchhistory', asyncHandler(async(req, res) => {
//     req.body.userId = req.user_id.id;
//     let resp = await api.get(req.url,req.body)
//     res.send(resp.data)
// }))

router.get('/search/getsearchhistory', asyncHandler(async(req, res) => {
    let resp = await userHistoryAPI.get('search/getsearchhistory/'+req.user_id.id)
    res.send(resp.data)
}))

router.get('/search/checkifexists', asyncHandler(async(req, res) => {
    // /search/checkifexists?airport=LOUISVILLE&dateSearched=2021-04-22&hour=9&userId=ABCD1234
    let resp = await userHistoryAPI.get(req.url+`&userId=${req.user_id.id}`)

    if(resp.status == 200) {
        res.send(resp.data)
    }
    else {
        // /radar/plot?radar_id=KAMX&date=10-10-2020&hour=15
        let config = {
            headers: {
                "userId": req.user_id.id
            }
        }
        let resp2 = await radarAPI.get(`/radar/plot?radar_id=${req.query.airport}&date=${req.query.dateSearched}&hour=${req.query.hour}`, config)
        res.send(resp2.data)
    }
}))

// =======================================================

module.exports = router