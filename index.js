const express=require("express");
const path = require('path')
const Todo=require('./config');

const app=express();
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(bodyParser.json());
app.use(cors());


app.use(express.json());




app.use("/", express.static(path.join(__dirname, './public')))
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname, "public/index.html"))
})

app.post('/api/create',async (req,res)=>{

    const body=req.body;
    await Todo.add(body);

    console.log('when api called',req);
    console.log()
    res.send({msg: "from home"});
});


app.post('/api/update',async (req,res)=>{
const id=req.body.id;
delete req.body.id;
    await Todo.doc(id).update(req.body);
    res.send({msg: "from home"});
});

app.post('/api/delete',async (req,res)=>{
    const body=req.body;
        await Todo.doc(body.id).delete();
        res.send({msg: "from home"});
    });

app.get('/api/fetch',async (req,res)=>{
    const snapshot=await Todo.get();

    const list=snapshot.docs.map((doc)=>({id:doc.id,...doc.data()}));
    console.log(list);
    res.send(list);
});

app.listen(3000,()=>console.log("successfully running at port 3000"));
