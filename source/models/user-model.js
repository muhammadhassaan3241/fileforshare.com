const { Schema, model, default: mongoose } = require("mongoose");
const { genSalt, hash } = require("bcrypt");

const userSchema = new Schema(
  {
    ip: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: mongoose.Types.ObjectId,
      ref: "Role",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const saltRounds = await genSalt(10);
    this.password = await hash(this.password, saltRounds);
  }
  next();
});

userSchema.pre("findOneAndUpdate", async function (next) {
  if (this._update.password) {
    const saltRounds = await genSalt(10);
    this._update.password = await hash(this._update.password, saltRounds);
  }
  next();
});

const User = model("User", userSchema);

module.exports = User;
