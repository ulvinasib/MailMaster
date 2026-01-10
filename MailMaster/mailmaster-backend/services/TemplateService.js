const { supabase } = require('../config/supabase.js');


class TemplateService {

   //1st step
   extractTags(content) {
      if (!content) return []

      //defining regex
      const regex = /\{\{(\w+)\}\}/g;

      //Finding all matches
      const matches = [...content.matchAll(regex)];

      //Extracting tags
      const rawTags = matches.map(match => match[1])


      //using set to remove duplicates
      return [...new Set(rawTags)]
   }

   //2nd step
   /**The create method */
   async createTemplate(userId, data) {
      try {
         //Getting ythe users current plan but in the produyction we need profiles table from where we will fetch the plan of the user
         const { count, error: countError } = await supabase
            .from("response_templates")
            .select("*", { count: 'exact', head: true })
            .eq("user_id", userId)

         //defining the limit
         const limits = { "free": 3, "pro": 15, "enterprise": 50 };
         const userPlan = "FREE" //tThis should be fetched from teh database

         //rate limiting logic
         if (count >= limits[userPlan.toLowerCase()]) {
            throw new Error(`You have reached your limit. Your ${userPlan} plan allowls only ${limits[userPlan.toLowerCase()]} templates. Please upgrade your plan to create more templates.`)
         }
         const tags = this.extractTags(data.content)
         const payloadObject = {
            user_id: userId,
            name: data.title || data.name || "Untitled Template",
            tags_detected: tags,
            usage_stats: 0,
            is_system: false,
            ...data
         }

         const { data: resultData, error } = await supabase
            .from("response_templates")
            .insert([payloadObject])
            .select();

         if (error) {
            console.error("Error inserting template:", error);
            throw new Error("Failed to create template");
         }

         return resultData[0];

      } catch (error) {
         console.error('Error creating template:', error);
         throw error;
      }
   }


   /**Update function for templates */
   async updateTemplate(userId, templateId, updateData) {
      try {
         const payload = { ...updateData };

         // If content is being updated, re-scan for tags
         if (updateData.content) {
            payload.tags_detected = this.extractTags(updateData.content);
         }

         const { data, error } = await supabase
            .from("response_templates")
            .update(payload)
            .eq('id', templateId)
            .eq('user_id', userId) // Security: Ensure user owns the template
            .select();

         if (error) throw error;
         return data[0];
      } catch (error) {
         console.error('Service Error (Update):', error);
         throw error;
      }
   }



   /**Getting the templates for the user */

   async getTemplatesForUser(userId) {
      try {
         const { data, error } = await supabase
            .from("response_templates")
            .select("*")
            .eq("user_id", userId)
            .order('created_at', { ascending: false })

         if (error) {
            throw error;
         }

         return data;

      } catch (error) {
         console.error("Error fetching templates for user:", error);
         throw error;
      }
   }


   /**Deleting the template */
   async deteleTemplate(userid,templateId){
      try {
         const {error} = await supabase
         .from("response_templates")
         .delete()
         .eq("id",templateId)
         .eq("user_id",userid)

         if(error) throw error;
         return true;
      } catch (error) {
         console.error("Error deleting template:",error)
         throw error;
      }
   }
}

module.exports = new TemplateService();
