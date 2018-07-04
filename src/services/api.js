import { stringify } from 'qs';
import request from '../utils/request';
import { getServer } from '../utils/common'

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  console.log('services/queryRule')
  return request(`/api/rule?${stringify(params)}`);
}
export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

/*banner*********************************************************/
export async function queryOrder(params) {
  if (params)
    return request(getServer() + `mhshiHandler.ashx?fn=getbanner&name=${params.name}&isList=${params.status}`);
  else
    return request(getServer() + `mhshiHandler.ashx?fn=getbanner`);
}

export async function addOrder(params) {
  return request(getServer() + `mhshiHandler.ashx?fn=editbanner&name=${params.name}&sort=${params.sort}&isList=${params.isList}&id=${params.id}`)
}

export async function removeOrder(params) {
  return request(getServer() + `mhshiHandler.ashx?fn=delbanner&id=${params.id}`)
}
/**********************************************************/

/*ques*********************************************************/
export async function queryPerformance(params) {
  //console.log('adasdsadssss')
  //console.log(t((v) => console.log('111111111', v)))
  return request(getServer() + `mhshiHandler.ashx?fn=getquestionlistadmin`)
}

export async function addPerformance(params) {
  return request(getServer() + `mhshiHandler.ashx?fn=updatequestionadmin&content=${params.content}&direType=${params.direType}&id=${params.id}`)
}

export async function removePerformance(params) {
  return request(getServer() + `mhshiHandler.ashx?fn=deletequestionadmin&id=${params.id}`)
}
/**********************************************************/


export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  console.log('ESLINT', process.env)
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}