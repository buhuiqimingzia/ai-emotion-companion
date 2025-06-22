const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const typingIndicator = document.getElementById("typing-indicator");

// 请替换成你自己讯飞开放平台的 AppID 和 AppSecret
const APPID = "123123";
const APPSECRET = "ABC ABC";

// Base64 编码函数
function base64Encode(str) {
  return btoa(unescape(encodeURIComponent(str)));
}

// 显示消息
function appendMessage(sender, text) {
  const div = document.createElement("div");
  div.className = `message ${sender}`;
  const name = sender === "user" ? "您" : "情感抚慰助手";
  const icon = sender === "user" ? "fas fa-user" : "fas fa-robot";
  div.innerHTML = `
        <div class="message-header">
          <div class="avatar"><i class="${icon}"></i></div>
          <span>${name}</span>
        </div>
        <div class="message-content">${text}</div>`;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// 控制输入框下面的打字指示器
function showTyping(show) {
  typingIndicator.style.display = show ? "block" : "none";
  if (show) chatBox.scrollTop = chatBox.scrollHeight;
}

// 发送请求到讯飞大模型HTTP接口
async function sendToXfSpark(message) {
  const domain = "generalv3.5"; // 选择你用的模型版本

  // 构造X-Param（Base64编码的请求参数）
  const paramObj = {
    domain: domain,
    temperature: 0.5,
    max_tokens: 2048,
  };
  const paramStr = base64Encode(JSON.stringify(paramObj));

  // 计算时间戳和签名
  const curTime = Math.floor(Date.now() / 1000).toString();
  const checkSum = CryptoJS.MD5(APPSECRET + curTime + paramStr).toString();

  // 请求头
  const headers = {
    "X-Appid": APPID,
    "X-CurTime": curTime,
    "X-Param": paramStr,
    "X-CheckSum": checkSum,
    "X-Real-Ip": "127.0.0.1",
    "Content-Type": "application/json;charset=utf-8",
  };

  // 请求体，必须是JSON格式，包含对话内容
  const body = {
    messages: [{ role: "user", content: message }],
  };

  const resp = await fetch(
    "https://spark-api-open.xf-yun.com/v2/chat/completions",
    {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    }
  );

  if (!resp.ok) {
    throw new Error("网络请求失败，状态码：" + resp.status);
  }
  const data = await resp.json();
  return data;
}

async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  appendMessage("user", message);
  userInput.value = "";
  showTyping(true);

  try {
    const result = await sendToXfSpark(message);
    // 讯飞返回的结果结构可能是：
    // data.choices[0].message.content
    const reply = result.choices?.[0]?.message?.content || "抱歉，未收到回复。";
    appendMessage("ai", reply);
  } catch (error) {
    appendMessage("ai", "抱歉，服务暂时不可用。");
    console.error(error);
  } finally {
    showTyping(false);
  }
}

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});
