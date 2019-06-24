import { HTTP } from 'meteor/http'

export const httpGet = {
  getTreemapData() {
    return new Promise((res, rej) => {    // get data from api and return result to dashboard
      HTTP.call("GET", "https://cloud.iexapis.com/stable/stock/xxii/stats?token=pk_bc4c1f923481462fa077c954d1f8b134", {
        headers: { "Access-Control-Allow-Origin": "*" },
      }, function (error, result) {
        if (error) {
          rej(error)
        }
        if (result) {
          res(result)
        }
      });
    });
  }
}
