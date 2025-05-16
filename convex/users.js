import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const CreateNewUser=mutation({
    args:{
        name:v.string(),
        email:v.string(),
        picture:v.optional(v.string()),
    },
    handler:async(ctx,args)=>{
        const userData=await ctx.db.query
        ('users').filter(q=>q.eq(q.field('email'),args.email))
        .collect();
        if(userData?.length==0){
            const result=await ctx.db.insert('users',{
                name:args.name,
                email:args.email,
                picture:args.picture,
            });
            return result;
        }
        // Extract only the fields defined in our schema
        const existingUser = userData[0];
        return {
            name: existingUser.name,
            email: existingUser.email,
            picture: existingUser.picture,
            subscriptionId: existingUser.subscriptionId
        };
    }
})