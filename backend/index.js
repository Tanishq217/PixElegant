import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db.js'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/authRoutes.js'
dotenv.config()
import cors from "cors"
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let port = process.env.PORT || 4000

let app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
 origin: ["http://localhost:5173", "http://localhost:5175"] ,  
 credentials:true
}))

// Serve static files from public directory
app.use('/uploads', express.static(path.join(__dirname, 'public')))

app.use("/api/auth",authRoutes)
app.use("/api/user",userRoutes)
app.use("/api/product",productRoutes)
app.use("/api/cart",cartRoutes)
app.use("/api/order",orderRoutes)

app.listen(port,()=>{
    console.log("Hello From Server")
    connectDb()
})