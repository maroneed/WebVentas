
const express = require('express');
const app = express();



const path = require('path');
const port = 3000
const router = express.Router();
app.use(express.static(('public')));


router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});
router.get('/carrito',function(req,res){
    res.sendFile(path.join(__dirname+'/modal.html'));
});
//add the router
app.use('/', router);
// static files
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
