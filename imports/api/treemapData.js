import { HTTP } from 'meteor/http'

export const httpGet = {
  getTreemapData() {
    return new Promise((res, rej) => {
      HTTP.call("GET", "https://cors-anywhere.herokuapp.com/https://cloud.iexapis.com/stable/stock/xxii/stats?token=pk_bc4c1f923481462fa077c954d1f8b134", {
        headers: { "Access-Control-Allow-Origin": "*" },
      }, function (error, result) {
        if (error) {
          console.log(error);
          rej(error)
        }
        if (result) {
          console.log("here");
          res(result)
        }
      });
    });
  }
}
