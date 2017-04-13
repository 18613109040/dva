// TODO: use dva/fetch after dva@1.2
import fetch from 'isomorphic-fetch';
/**
 * @desc 格式化一个对象为字符串如 name=pat&city_no=020&old=99;
 * @param data string
 **/
function parseParams(data){ 
  if(data == null){return '';}
  let list = [];
  for(let item in data){
    list.push(`${item}=${data[item]}`)
  }
  return list.join("&");
}
const option = {
  timeout: 10000,
  credentials: 'include',
}

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export  function request(url, options) {
  return fetch(`http://localhost:8080${url}`, options)
    .then((response)=>checkStatus(response))
    .then(response=>parseJSON(response))
    .then((data) => ({ data }))
    .catch((err) => ({ err }));
}

export  function get(url="", data=null){
	console.log("get")
  const params = parseParams(data);
  const tarUrl = data==null?url:`${url}?${params}`;
  console.log(params);
  console.log(tarUrl)
  return fetch(tarUrl, Object.assign({},{method: "GET",option}))
      .then(checkStatus)
      .then(response => {
        return response.json()
      })
      .then((data) => ({ data }))
      .catch((err) => ({ err }));
  
}
export function phpGet(url="", data=null){
  let postData = {};
  for(let i in data){
    if ((typeof data[i]==="object")&&(data[i].constructor===Array)) {
      data[i].map((item,index)=>{
        postData[i+"["+index+"]"] = item
      });
    }else{
      postData[i] = data[i]
    }
  }
  const params = parseParams(postData), tarUrl = data==null?url:`${url}?${params}`;
  return fetch(tarUrl, Object.assign({},{method: "GET",option}))
      .then(checkStatus)
      .then( response => {
        return response.json()
      })
      .then((data) => ({ data }))
      .catch((err) => ({ err }));
  
}

export  function post(url="", data=null){
  
  return fetch(url, Object.assign({},{method: "POST",body:JSON.stringify(data),option}))
      .then(checkStatus)
      .then( response => {
        return response.json()
      })
      .then((data) => ({ data }))
      .catch((err) => ({ err }));
  
}

export function phpPost(url="", data=null){
  let form = new FormData(data);
  for(let i in data){
    if ((typeof data[i]==="object")&&(data[i].constructor===Array)) {
      data[i].map((item,index)=>{
        form.append(i+"["+index+"]",item)
      })
    }else {
      form.append(i, data[i])
    }
  }
  return fetch(url, Object.assign({}, {method: "POST", body:form,option}))
      .then(checkStatus)
      .then( response => {
        return response.json()
      })
      .then((data) => ({ data }))
      .catch((err) => ({ err }));
 
}