import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class NewRecordModal extends LightningElement {
    @api isOpen;
    @api fields;
    @api objectApiName;
    recordInfo;

    connectedCallback() {
        // //prepopulate TV Show field
        // this.recordInfo = {
        //     fields: [...this.fields]
        // }
    }

    handleCloseClick() {
        this.dispatchEvent(new CustomEvent('closemodal'));
    }

    handleSuccess(event) {
        this.handleCloseClick();
        const evt = new ShowToastEvent({
            title: 'Successful action',
            message: 'New Record successfully added',
            variant: 'success'
        });
        this.dispatchEvent(evt);
    }
}