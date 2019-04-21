import React, { Component } from 'react'
import { theUrl, dateTimeToDate } from 'selfConfig'
import { 
    Card, Icon,
    Popconfirm, message,
    Button, Modal, Form, Input, Select,
} from 'antd'
import Zmage from 'react-zmage'
import { relativeTimeRounding } from 'moment';
import { getFileItem } from 'antd/lib/upload/utils';

class EditCard extends Component {
    constructor(props) {
        super(props)
        this.handleOk = this.handleOk.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
        this.handleCreate = this.handleCreate.bind(this)
        this.saveFormRef = this.saveFormRef.bind(this)
        this.showModal = this.showModal.bind(this)

        this.state = {
            visible: false,
            cateIcon: [
                {name: 'Others', icon: <Icon type="bars" /> },
                {name: '书籍', icon:<Icon type="book" /> },
                {name: '电子产品', icon:<Icon type="thunderbolt" /> },
                {name: '外快', icon:<Icon type="pay-circle" /> },
            ]
        }
    }

    showModal() {
        this.setState({
          visible: true,
        });
      }
    
    handleOk(e) {
      // console.log(e);
      this.setState({
          visible: false,
      });
    }

    handleCancel(e) {
      // console.log(e);
      this.setState({
          visible: false,
      });
    }

    handleCreate() {
      const form = this.formRef.props.form;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }

        console.log('Received values of form: ', values);
        form.resetFields();
        this.setState({ visible: false });
      });
    }

    saveFormRef = (formRef) => {
      this.formRef = formRef;
    }
    
    render() {
        const { item } = this.props
        const { cateIcon } = this.state

        return(
            <Card
            key={item.cid}
            hoverable
            style={{ width: "100%", marginTop: 50, padding: "20px", }}
            cover={<LoadZamge pic_num={item.pic_num} cid={item.cid}/>}
            actions={[ <EditIcon showModal={this.showModal}/>, <DeleteIcon cid={item.cid}/>]}
            > 
              {/* information */}
              <div>
                <h5>{dateTimeToDate(item.post_time)}</h5>
                <h1>{item.commodity_name}</h1>
                <h5 style={{ color: '#F22F08'}}>Price: {item.price}</h5>
                <h5>{item.post}</h5>
                <h5 style={{ color: "#0ABDA0" }}>Seller: {item.neckname?item.neckname:item.username}</h5>
                <h5>Categorys: {cateIcon[item.category].icon } {cateIcon[item.category].name}</h5>
                <h2 style={{ color: 'gray'}}>{item.commodity_des}</h2>
                <h5>Phone: {item.phone}</h5>
              </div>
    
              {/* contact */}
              <div style={{display: "flex",
                          justifyContent: "center",
                          alignItems: "center"
                         }}
              >
               
              </div>

              <CollectionCreateForm
                wrappedComponentRef={this.saveFormRef}
                visible={this.state.visible}
                onCancel={this.handleCancel}
                onCreate={this.handleCreate}
                payload={item}
              />


            </Card>
        )
    }

}


// pass a picture set into Zmage component.
class LoadZamge extends Component {
    constructor(props) {
      super(props)
      this.state = {
        set: [],
        pic_num : this.props.pic_num,
        cid : this.props.cid
      }
  
      this.getPicList = this.getPicList.bind(this)
    }
  
    componentDidMount() {
      const { pic_num, cid } = this.props
      this.getPicList(pic_num, cid)
    }
  
    getPicList = async (pic_num, cid) => {
      let list = []
      for(var i = 0; i < pic_num; i++) {
        list[i] = await { src: theUrl+`/commodity/${cid}_${i}.jpg`}
      }
  
      await this.setState({
        set: list
      })
    }
  
    render() {
  
      return(
        <Zmage
          style={{heigth: "10rem", weight: "100%", overflow: "hidden"}}
          src={theUrl+`/commodity/${this.state.cid}_0_thumb.jpg`}
          set={this.state.set}
          // preset="mobile"
        />
      )
    }
}

// delete commodity card
const DeleteIcon = ({cid}) => {
  const confirm = (e) => {
      const url = theUrl+'/deleteCommodity'
      fetch(url, {
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          method: 'post',
          body: JSON.stringify({
              cid: cid
          })
      })
      .then(res=>{ return res.json()})
      .then(res=>{
          if(res.edit){
              message.success("You already deleted the commodity card " + cid)
              window.location.reload(true)
          } else {
              message.error("Delete Failed")
          }
      })
  }
  return(
      <Popconfirm
          title="Are you sure delete this commodity card?"
          onConfirm={confirm}
      >
          <Icon type="delete" />
      </Popconfirm>
  )
}

// edit commodity card
const EditIcon = ({showModal})=> {
    return (<Icon type="edit" onClick={showModal}/>)
}

// Modal within Form
const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      const {
        visible, onCancel, onCreate, form, payload
      } = this.props;
      const { getFieldDecorator } = form;
      const { Option } = Select

      return (
        <Modal
          visible={visible}
          title="Edit commodity card"
          okText="Confirm edit"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <Form.Item label="Commodity">
              {getFieldDecorator('commodity', {
                initialValue: payload.commodity_name,
                // rules: [{ required: true, message: 'Please input the name of commodity!' }],
              })(
                <Input />
              )}
            </Form.Item>
            <Form.Item label="price">
            {getFieldDecorator('price', {
                initialValue: payload.price
              })(
                <Input />
              )}
            </Form.Item>
            <Form.Item label="Description">
              {getFieldDecorator('description', {
                initialValue: payload.commodity_des,
              })(<Input type="textarea" />)}
            </Form.Item>
            <Form.Item label="category">
            {getFieldDecorator('category', {
              initialValue: payload.category
            })(
              <Select>
                    <Option value="1">书籍</Option>
                    <Option value="2">电子产品</Option>
                    <Option value="3">外快</Option>
                    <Option value="0">others</Option>
              </Select>
            )}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  }
);




export default EditCard;

