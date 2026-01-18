'use strict';

module.exports = {
  async triggerTag({ homey, body, query }) {
    const app = homey.app;

    // Get tag ID from body or query
    const tagId = body.tag_id || query.tag_id;

    if (!tagId) {
      return {
        error: true,
        message: 'Missing tag_id parameter'
      };
    }

    try {
      const result = await app.handleTagScanned(tagId);
      return {
        success: true,
        message: `Tag ${tagId} triggered successfully`,
        data: result
      };
    } catch (error) {
      homey.app.error('Error handling tag scan:', error);
      return {
        error: true,
        message: error.message
      };
    }
  }
};
