import axios from 'axios';
// import qs from 'qs'
// const commonUrl = 'http://60.205.160.239:8080/hc_blog/';
// let commonUrl = 'http://hakodate.cn/hc_blog/'
let commonUrl = 'http://localhost:8080/hc_blog/'
async function fetchData(url, method, param) {
  try {
    const res = await axios.post(commonUrl + url, JSON.stringify({ methodName: method, param }));
    return new Promise((resolve, reject) => {
      if (res.data.code === 0) {
        // axios.defaults.headers.common['sign'] = res.data.sign
        resolve(res.data);
      } else if (res.data.code === -1) {
        alert(res.data.msg);
      } else {
        alert(res.data.msg);
      }
    });
  } catch (err) {
    alert(err);
  }
}
export {
  commonUrl,
  fetchData,
};
