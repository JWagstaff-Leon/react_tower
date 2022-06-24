import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const TicketSchema = new Schema (
    {
        eventId: { type: Schema.Types.ObjectId, ref: "TowerEvent", required: true },
        accountId: { type: Schema.Types.ObjectId, ref: "Account", required: true }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true }
    }
);

TicketSchema.virtual("account",
{
    localField: "accountId",
    foreignField: "_id",
    ref: "Account",
    justOne: true
});

TicketSchema.virtual("event",
{
    localField: "eventId",
    foreignField: "_id",
    ref: "TowerEvent",
    justOne: true
});