const express = require('express')
const cors = require('cors')
const nodemailer = require('nodemailer')

const bodyParser = require('body-parser')

const PORT = process.env.PORT || 9000;

const app = express();

app.use(cors())
app.use(bodyParser.json())

//Routes 
app.get('/', (req, res) => {
    res.send('Ir a url🍕')
})


app.post('/test', (req, res) => {
  res.send([{
    msg: 'Funcionando...'
  }])
})

app.post('/send-mail', async (req, res) => {

    const { 
      from, // AQUÍ < >
      mail, 
      subject, 
      html,
      _host,
      _port,
      _user,
      _pass,
    } = req.body

    const transporter = nodemailer.createTransport({
        host: _host,
        port: _port,
        secure: false,
        auth: {
            user: _user,
            pass: _pass
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    const info = await transporter.sendMail({
        from: `'${from}' <${_user}>`,
        to: mail,
        subject: subject,
        html:  `${html}`
    })

    res.send(info)
})


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})