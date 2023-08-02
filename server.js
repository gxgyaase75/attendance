const express = require('express')
const { FieldValue } = require('firebase-admin/firestore')
const app = express()
const port = 8383
const { db } = require('./firebase.js')
const path = require('path');

app.use(express.json())
app.use(express.urlencoded({ extended: true }));





  app.get('/roster', (req, res) => {
    res.sendFile(path.join(__dirname, 'roster.html'));
  });

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

  app.get('/student', (req, res) => {
    res.sendFile(path.join(__dirname, 'student.html'));
  });

  app.get('/attendance', (req, res) => {
    res.sendFile(path.join(__dirname, 'attendance.html'));
  });

  app.get('/entries', (req, res) => {
    res.sendFile(path.join(__dirname, 'entries.html'));
  });




app.listen(port, () => console.log(`Server has started on port: ${port}`))

app.post('/addstudent', async (req, res) => {

  const name = req.body.name

  const date = req.body.date 

  const status = req.body.status

  const dateRef = db.collection('attendance').doc(date)

  const res2 = await dateRef.set({

    [name] : {

    "status":status

    }

  }, { merge: true })

  res.status(200).send("successfully added")

})