import { Schema, models, model } from "mongoose";

const RideSchema = new Schema(
  {
    type: {type: String, enum: ["offer", "need"], required: true}, // jadę / szukam
    from: {type: String, required: true, trim: true},
    to: {type: String, required: true, trim: true},
    date: {type: String, required: true},
    time: {type: String, required: true}, // "07:00"
    rideAt: {type: Date, required: true, index: true},
    seats: {type: Number, min: 1, max: 4}, // tylko offer
    contact: {type: String, required: true, trim: true},
    note: {type: String, trim: true, maxlength: 280},

    // TTL – automatyczne usuwanie ogłoszeń (np. po 7 dniach)
    expiresAt: {type: Date, required: true, index: {expires: 0}},
  },
  {timestamps: true}
);

export const Ride = models.Ride || model("Ride", RideSchema);
