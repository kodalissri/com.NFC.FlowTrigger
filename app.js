'use strict';

const Homey = require('homey');

class NFCFlowTriggerApp extends Homey.App {

  /**
   * onInit is called when the app is initialized.
   */
  async onInit() {
    this.log('NFC Flow Trigger app has been initialized');

    // Store for NFC tags
    this.tags = await this.homey.settings.get('nfc_tags') || {};

    // Register flow cards
    this.nfcTagScannedTrigger = this.homey.flow.getTriggerCard('nfc_tag_scanned');
    this.specificNfcTagScannedTrigger = this.homey.flow.getTriggerCard('specific_nfc_tag_scanned');

    // Register autocomplete for specific tag dropdown
    this.specificNfcTagScannedTrigger.registerArgumentAutocompleteListener(
      'configured_tag',
      async (query, args) => {
        const tags = await this.homey.settings.get('nfc_tags') || {};

        return Object.keys(tags)
          .filter(tagId => {
            const tag = tags[tagId];
            return tag.name.toLowerCase().includes(query.toLowerCase()) ||
                   tagId.toLowerCase().includes(query.toLowerCase());
          })
          .map(tagId => ({
            id: tagId,
            name: tags[tagId].name || tagId,
            description: tagId
          }));
      }
    );

    // Register run listener for specific tag trigger
    this.specificNfcTagScannedTrigger.registerRunListener(async (args, state) => {
      return args.configured_tag.id === state.tag_id;
    });

    // Register run listener for general tag trigger with optional tag ID filter
    this.nfcTagScannedTrigger.registerRunListener(async (args, state) => {
      if (!args.tag_id) {
        return true; // No filter, trigger for all tags
      }
      return state.tag_id.toLowerCase().includes(args.tag_id.toLowerCase());
    });

    this.log('Flow cards registered successfully');
  }

  /**
   * Handle NFC tag scan
   */
  async handleTagScanned(tagId) {
    this.log(`NFC tag scanned: ${tagId}`);

    const tags = await this.homey.settings.get('nfc_tags') || {};
    const tag = tags[tagId] || { name: 'Unknown Tag' };

    const tokens = {
      tag_id: tagId,
      tag_name: tag.name || 'Unknown Tag'
    };

    const state = {
      tag_id: tagId
    };

    // Trigger the general "NFC tag scanned" flow card
    await this.nfcTagScannedTrigger.trigger(tokens, state)
      .then(() => this.log(`General trigger fired for tag: ${tagId}`))
      .catch(err => this.error('Error triggering general flow:', err));

    // Trigger the specific tag flow card
    await this.specificNfcTagScannedTrigger.trigger(tokens, state)
      .then(() => this.log(`Specific trigger fired for tag: ${tagId}`))
      .catch(err => this.error('Error triggering specific flow:', err));

    return {
      success: true,
      tag_id: tagId,
      tag_name: tag.name
    };
  }

  /**
   * Get all configured tags
   */
  async getTags() {
    return await this.homey.settings.get('nfc_tags') || {};
  }

  /**
   * Save a tag configuration
   */
  async saveTag(tagId, tagData) {
    const tags = await this.homey.settings.get('nfc_tags') || {};
    tags[tagId] = tagData;
    await this.homey.settings.set('nfc_tags', tags);
    this.log(`Tag saved: ${tagId} - ${tagData.name}`);
    return tags;
  }

  /**
   * Delete a tag configuration
   */
  async deleteTag(tagId) {
    const tags = await this.homey.settings.get('nfc_tags') || {};
    delete tags[tagId];
    await this.homey.settings.set('nfc_tags', tags);
    this.log(`Tag deleted: ${tagId}`);
    return tags;
  }
}

module.exports = NFCFlowTriggerApp;
