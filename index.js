require('dotenv').config();
const express = require('express');
const AWS = require('aws-sdk');

const app = express();
const port = process.env.PORT || 3000;

// Claves directamente en el código (solo para pruebas)
AWS.config.update({
  region: 'us-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const ec2 = new AWS.EC2();
const INSTANCE_ID = 'i-0adbf6dd618b0e8d3';

app.get('/', (req, res) => {
  res.send('🛰️ API EC2 Control: Enciende y apaga tu instancia.');
});

app.get('/start', async (req, res) => {
  try {
    await ec2.startInstances({ InstanceIds: [INSTANCE_ID] }).promise();
    res.send('✅ EC2 encendida');
  } catch (err) {
    console.error(err);
    res.status(500).send('❌ Error al encender EC2');
  }
});

app.get('/stop', async (req, res) => {
  try {
    await ec2.stopInstances({ InstanceIds: [INSTANCE_ID] }).promise();
    res.send('🛑 EC2 apagada');
  } catch (err) {
    console.error(err);
    res.status(500).send('❌ Error al apagar EC2');
  }
});

app.listen(port, () => {
  console.log(`🛰️ API corriendo en el puerto ${port}`);
});