const { config } = require('dotenv');
const { exec } = require('child_process');

config();


let command;

if (process.env.NODE_ENV === 'production') {
  command = 'react-scripts start';
} else {
  command = `HOST=${process.env.REACT_APP_HOST} PORT=${process.env.REACT_APP_PORT} HTTPS=${process.env.REACT_APP_HTTPS} SSL_CRT_FILE=${process.env.REACT_APP_CRT_KEY} SSL_KEY_FILE=${process.env.REACT_APP_PRIVATE_KEY} react-scripts start`;
}

exec(command, (err, stdout, stderr) => {
  if (err) {
    console.error(`Error: ${err}`);
    return;
  }
  console.log(stdout);
  console.error(stderr);
});