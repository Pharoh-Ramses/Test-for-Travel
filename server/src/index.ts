import express from 'express';
import bodyParser from 'body-parser';
import {locations} from "./locations"
const app = express();
const port = 9000;

app.use(bodyParser.json({limit: '50mb'}));


//get locations
app.get("/locations", (_req, res) => {
    return res.send(locations);
});
//delete-locations
 app.post("/delete-location", (req, res) => { 
    const id:string = req.body.id;

    for (let i = 0; i < locations.length; i++) {
        if (locations[i].id === id) {
            return res.send(locations.splice(i, 1));
        }
    }
    return res.send("failed to delete locations");
 });

 
app.listen(port, () => console.log(`Example app listening on port ${port}`));

 