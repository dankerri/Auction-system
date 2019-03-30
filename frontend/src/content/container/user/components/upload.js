
import React from 'react'
import { Upload, Icon, Modal, Button, message, Form } from 'antd'
import { theUrl } from 'selfConfig'

const props = {
  action: '//jsonplaceholder.typicode.com/posts/',
  listType: 'picture',
  defaultFileList: [],
};

class Picwall extends React.Component {
  constructor(props) {
    super(props)
    this.handleEvent = this.handleEvent.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  handleEvent(e)  {
    // this.props.form.setFieldsValue({uploadComTest: fileList}); ???
    
    if (!e || !e.fileList) {
      return e;
    }
    
    const { fileList } = e;
    // console.log("handleEvent: ", fileList);
    return fileList;
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values)=>{
      if(!err) {
        // console.log(values)
        const url = theUrl + '/testing'
        fetch(url, {
          headers: {
            'Accept':'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({
            cardPic: values.uploadPics,
            cardInfo: { id: '1'}
          })
        })
      }
    })

  }


  render() {
    const {getFieldDecorator,} = this.props.form;
    // console.log("this.props.from: ", this.props.form);
    const props = {
      action: theUrl+"/createCard",
      listType: "picture",
      onChange: this.handleUpload,
    };
    return (
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
          {getFieldDecorator('uploadPics', {
            valuePropName: 'fileList',
            getValueFromEvent: this.handleEvent,
            rules: [{
              required: true , message:'add picture'
            }]
          })(
            <Upload name="logo" {...props}>
              <Button type="ghost">
                <Icon type="upload" /> Click to upload
              </Button>
            </Upload>
          )}
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
            >
              submit
            </Button>
          </Form.Item>
        </Form>
    );
  }
}

export default Form.create({name: 'upload_form'})(Picwall)