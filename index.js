
require('dotenv').config()

const express = require("express")

const mongoose = require("mongoose")

const Item = require('./foundItemsModel')

const app = express()

app.use(express.json())

const PORT = process.env.PORT || 2500


const MONGODB_URL = "mongodb+srv://ukach:%408Characters@cluster0.ngrbzt6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"




mongoose.connect(process.env.MONGODB_URL)
  .then(() => {console.log('MongoDB connected')

    app.listen(PORT, (req, res) => {

        console.log(`Successful, server is running on Port ${PORT}`)
    })
    
  })
  .catch((err) => console.log('MongoDB connection error:', err));


  app.get("/", (req, res) => {

    res.status(200).json( {
        message: "Successful, You are welcome the to Lost but Found Portal"})
  })

  app.post("/add-found-item", async (req, res) => {

    const {itemName,description, locationFound,dateFound,claimed} = req.body

    if(!itemName && !locationFound) {
        return res.status(404).json({
            message:"Please enter all required fields"
        })
    }

    const newItem = new Item({itemName,description, locationFound,dateFound,claimed})

    await newItem.save()

    res.status(201).json({
        message:"item successfully added",
        newItem
    })
  })

  app.get("/all-found-item", async (req, res) => {

    const allItems = await Item.find()

    res.status(200).json({
        message:"Successful",
        allItems
    })
  })

  app.get("/one-found-item/:id", async (req, res) => {

    const { id } = req.params

    const oneItem = await Item.findById(id)

    if(!Item) {
        return res.status(404).json({
            message:"Item not found"
        })
    }
    
    res.status(200).json({
        message: "Successful",
        oneItem
  })

  })


  app.put("/edit-found-item/:id", async (req, res) => {

    const {id} = req.params

    const {itemName,description, locationFound,dateFound,claimed} = req.body

    const editedItem = await Item.findByIdAndUpdate(
        id,
        {itemName,description, locationFound,dateFound,claimed}
    )

    res.status(201).json({
        message:"Item edited successfully",
        editedItem
    })


    })

    app.patch("/update-found-item/:id", async (req, res) => {

        const {id} = req.params

        const {itemName} = req.body

        const existingItem = await Item.findByIdAndUpdate(id)
        if(existingItem) {
            existingItem.itemName = itemName
            await existingItem.save()
            res.status(200).json({
                message: "Item successfully updated",
                existingItem
            })
        }else {
            res.status(404).json({
                message: "Item not found"
            })
        }
    })


    app.delete("/delete-found-item", async (req, res) => {

        //const {id} = req.params

        const {id} = req.body

        const deletedItem = await Item.findByIdAndDelete(id)

        res.status(200).json({
            message:"Item successfully deleted",
            deletedItem
        })
    })