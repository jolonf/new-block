
let currentBlock = -1;

function enableNotifications() {
  Notification.requestPermission((permission) => {
    if (permission === 'granted') {
      new Notification('New Block notifications enabled');
    }  
  });
}

async function getStatus() {
  const response = await fetch("https://api.bitindex.network/api/v3/main/status");
  const json = await response.json();
  if (json && json.info && json.info.blocks) {
    if (currentBlock !== json.info.blocks && currentBlock !== -1) {
      console.log(`New block: ${json.info.blocks}`);
      new Notification(`New Block ${json.info.blocks}`);
    }
    currentBlock = json.info.blocks;
    document.querySelector('#currentBlock').innerHTML = `Current block: ${currentBlock}`;
  } else {
    console.log('Error loading status');
  }
}

setInterval(getStatus, 1000);