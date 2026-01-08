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
         const tags = this.extractTags(data.content)
         const payloadObject = {
            user_id: userId,
            name: data.title || data.name || "Untitled Template",
            tags_detected: tags,
            usage_stats: 0,
            is_system: false,
            ...data
         }

         const {data: resultData, error} = await supabase
         .from("response_templates")
         .insert([payloadObject])
         .select();
         
         if(error){
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
   async updatetemplate(userId, templateId, data) {
      try {
         const tags = this.extractTags(data.content)
         const updatedPayloadObject = {
            tags_detected: tags,
            ...data
         }

         const updatedResult = await supabase.from("response_templates").update(updatedPayloadObject).eq("id", templateId).eq("user_id", userId)
         return updatedResult.data[0];
      } catch (error) {
         console.error("Error updating template:", error);
         throw error;

      }
   }

   /**Getting the templates for the user */

   async getTemplatesForUser(userId) {
      try {
         const {data, error} = await supabase
            .from("response_templates")
            .select("*")
            .or(`user_id.eq.${userId}, is_system.eq.false`)
            .order('created_at', { ascending: false })
         
            if(error) {
               throw error;
            }

            return data;

      } catch (error) {
         console.error("Error fetching templates for user:", error);
         throw error;
      }
   }
}

module.exports = new TemplateService();
