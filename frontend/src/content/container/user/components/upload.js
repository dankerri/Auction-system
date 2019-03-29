
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
  }
  
  handleEvent(e)  {
    // this.props.form.setFieldsValue({uploadComTest: fileList}); ???
    
    if (!e || !e.fileList) {
      return e;
    }
    
    const { fileList } = e;
    console.log("handleEvent: ", fileList);
    return fileList;
  }


  render() {
    const {getFieldDecorator,} = this.props.form;
    // console.log("this.props.from: ", this.props.form);
    const props = {
      action: "/upload.do",
      listType: "picture",
      onChange: this.handleUpload,
    };
    return (
        <div >
          {getFieldDecorator('uploadComTest', {
            valuePropName: 'fileList',

             getValueFromEvent: this.handleEvent,

          })(
            <Upload name="logo" {...props}>
              <Button type="ghost">
                <Icon type="upload" /> Click to upload
              </Button>
            </Upload>
          )}
        </div>
    );
  }
}

export default Form.create({name: 'upload_form'})(Picwall)