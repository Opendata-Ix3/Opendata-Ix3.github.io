const form = document.getElementById('queryForm');
const resultDiv = document.getElementById('result');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const memberName = document.getElementById('memberName').value;
  const password = document.getElementById('password').value;
  const mainType = document.getElementById('mainType').value;
  const sportType = document.getElementById('sportType').value;
  const subtype = document.getElementById('subtype').value;
  const dataSize = document.getElementById('dataSize').value;

  // 登入請求的 JSON
  const loginData = {
    memberName,
    password
  };

  try {
    // 發送登入請求
    const loginResponse = await fetch('https://api.data-sports.tw/member/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    });

    const loginJson = await loginResponse.json();
    const token = loginJson.data.token;

    // 查詢請求的 headers 和 parameters
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    const parameters = {
      mainType,
      type: sportType,
      subtype,
      dataSize
    };

    const params = new URLSearchParams(parameters);

    // 顯示加載提示
    resultDiv.textContent = '正在查詢數據...';

    // 發送查詢請求
    const queryResponse = await fetch('https://api.data-sports.tw/data/processed', {
      method: 'GET',
      headers: headers,
      params: params
    });

    const queryJson = await queryResponse.json();

    // 查詢成功
    resultDiv.textContent = JSON.stringify(queryJson, null, 2);
  } catch (error) {
    console.error('Error:', error);

    // 查詢失敗
    resultDiv
