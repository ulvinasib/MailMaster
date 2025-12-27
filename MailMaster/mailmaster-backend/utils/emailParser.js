/**
 * Parse email headers to extract common fields
 */
function parseHeaders(headers) {
    const headerMap = {};
    
    headers.forEach(header => {
      headerMap[header.name.toLowerCase()] = header.value;
    });
  
    return {
      subject: headerMap['subject'] || '(No Subject)',
      from: parseEmailAddress(headerMap['from'] || ''),
      to: parseEmailAddressList(headerMap['to'] || ''),
      cc: parseEmailAddressList(headerMap['cc'] || ''),
      date: headerMap['date'] || new Date().toISOString(),
      messageId: headerMap['message-id'] || ''
    };
  }
  
  /**
   * Parse email address from string like "John Doe <john@example.com>"
   */
  function parseEmailAddress(emailString) {
    if (!emailString) return { name: '', email: '' };
  
    const match = emailString.match(/^(.+?)\s*<(.+?)>$/);
    
    if (match) {
      return {
        name: match[1].trim().replace(/^["']|["']$/g, ''),
        email: match[2].trim()
      };
    }
  
    return {
      name: '',
      email: emailString.trim()
    };
  }
  
  /**
   * Parse comma-separated email addresses
   */
  function parseEmailAddressList(emailString) {
    if (!emailString) return [];
  
    return emailString
      .split(',')
      .map(email => parseEmailAddress(email.trim()))
      .filter(parsed => parsed.email);
  }
  
  /**
   * Decode base64 email body
   */
  function decodeBase64Body(encodedBody) {
    if (!encodedBody) return '';
  
    try {
      // Replace URL-safe characters
      const base64 = encodedBody.replace(/-/g, '+').replace(/_/g, '/');
      return Buffer.from(base64, 'base64').toString('utf-8');
    } catch (error) {
      console.error('Error decoding base64:', error);
      return '';
    }
  }
  
  /**
   * Extract plain text body from Gmail message parts
   */
  function extractBodyFromParts(parts) {
    if (!parts || parts.length === 0) return { text: '', html: '' };
  
    let textBody = '';
    let htmlBody = '';
  
    function searchParts(partsArray) {
      for (const part of partsArray) {
        if (part.mimeType === 'text/plain' && part.body?.data) {
          textBody = decodeBase64Body(part.body.data);
        } else if (part.mimeType === 'text/html' && part.body?.data) {
          htmlBody = decodeBase64Body(part.body.data);
        } else if (part.parts) {
          searchParts(part.parts);
        }
      }
    }
  
    searchParts(parts);
  
    return { text: textBody, html: htmlBody };
  }
  
  /**
   * Strip HTML tags and get plain text
   */
  function stripHtml(html) {
    if (!html) return '';
    
    return html
      .replace(/<style[^>]*>.*<\/style>/gmi, '')
      .replace(/<script[^>]*>.*<\/script>/gmi, '')
      .replace(/<[^>]+>/gm, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .trim();
  }
  
  module.exports = {
    parseHeaders,
    parseEmailAddress,
    parseEmailAddressList,
    decodeBase64Body,
    extractBodyFromParts,
    stripHtml
  };