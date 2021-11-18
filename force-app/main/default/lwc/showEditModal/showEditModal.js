import { LightningElement, api } from 'lwc';

export default class ShowEditModal extends LightningElement {
    @api isOpen;
    @api recordId;
    @api objectApiName;

    handleCloseClick() {
        this.dispatchEvent(new CustomEvent('closemodal'));
    }
}