import React from 'react';
import { Form, Input, Button, Space, Row, Col, message, notification } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { LuckyWheel } from '@lucky-canvas/react'
import './App.less';

const tintcolor = '#ffb7ab'
const deepcolor = '#eb6357'

const prizecolor0 = '#ffb7ab'
const prizecolor1 = '#f066a1'
const prizecolor2 = '#ed44eb'
const prizecolor3 = '#bd79f2'
const prizecolor4 = '#eeb04f'
const prizecolor5 = '#14c771'

class App extends React.Component {
  constructor () {
    super()
    this.myLucky = React.createRef()
    this.state = {
      width: 600,
      height: 600,
      blocks: [{ padding: '13px', background: '#f78575' }],
      prizes: [
        { fonts: [{ text: '仅', top: '20%', fontSize: 24, fontWeight: 550, fontColor: '#ffffff' }], background: '#ffb7ab' },
        { fonts: [{ text: '供', top: '20%', fontSize: 24, fontWeight: 550, fontColor: '#ffffff' }], background: '#eb6357' },
        { fonts: [{ text: '展', top: '20%', fontSize: 24, fontWeight: 550, fontColor: '#ffffff' }], background: '#ffb7ab' },
        { fonts: [{ text: '示', top: '20%', fontSize: 24, fontWeight: 550, fontColor: '#ffffff' }], background: '#eb6357' },
        { fonts: [{ text: '需', top: '20%', fontSize: 24, fontWeight: 550, fontColor: '#ffffff' }], background: '#ffb7ab' },
        { fonts: [{ text: '要', top: '20%', fontSize: 24, fontWeight: 550, fontColor: '#ffffff' }], background: '#eb6357' },
      ],
      buttons: [
        {
          radius: '40px', background: '#dd4b43',
          pointer: true,
          fonts: [{ text: '一键\n破产', top: '-26px', fontColor: '#ffffff', fontSize: '24px', fontWeight: '800' }]
        },
      ],
      defaultConfig: {
        speed: 16,
        accelerationTime: 100,
        decelerationTime: 400,
      },
    }
  }

  onFinish = values => {
    let a_prizes = []
    for (const [i, v] of values.lotteryinfo.entries()) {
      if (i%6 === 0) {
        a_prizes.push({ range: parseInt(v.proportion), fonts: [{ text: v.content, top: '20%', fontSize: 24, fontWeight: 550, fontColor: '#ffffff' }], background: prizecolor0 })
      } else if (i%6 === 1) {
        a_prizes.push({ range: parseInt(v.proportion), fonts: [{ text: v.content, top: '20%', fontSize: 24, fontWeight: 550, fontColor: '#ffffff' }], background: prizecolor1 })
      } else if (i%6 === 2) {
        a_prizes.push({ range: parseInt(v.proportion), fonts: [{ text: v.content, top: '20%', fontSize: 24, fontWeight: 550, fontColor: '#ffffff' }], background: prizecolor2 })
      } else if (i%6 === 3) {
        a_prizes.push({ range: parseInt(v.proportion), fonts: [{ text: v.content, top: '20%', fontSize: 24, fontWeight: 550, fontColor: '#ffffff' }], background: prizecolor3 })
      } else if (i%6 === 4) {
        a_prizes.push({ range: parseInt(v.proportion), fonts: [{ text: v.content, top: '20%', fontSize: 24, fontWeight: 550, fontColor: '#ffffff' }], background: prizecolor4 })
      } else if (i%6 === 5) {
        a_prizes.push({ range: parseInt(v.proportion), fonts: [{ text: v.content, top: '20%', fontSize: 24, fontWeight: 550, fontColor: '#ffffff' }], background: prizecolor5 })
      }
    }
    this.setState({
      prizes: a_prizes
    })
    message.success('抽奖福利设置完成！')
  };

  openNotification = (participator, prize) => {
    notification.success({
      message: `${participator}`,
      description: '哥，中嘞：' + prize.fonts[0].text,
      placement: 'topLeft',
      duration: 8,
    });
  };

  render () {
    return (
      <div>
      <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 48 }]}>
        <Col span={18} offset={7}>
          <LuckyWheel
            ref={this.myLucky}
            width="300px"
            height="300px"
            blocks={this.state.blocks}
            prizes={this.state.prizes}
            buttons={this.state.buttons}
            defaultConfig={this.state.defaultConfig}
            onStart={() => { // 点击抽奖按钮会触发star回调
              // 调用抽奖组件的play方法开始游戏
              this.myLucky.current.play()
              // 模拟调用接口异步抽奖
              setTimeout(() => {
                // 假设后端返回的中奖索引是 0
                // const index = 0
                // 调用stop停止旋转并传递中奖索引
                // this.myLucky.current.stop(index)
                this.myLucky.current.stop()
              }, 500)
            }}
            onEnd={prize => { // 抽奖结束会触发end回调
              // console.log(prize)
              const participator = '只片人'
              const resultIndex = 0
              this.openNotification(participator, prize)
            }}
          ></LuckyWheel>
        </Col>
        <Col span={6} offset={6}>
          <Form name="dynamic_form_nest_item" onFinish={this.onFinish} autoComplete="off">
            <Form.List name="lotteryinfo">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                      <Form.Item
                        {...restField}
                        name={[name, 'content']}
                        rules={[{ required: true, message: '不准留空福利内容' }]}
                      >
                        <Input placeholder="福利内容" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'proportion']}
                        rules={[{ required: true, message: '缺少爆率' }]}
                      >
                        <Input placeholder="爆率（%）" />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      添加福利
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="apply-form-button">
                应用
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      </div>
    )
  }
}

export default App;
