const form = document.getElementById('queryForm');
const resultDiv = document.getElementById('result');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  // ... (獲取表單資料與組成登入請求 JSON 的部分與之前相同)
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


const form = document.getElementById('queryForm');
const resultDiv = document.getElementById('result');
  

  // 發送登入請求並處理 JSONP 回應
  const script = document.createElement('script');
  script.src = `https://api.data-sports.tw/member/login?callback=handleLoginResponse&membername=${encodeURIComponent(memberName)}&password=${encodeURIComponent(password)}`;
  document.head.appendChild(script);

  // 處理登入回應
  window.handleLoginResponse = (data) => {
    const token = data.data.token;

    // 組成查詢請求的 URL，並加入 JSONP callback 參數
    const url = `https://api.data-sports.tw/data/processed?callback=handleQueryResponse&main_type=${encodeURIComponent(mainType)}&type=${encodeURIComponent(sportType)}&subtype=${encodeURIComponent(subtype)}&data_size=${encodeURIComponent(dataSize)}`;

    // 發送查詢請求
    const script = document.createElement('script');
    script.src = url;
    script.setAttribute('Authorization', `Bearer ${token}`);
    document.head.appendChild(script);
  };

  // 處理查詢回應
  window.handleQueryResponse = (data) => {
    resultDiv.textContent = JSON.stringify(data, null, 2);
  };
});





/*  
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
    const loadingDiv = document.createElement('div');
    loadingDiv.textContent = '正在查詢數據...';
    resultDiv.appendChild(loadingDiv);


    // 發送查詢請求
    const queryResponse = await fetch('https://api.data-sports.tw/data/processed', {
      method: 'GET',
      headers: headers,
      params: params
    });

    const queryJson = await queryResponse.json();

    // 查詢成功
    resultDiv.textContent = JSON.stringify(queryJson, null, 2);
    loadingDiv.remove();
  } catch (error) {
    console.error('Error:', error);
    loadingDiv.remove();
    resultDiv.textContent = '查詢失敗，請檢查網路連線或輸入參數是否正確。';
  }
});

*/
