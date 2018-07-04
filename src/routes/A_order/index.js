import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  Modal,
  message,
  Badge,
  Divider,
  Avatar,
} from 'antd';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import $ from 'jquery'

import styles from './index.less';


const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
  .map(key => obj[key])
  .join(',');
const statusMap = ['default', 'processing'];
const country = ['全部', '美国', '加拿大', '英国', '法国', '德国', '俄罗斯', '巴西', '澳大利亚', '日本', '西班牙', '意大利', '荷兰', '瑞典', '以色列', '瑞士', '乌克兰', '波多黎各', '比利时', '捷克', '挪威', '波兰', '智利', '其他'];
const logistics = ['全部', '邮政小包', '无忧物流', 'e邮宝', '其他'];

const statusMap2 = ['WAIT_SELLER_SEND_GOODS', 'SELLER_PART_SEND_GOODS', 'WAIT_BUYER_ACCEPT_GOODS', 'IN_ISSUE', 'WAIT_SELLER_EXAMINE_MONEY', 'RISK_CONTROL', 'FINISH', 'FUND_PROCESSING']
const status2 = ['等待发货', '部分发货', '等待收货', '纠纷中', '等待您确认金额', '风控中', '已结束', '达成一致,资金处理中'];

var statusMap2Ob = statusMap2.map((x, i) => {
  return { value: x, label: status2[i] }
})

const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible, data_key, data_no, data_avatar, data_sort, data_status } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      title="编辑"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="id">
        {form.getFieldDecorator('key', {
          rules: [{ required: true, message: '请输入...' }],
          initialValue:data_key,
        })(<Input disabled />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="名称">
        {form.getFieldDecorator('name', {
          rules: [{ required: true, message: '请输入...' }],
          initialValue:data_no,
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="排序">
        {form.getFieldDecorator('sort', {
          rules: [{ required: true, message: '请输入...' }],
          initialValue:data_sort,
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="物流方式">
         {form.getFieldDecorator('status', {initialValue:data_status})(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                   {logistics.map((item, index) => {
                      return <Option key={index} value={index}>{item}</Option>
                    })}
                </Select>
              )}
      </FormItem>
    </Modal>
  );
});

import { orderlist } from './data/orderlist'
@connect(({ order, loading }) => ({
  order,
  loading: loading.models.order,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    modalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    //表格传递到弹框的值
    data_key: 0,
    data_no: '',
    data_avatar: '',
    data_sort: '',
    data_status: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    /*    dispatch({
          type: 'order/fetch',
        });*/

    function callback(v) {
      console.log('vvvv', v)
      dispatch({
        type: 'order/fetch',
        payload: v ? { v: v } : {}
      });
    }
    orderlist(callback)
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'order/fetch',
      payload: params,
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'order/fetch',
      payload: {},
    });
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        //updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'order/fetch',
        payload: values,
      });
    });
  };

  handleModalVisible = (flag, record) => {
    if (record)
      this.setState({
        modalVisible: !!flag,
        data_key: record.key,
        data_no: record.no,
        data_avatar: record.avatar,
        data_sort: record.sort,
        data_status: record.status,
      });
    else
      this.setState({
        modalVisible: !!flag,
      });
  };

  handleAdd = fields => {
    this.props.dispatch({
      type: 'order/add',
      payload: {
        name: fields.name,
        sort: fields.sort,
        isList: fields.status,
        id: fields.key,
      },
    });

    message.success('操作成功');
    this.setState({
      modalVisible: false,
    });
    this.tableUpdate()
  };

  handleDel = fields => {
    const { selectedRows } = this.state;
    this.props.dispatch({
      type: 'order/remove',
      payload: {
        id: fields.key,
      },
    });

    message.success('操作成功');
    this.setState({
      modalVisible: false,
    });
    this.tableUpdate()

  };
  tableUpdate = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'order/fetch',
    });
  }

  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="国家区域">
              {getFieldDecorator('name')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  {country.map((item, index) => {
                      return <Option key={index} value={index}>{item}</Option>
                    })}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="物流方式">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  {logistics.map((item, index) => {
                      return <Option key={index} value={index}>{item}</Option>
                    })}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
              <Button style={{ marginLeft: 8 }}  type="primary" htmlType="submit">
                导出
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderForm() {
    return this.renderSimpleForm();
  }
  FetchOptionsPB = (data = {}) => {
    return {
      method: 'POST',
      credentials: 'include',
      body: data,
    }
  };

  render() {
    const { order: { data }, loading } = this.props;
    const { selectedRows, modalVisible, data_key, data_no, data_avatar, data_sort, data_status } = this.state;

    const columns = [
      /*    {
              title: 'id',
              dataIndex: 'key',
            },*/
      {
        title: '商品名称',
        dataIndex: 'product_list.aeop_order_product_dto[0].product_name',
        render(v) {
          return v.substr(0, 8) + '...'
        }
      }, {
        title: '订单金额($)',
        dataIndex: 'pay_amount.amount',
      }, {
        title: '收件人[姓名|国家]',
        dataIndex: 'buyer_signer_fullname',
      }, {
        title: '订单号',
        dataIndex: 'order_id',
      }, {
        title: '订单支付时间',
        dataIndex: 'gmt_pay_time',
      }, {
        title: '物流类型',
        dataIndex: 'product_list.aeop_order_product_dto[0].logistics_type',
      },
      /*    {
            title: '商品图片',
            dataIndex: 'product_list.aeop_order_product_dto[0].product_img_url',
            render(val) {
              return <Avatar src={val} shape="square" size="large" />
            }
          }, */
      {
        title: '订单显示状态',
        dataIndex: 'product_list.aeop_order_product_dto[0].show_status',
        // render(m) {
        //   return statusMap2Ob.filter(v=>v.value==m) v //statusMap2Ob(v)
        // }
        //
      }, {
        title: '操作',
        render: (value, record) => (
          <Fragment>
            <a onClick={() => this.handleModalVisible(true,record)}>编辑</a>
            <Divider type="vertical" />
            <a onClick={() => this.handleDel(record)}>详情</a>
            <Divider type="vertical" />
            <a onClick={() => this.handleDel(record)}>备注</a>
          </Fragment>
        ),
      },
    ];

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };

    return (
      <PageHeaderLayout title="">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={columns}
              rowSelectionFlag="false"
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} data_key={data_key} data_no={data_no} data_avatar={data_avatar} data_sort={data_sort} data_status={data_status} />
      </PageHeaderLayout>
    );
  }
}