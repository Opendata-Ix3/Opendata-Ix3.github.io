const form = document.getElementById('queryForm');
const resultDiv = document.getElementById('result');

// 獲取表單資料與組成登入請求
const memberName = document.getElementById('memberName').value;
const password = document.getElementById('password').value;
const mainType = document.getElementById('mainType').value;
const sportType = document.getElementById('sportType').value;
const subtype = document.getElementById('subtype').value;
const dataSize = document.getElementById('dataSize').value;


form.addEventListener('submit', async (event) => {
  event.preventDefault();

  // 登入請求的 JSON
  const loginData = {
    memberName,
    password
  };

  try
  {
    // 1. 發送"登入"請求
    const loginResponse = await fetch('https://api.data-sports.tw/member/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    });

    if (!loginResponse.ok) {
      throw new Error('Login response was not ok');
    }

    // 1.1 取得token
    const loginJson = await loginResponse.json();
    const token = loginJson.data.token;


    // 2. 查詢數據
    // 2.1 建立 headers 和 parameters
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

    // 2.2 顯示加載提示
    const loadingDiv = document.createElement('div');
    loadingDiv.textContent = '正在查詢數據...';
    resultDiv.appendChild(loadingDiv);


    // 2.3 發送"查詢"請求
    const queryResponse = await fetch('https://api.data-sports.tw/data/processed', {
      method: 'POST',
      headers: headers,
      params: params
    });

    if (!queryResponse.ok) {
        throw new Error('Query response was not ok');
    }

    // 2.5 查詢成功
    const queryJson = await queryResponse.json();

    resultDiv.textContent = JSON.stringify(queryJson, null, 2);
    loadingDiv.remove();
  }
  catch (error)
  {
    console.error('Error:', error);
    loadingDiv.remove();
    resultDiv.textContent = '查詢失敗，請檢查網路連線或輸入參數是否正確。';
  }
});


