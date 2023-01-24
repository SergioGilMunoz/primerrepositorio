const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
}) ;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('.'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

var iglesias = {data:[
     {name: 'Iglesia Emanuel, Barranco' },
     {name: 'Iglesia Dios es Amor, Lima' },
     {name: 'Iglesia La casa de Dios, Chorrillos' },
     {name: 'Iglesia Manantial de Vida, Lince' },
     {name: 'Iglesia Primera Iglesia de Lima, Lima' },
     {name: 'Iglesia Belen, San Juan' },
     {name: 'Otro' }
  ]};

app.get('/api/iglesias', function(req, res, next){ 
    res.setHeader('Content-Type', 'application/json');
    res.json(iglesias); 
  });


  app.post('/api/registrar', function(req, res) {  
    console.log ("Un contacto nuevo ingreso por la web...")
     
    var post_body = req.body;
    console.log(post_body);

    res.json({ mensaje: 'Datos recibidos' })    
  })