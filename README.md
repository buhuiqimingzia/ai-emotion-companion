# ai-emotion-companion
# AI 情感抚慰系统（讯飞星火接入版）

## 项目简介

这是一个基于讯飞星火大模型的情感抚慰聊天系统，采用纯前端实现。用户可以在网页输入自己的烦恼和感受，系统通过调用讯飞大模型 API，返回温暖、贴心的情感回应，实现简单的情感支持和陪伴。

本项目展示了前端交互设计、WebSocket 与 REST API 调用，以及与大模型接口的集成能力。

---

## 主要功能

- 美观简洁的聊天界面，响应式设计，适配不同屏幕尺寸
- 用户输入实时发送给讯飞星火大模型，接收并展示模型回复
- 支持按“Enter”键或点击发送按钮发送消息
- 交互过程展示“正在输入”提示，提升用户体验
- 基于 WebSocket 实现流式数据接收，响应速度快
- 简单的请求签名逻辑，演示 API 安全调用方式

---

## 技术栈

- HTML / CSS / JavaScript (ES6+)
- Font Awesome 图标库
- CryptoJS 用于 HMAC-SHA256 签名
- 讯飞星火大模型 API (WebSocket 版本)

---

## 使用说明

1. 克隆本仓库到本地
2. 申请并获取讯飞星火 API 的 `APPID`、`API Key` 和 `API Secret`
3. 将 API 相关配置替换到 `index.html` 中的对应变量（注意安全，建议私下管理）
4. 直接使用浏览器打开 `index.html` 即可使用聊天功能

---

## 注意事项

- 为保障密钥安全，生产环境建议通过后端代理请求 API，避免密钥泄露
- 本项目仅做学习和演示用途，未经安全加固，不建议公开部署
- 讯飞 API 的接口和签名规则可能会更新，请参考官方文档及时调整

---

## 项目截图

![image](https://github.com/user-attachments/assets/9e4df841-5c01-4f2f-9364-e24af34eb6f0)


---

## 联系方式

有任何问题欢迎联系我：

- 邮箱：3447179216@qq.com

---

## 参考资料

- 讯飞星火官方文档：https://www.xfyun.cn/doc/spark/index.html
- CryptoJS：https://github.com/brix/crypto-js
