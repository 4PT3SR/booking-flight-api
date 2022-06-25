const express = require("express");
const { json } = require("express");
const flights = require("./controllers/flightController");
const models = require("./models/Flight");
const routes = require("./routes/flightRoute");
const AppError = require("./utils/AppError")
const {globalErrorHandler} = require('./controllers/globalErrorHandlerController');
const app = express();

app.use(json());

app.use("/", routes);


app.all("*", async (req,res,next)=> {
  next(new AppError(`${req.url} does not exist`,404));
})


app.use(globalErrorHandler);



const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
