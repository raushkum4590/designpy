import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    image: v.optional(v.string()),
  }),
  
  designs: defineTable({
    name: v.string(),
    width: v.number(),
    height: v.number(),
    jsonTemplate: v.optional(v.any()),
    imagePreview: v.optional(v.string()),
    uid: v.optional(v.id("users")),
  }).index("by_user", ["uid"]), // Create index for querying designs by user
});