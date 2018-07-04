import AE from 'lhx-alisdk';
const ApiClient = AE.ApiClient;
const client = new ApiClient({
  'appkey': '24926512',
  'appsecret': 'e365031f074db525ced94d83472dbd40',
  'url': `http://localhost:8018/api3`,
});

export const orderlist = (cb) => {
  client.execute('aliexpress.trade.seller.orderlist.get', {
      'param_aeop_order_query': {
        current_page: 1, //1开始
        page_size: 50, //上限是50
        create_date_start: `2018-06-01 00:00:00`,
        create_date_end: `2018-07-01 00:00:00`,
        order_status_list: ['WAIT_SELLER_SEND_GOODS', 'SELLER_PART_SEND_GOODS', 'WAIT_BUYER_ACCEPT_GOODS', 'IN_ISSUE', 'WAIT_SELLER_EXAMINE_MONEY', 'RISK_CONTROL', 'FINISH', 'FUND_PROCESSING']
        //order_status: []
      },
      'session': '50002900f28CaWoqa8alzlMPcRofAhBsiqzVjhHR1382dda5G3mwVIkaGghTneF6J01',
    },
    function (error, response) {
      console.log('this response', response)
      cb(response)
    })
}