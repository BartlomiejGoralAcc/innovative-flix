import { LightningElement, wire } from 'lwc';
import { subscribe, MessageContext } from 'lightning/messageService';
import TRAILER_URL_FOUND_CHANNEL from '@salesforce/messageChannel/Trailer_Url_Found__c';

export default class TrailerComponent extends LightningElement {
    videoUrl;
    subscription = null;

    @wire(MessageContext)
    messageContext;

    connectedCallback() {
        this.subscribeToMessageChannel();
    }

    subscribeToMessageChannel() {
        this.subscription = subscribe(
          this.messageContext,
          TRAILER_URL_FOUND_CHANNEL,
          (message) => this.handleMessage(message)
        );
    }

    handleMessage(message) {
        this.videoUrl = message.constant;
    }
}