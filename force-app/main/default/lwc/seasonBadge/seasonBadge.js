import { api, LightningElement } from 'lwc';
import NUMBER_FIELD from '@salesforce/schema/Season__c.Number__c';
import { getFieldValue } from 'lightning/uiRecordApi';


export default class SeasonBadge extends LightningElement {
    @api season;

    get seasonNumber() {
        console.log('this.season: ' + this.season);
        console.log('JSON.stringify(this.season): ' + JSON.stringify(this.season));
        console.log('getFieldValue(this.season, NUMBER_FIELD): ' + getFieldValue(this.season, NUMBER_FIELD));
        console.log('this.season.Number__c: ' + this.season.Number__c);
        // return getFieldValue(this.season, NUMBER_FIELD);
        return 'S' + (this.season.Number__c > 9 ? '' : '0') + this.season.Number__c;
    }
}