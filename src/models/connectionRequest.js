const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true  
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true  
    },  
    status: {
  type: String,
  enum: {
    values: ["ignored", "interested", "accepted", "rejected"],
    message: `{VALUE} is not supported`
  }

}
   
},
{
    timestamps: true
}

);
// connectionRequestSchema.findOne({ fromUserId: this.fromUserId, toUserId: this.toUserId }, (err, existingRequest) => {
connectionRequestSchema.index({ fromUserId: 1 , toUserId: 1 });
connectionRequestSchema.pre("save", function () {
   const connectionRequest = this;
   // check if fromUserId and toUserId are the same
   if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("You cannot send a connection request to yourself.");
    
   }
    
});
const ConnectionRequest = new mongoose.model("ConnectionRequest", connectionRequestSchema); 
module.exports = ConnectionRequest;