import { queryPerformance, addPerformance, removePerformance } from '../services/api';
var mydata = { "list": [{ "id": "3", "content": "产后如何减肥，特别是小肚子了", "direType": "3", "nickName": "追忆", "avatar": "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1107153327,2589655513&fm=27&gp=0.jpg", "docAvatar": "http://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83ervWAt8srX1DFiaPicb2apAgXDpwGjlSubYcFkIbUmkjFdicMdKumT6Xmb5dqnC0xB2Nrq9gw4mc9Hug/132", "docName": "北京协和医院", "docSpe": "任职北京协和", "fans": "0", "answeredNum": "1", "intro": "1977.9——1997.3 杭州市第二人民医院医师，主治医师，副主任医师，党委副书记，副院长 1997.3——1998.8 杭州市红十字会医院 副主任医师，党委副书记，副院长 1998.8——2003.8 杭州市第六人民医院 主任医师，院长，书记 2003.8——2011.1 杭州市第一人民医院 主任医师，教授，硕导，院长，党委副书记 2011.1——杭州市第一人民医院 主任医师，教授，硕导", "hosName": "北京协和医院" }, { "id": "4", "content": "肿瘤手术后有什么要注意的？", "direType": "1", "nickName": "妲己", "avatar": "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2709360510,2540235019&fm=27&gp=0.jpg", "docAvatar": "http://wx.qlogo.cn/mmopen/ajx6icfOA6PksMicDH6y6LRdDjXdyE864QwWZCIVPlAeIiaxsCqQ5jMBHYJoJGE9ZraEQfHKHq1xCicm6LM8PNgIMnuGfUyJbftB/132", "docName": "杨凯茵", "docSpe": "高级营养师", "fans": "2", "answeredNum": "1", "intro": "研究生学历，从医近30年。现为杭州市第一人民医院神经内科主任，杭州市医学重点学科学科带头人、主任医师、教授、硕士生导师。任杭州市医学会神经病学主任委员，杭州市医学重点学科学科带头人，浙江省神经病学副主任委员，杭州市神经病学主任委员。曾被评为杭州市医药卫生有突出贡献的科技工作者和杭州市优秀科技工作者。", "hosName": "美好食医学营养中心" }, { "id": "5", "content": "早餐要如何吃，才营养？", "direType": "4", "nickName": "张玮杰", "avatar": "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4096274330,1417827940&fm=27&gp=0.jpg", "docAvatar": "http://wx.qlogo.cn/mmopen/ajx6icfOA6PksMicDH6y6LRYm4ic14y4GFpxfVW3LFWykVznvzNqAibmhq7axO9usFVhc7otvvwOkMhKDcVMS9ic2ibehrS3Se5Luo/132", "docName": "鲁媛媛", "docSpe": "体重管理，产后减重", "fans": "1", "answeredNum": "1", "intro": "现任消化内科主任，南京医科大学教授，硕士生研究生导师。中华医学会消化内镜分会委员，浙江省医学会消化内镜分会副主任委员，杭州市医学会消化病学与内镜学主任委员，《中华消化内镜杂志》通讯编委，杭州市“131”人才。 1986.7毕业于安徽医科大学临床医学系，获学士学位。2000.9-2003.7就读浙江大学医学院硕士课程研修班。曾于2003.11赴日本学习超声内镜，2005.12赴德国汉堡大学医学院学习，师从著名国际ERCP专家Sohendra教授。", "hosName": "美好食医学营养中心" }, { "id": "7", "content": "成年人身高175，体重58Kg，是否正常？不正常需如何饮食？", "direType": "3", "nickName": "发疯的草莓", "avatar": "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1371245208,421462766&fm=27&gp=0.jpg", "docAvatar": "http://wx.qlogo.cn/mmopen/ajx6icfOA6PksMicDH6y6LRUvFOvvY0jwErDXXvKdJ4LKXKVDgwXzsL3H9yHu1ib7rwaGNGEtveEtWTEKpN0KKnBTZtHzZknGPr/132", "docName": "田伟", "docSpe": "临床营养师", "fans": "0", "answeredNum": "1", "intro": "1983～1993 年，蚌埠医学院附院内科 主治医师，讲师. 1993～2002年 蚌埠医学院附院重症医疗监护中心 副主任医师 副教援 硕导 科主任， 2002至今任杭州市第一人民医院重症医学科 主任医师 顾问 杭州市医学会危重病学分会主任委员", "hosName": "美好食医学营养中心" }, { "id": "8", "content": "糖尿病患者如何改善饮食，控制饮食", "direType": "4", "nickName": "妲己", "avatar": "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2709360510,2540235019&fm=27&gp=0.jpg", "docAvatar": "http://wx.qlogo.cn/mmopen/ajx6icfOA6PkO3tn7wAtt6gyQBlViagJGAQpfclPqmc0WIIpiceCu8xXqIZRvXF7BFSG0w1fiaSB9TAv32j7JsnJAA/132", "docName": "张三丰", "docSpe": "社区营养专家", "fans": "2", "answeredNum": "3", "intro": "大一院肝胆胰外科主任、中国医师协会副会长、教育部高等学校临床医学教学指导委员会主任委员大一院肝胆胰外科主任、中国医师协会副会长、教育部高等学校临床医学教学指导委员会主任委员", "hosName": "北京华信医院" }, { "id": "9", "content": "更年期女性平时饮食有什么要注意的？", "direType": "4", "nickName": "张玮杰", "avatar": "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4096274330,1417827940&fm=27&gp=0.jpg", "docAvatar": "http://wendacdn.mhshi.com/1505299995_ubYMl9.jpeg", "docName": "白小青", "docSpe": "非药物营养干预", "fans": "2", "answeredNum": "2", "intro": "1990年毕业于温州医学院，1998年硕士研究生毕业于原浙江医科大学，2003年毕业于浙江大学医学院，获心内科博士学位，主任医师，教授，博士研究生导师，中国医师协会心血管分会委员，中国医师协会中西医结合心脏介入分会常委，浙江省中西医结合学会心血管分会副主任委员，省、市医学会心血管分会委员。", "hosName": "美好食医学营养中心" }, { "id": "10", "content": "如何管理体重？", "direType": "3", "nickName": "妲己", "avatar": "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2709360510,2540235019&fm=27&gp=0.jpg", "docAvatar": "", "docName": "", "docSpe": "", "fans": "", "answeredNum": "", "intro": "", "hosName": "" }] }

export default {
  namespace: 'performance',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },
  effects: {
    * fetch({ payload }, { call, put }) {
      console.log('models/fetch')
      let response = yield call(queryPerformance, payload);
      console.log('response,payload', response, payload)
      response.list = payload.v.result.target_list.aeop_order_item_dto
      console.log('response', response)
      // mydata //JSON.parse(JSON.stringify(payload.v));

      yield put({
        type: 'save',
        payload: response,
      })
    },
    * add({ payload, callback }, { call, put }) {
      const response = yield call(addPerformance, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    * remove({ payload, callback }, { call, put }) {
      const response = yield call(removePerformance, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    save(state, action) {
      //console.log('action', action)
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};