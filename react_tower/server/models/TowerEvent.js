import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const TowerEventSchema = new Schema (
    {
        creatorId: { type: Schema.Types.ObjectId, ref: "Account", required: true },
        name: { type: String, required: true, maxlength: 30 },
        description: { type: String, required: true },
        coverImg: { type: String, required: true },
        location: { type: String, required: true, maxlength: 30 },
        maxCapacity: { type: Number, required: true},
        startDate: { type: Date, required: true },
        isCanceled: { type: Boolean, default: false },
        type: { type: String, enum: ["concert", "convention", "sport", "digital"], required: true }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true }
    }
);

TowerEventSchema.virtual("creator",
{
    localField: "creatorId",
    foreignField: "_id",
    ref: "Account",
    count: true
});

TowerEventSchema.virtual("filled",
{
    localField: "_id",
    foreignField: "eventId",
    ref: "Ticket",
    count: true
});

TowerEventSchema.virtual("capacity").get(function ()
{
    return this.maxCapacity - this.get("filled");
});

TowerEventSchema.virtual("capacity").set(function (capacity)
{
    this.set({ maxCapacity: capacity + this.get("filled") });
});