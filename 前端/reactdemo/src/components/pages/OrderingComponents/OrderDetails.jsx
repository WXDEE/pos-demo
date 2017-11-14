/**
 * Created by Knove on 2017/11/13.
 *  描述：服务员订餐页面的订单明细选项卡
 */
import React from 'react';
import { Card,Table,Button,InputNumber } from 'antd';
import { connect } from 'react-redux'; // 引入connect
import { deleteFoodDetails,numberFoodDetails} from '../../../action/action';

let g_key=1;
class SelectFood extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        }
        this.doDelete=this.doDelete.bind(this);
        this.onChange=this.onChange.bind(this);
    }
    doDelete(record,index,event){
        if(null!=event)g_key=record.key;

        const { deleteFoodDetails,numberFoodDetails } = this.props;
        if(index=="change"){
            numberFoodDetails(this.props.nowDeskNumber,g_key,record);
        }
        else if(null!=record&&event.target.tagName=="A")
        deleteFoodDetails(this.props.nowDeskNumber,record.key);

    }
    onChange(value) {
        console.log('菜品改变数量了：', value);
        this.doDelete(value,"change");
    }
    render(){
        let ScreenHeight=document.body.clientHeight-104; //获取 全屏幕减去title的高度
        let deskNumber=this.props.nowDeskNumber;
       let foodNum=0;
        let sumPrice=0;
       for(let i=0,index=this.props.getDeskFoodArray.length;i<index;i++){
           if(null!=this.props.getDeskFoodArray[i]){
           sumPrice+=Number(this.props.getDeskFoodArray[i].Price*this.props.getDeskFoodArray[i].nowNum);
               foodNum+=Number(this.props.getDeskFoodArray[i].nowNum);
           console.log(this.props.getDeskFoodArray[i].Price);
           }
       }

        const listColumns = [{
            title: '菜品名',
            dataIndex: 'FoodName',
            key: 'name',
        }, {
            title: '数量(份)',
            dataIndex: 'nowNum',
            key: 'nownum',
            render:text=><InputNumber min={1} max={100} defaultValue={text} onChange={this.onChange} />
        }, {
            title: '单价',
            dataIndex: 'Price',
            key: 'price',
        }, {
                title: '操作',
                dataIndex: 'func',
                key: 'func',
            render:text=><a>删除</a>
            }
        ];

        const listData = [{
            key: '1',
            FoodName: '糖醋里脊',
            Num: '1',
            Price: '200',
            render:text=><spam>text¥</spam>
        },{
            key: '2',
            FoodName: '油炸冰淇淋',
            Num: '2',
            Price: '170',
            render:text=><spam>text¥</spam>
        },{
            key: '3',
            FoodName: '糖醋里脊',
            Num: '1',
            Price: '200',
            render:text=><spam>text¥</spam>
        }];
        return(
            <div >
                <Card title="订单明细"   bodyStyle={{ width: '100%',height:ScreenHeight }} className="orderDetails">
                    <table className="listInfoOrdering titleTable">
                        <tbody>
                        <tr className="listTableImportant">
                            <td >桌号</td>
                            <td>{deskNumber}</td>
                        </tr>
                        <tr>
                            <td>订单号</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>下单时间</td>
                            <td></td>
                        </tr>
                        </tbody>
                    </table>
                    <hr  className="doLineOrdering" />
                    <div className="heightDo">
                        <Table
                            columns={listColumns}
                            dataSource={this.props.getDeskFoodArray}
                            pagination={false}
                            className="listInfoOrdering infoTable"
                            size="small"
                            onRowClick={(record,index,event)=>this.doDelete(record,index,event)}
                        />
                    </div>
                    <hr  className="doLineOrdering" />
                <section className="doCenter">
                    <span style={{fontSize:14}} >共计金额：{sumPrice}¥ </span><br />
                    <span style={{fontSize:14}} > 点餐量：{foodNum}份</span>


                </section>
                    <section className="detailsButton">
                        <Button type="primary" size="large">提交订单</Button>
                        <Button type="primary"size="large">取消订单</Button>
                    </section>
                </Card>
            </div>
        )
    }
}
const mapStateToProps  = (state) => {
    let nowDeskNumber= state.httpData.deskNumber;

    if(nowDeskNumber==null)nowDeskNumber=0;
    return { nowDeskNumber: state.httpData.deskNumber,
              getDeskFoodArray:state.httpData.deskTable[nowDeskNumber].foodArray

    };
}
//connect 实现， mapStateToProps将state传入props，参数2 将 action 作为 props 绑定到 MyComp 上
SelectFood = connect(mapStateToProps,{deleteFoodDetails,numberFoodDetails})(SelectFood);


export default SelectFood;
