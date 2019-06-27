import { HTTP } from 'meteor/http'    // built in metoer http package to call external apis

export const httpGet = {  /**** Method to get data from http call ****/
  getTreemapData() {
    return new Promise((res, rej) => {    // create promise for calling api using metor/http package
      HTTP.call("GET", "https://cloud.iexapis.com/stable/stock/xxii/stats?token=pk_bc4c1f923481462fa077c954d1f8b134", {   // get data from api
        headers: { "Access-Control-Allow-Origin": "*" },    // for testing purpose only
      }, function (error, result) {
        if (error) {
          rej(error)      // return error message in case of error
        }
        if (result) {
          res(result)   // in case of success return api data to dashboard
        }
      });
    });
  }
}
