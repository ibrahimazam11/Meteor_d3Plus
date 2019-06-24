import { HTTP } from 'meteor/http'

export const httpGet = {
  getTreemapData() {

    HTTP.call("GET", "https://cloud.iexapis.com/stable/stock/xxii/stats?token=pk_bc4c1f923481462fa077c954d1f8b134", {
      headers: { "Access-Control-Allow-Origin": "*" },
    }, function (error, result) {
      if (error) {
        console.log(error);
      }
      if (result) {
        console.log(result);
      }
    });
  }
}
