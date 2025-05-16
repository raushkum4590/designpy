import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const CreateNewDesign = mutation({
    args:{
        name: v.string(),
        width: v.number(),
        height: v.number(),
        jsonTemplate: v.optional(v.any()),
        imagePreview: v.optional(v.string()),
        uid: v.optional(v.id('users'))
    },
    handler: async(ctx, args) => {
        // Create design object without uid initially
        const designData = {
            name: args.name,
            width: args.width,
            height: args.height,
            jsonTemplate: args.jsonTemplate,
            imagePreview: args.imagePreview,
        };
        
        // Only add uid if it was provided
        if (args.uid) {
            designData.uid = args.uid;
        }
        
        const result = await ctx.db.insert('designs', designData);
        return result;
    }
})
export const GetDesign = query({
    args:{
        id:v.id('designs'),

    },
    handler:async(ctx,args)=>{
        const result=await ctx.db.get(args.id);
        return result;
    }
})

export const GetDesignsByUser = query({
    args: {
        uid: v.id('users'),
        paginationOpts: v.optional(
            v.object({
                limit: v.optional(v.number()),
                cursor: v.optional(v.string())
            })
        )
    },
    handler: async(ctx, args) => {
        const { uid, paginationOpts } = args;
        const limit = paginationOpts?.limit ?? 10;
        
        // Use pagination to prevent large query results
        const designs = await ctx.db
            .query("designs")
            .withIndex("by_user", q => q.eq("uid", uid))
            .order("desc")
            .paginate(paginationOpts?.cursor, limit);
            
        return designs;
    }
})

export const SaveDesign = mutation({
    args:{
        id:v.id('designs'),
        jsonDesign:v.any(),
        imagePreview:v.optional(v.string())
    },
    handler:async(ctx,args)=>{
        
        const result = await ctx.db.patch(args.id, {
            jsonTemplate: args.jsonDesign,
            imagePreview: args?.imagePreview
        });
        return result;
    }
    
})

export const GetUserDesigns = query({
    args:{
        uid: v.id('users')
    },
    handler: async (ctx, args) => {
        // Add debugging
        console.log("GetUserDesigns called with uid:", args.uid);
        
        // Make sure uid is properly validated
        if (!args.uid) {
            console.log("No user ID provided");
            return [];
        }
        
        try {
            // First check if the user exists
            const userExists = await ctx.db.get(args.uid);
            if (!userExists) {
                console.log(`User with ID ${args.uid} does not exist`);
            }
            
            // Query with more detailed logging
            console.log("Starting database query");
            const result = await ctx.db.query('designs')
                .filter(q => q.eq(q.field("uid"), args.uid))
                .collect();
            
            console.log(`Query completed. Found ${result.length} designs for user ${args.uid}`);
            
            // Ensure we're returning a valid array
            return result || [];
        } catch (error) {
            console.error("Error in GetUserDesigns:", error);
            return [];
        }
    }
})