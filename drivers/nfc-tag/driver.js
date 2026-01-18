'use strict';

const Homey = require('homey');

module.exports = class NFCTagDriver extends Homey.Driver {
  async onInit() {
    this.log('NFC Tag Driver initialized');
  }

  async onPair(session) {
    session.setHandler('list_devices', async () => {
      // Return empty list - devices will be added via API
      return [];
    });
  }
};
